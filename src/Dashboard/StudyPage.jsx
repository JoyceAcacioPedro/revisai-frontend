import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import './StudyPage.css';

// ── FLASHCARDS ──────────────────────────────────────────
function FlashcardView({ flashcards, onComplete }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);

  const current = flashcards[index];

  const handleNext = () => {
    if (index + 1 >= flashcards.length) {
      setDone(true);
    } else {
      setIndex(index + 1);
      setFlipped(false);
    }
  };

  if (done) return (
    <div className="sp-fc-done">
      <span>🎴</span>
      <p>All flashcards reviewed!</p>
      <button className="sp-complete-btn" onClick={onComplete}>
        Mark as complete ✓
      </button>
    </div>
  );

  return (
    <div className="sp-fc-wrap">
      <p className="sp-fc-counter">{index + 1} / {flashcards.length}</p>
      <div
        className={`sp-fc-card ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="sp-fc-front">
          <p className="sp-fc-hint">Tap to reveal answer</p>
          <p className="sp-fc-text">{current.front}</p>
        </div>
        <div className="sp-fc-back">
          <p className="sp-fc-hint">Answer</p>
          <p className="sp-fc-text">{current.back}</p>
        </div>
      </div>
      {flipped && (
        <button className="sp-fc-next" onClick={handleNext}>
          {index + 1 >= flashcards.length ? 'Finish' : 'Next →'}
        </button>
      )}
    </div>
  );
}

// ── QUIZ ────────────────────────────────────────────────
function QuizView({ questions, onComplete }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = questions[index];

  const handleAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === current.correct) setScore(score + 1);
  };

  const handleNext = () => {
    if (index + 1 >= questions.length) {
      setDone(true);
    } else {
      setIndex(index + 1);
      setSelected(null);
    }
  };

  if (done) return (
    <div className="sp-fc-done">
      <span>🎯</span>
      <p className="sp-quiz-score">{score} / {questions.length} correct</p>
      <p className="sp-quiz-msg">
        {score === questions.length ? 'Perfect score! 🏆' :
         score >= questions.length * 0.7 ? 'Great job! 👏' : 'Keep studying! 💪'}
      </p>
      <button className="sp-complete-btn" onClick={onComplete}>
        Mark as complete ✓
      </button>
    </div>
  );

  return (
    <div className="sp-quiz-wrap">
      <p className="sp-fc-counter">{index + 1} / {questions.length}</p>
      <div className="sp-card">
        <p className="sp-quiz-question">{current.question}</p>
      </div>
      <div className="sp-quiz-options">
        {current.options.map((opt, i) => {
          let cls = 'sp-quiz-option';
          if (selected !== null) {
            if (i === current.correct) cls += ' correct';
            else if (i === selected) cls += ' wrong';
          }
          return (
            <button key={i} className={cls} onClick={() => handleAnswer(i)}>
              <span className="sp-quiz-letter">{['A', 'B', 'C', 'D'][i]}</span>
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <button className="sp-fc-next" onClick={handleNext}>
          {index + 1 >= questions.length ? 'See results' : 'Next →'}
        </button>
      )}
    </div>
  );
}

// ── MAIN PAGE ───────────────────────────────────────────
function StudyPage() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEarly = searchParams.get('early') === 'true';

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchStudy = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(
          `http://localhost:8000/api/activities/${activityId}/study/${isEarly ? '?early=true' : ''}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const result = await response.json();
        if (!response.ok) {
          setError(result);
        } else {
          // ← Normaliza type se vier como array
          if (Array.isArray(result.type)) {
            result.type = result.type[0];
          }
          setData(result);
        }
      } catch {
        setError({ message: 'Unable to connect to server.' });
      } finally {
        setLoading(false);
      }
    };
    fetchStudy();
  }, [activityId, isEarly]);

  const handleComplete = async () => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:8000/api/activities/${activityId}/complete/`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
    setCompleted(true);
    setTimeout(() => navigate('/revisions'), 1500);
  };

  if (loading) return (
    <div className="sp-loading">
      <span className="sp-spinner" />
      Generating your revision...
    </div>
  );

  if (error) return (
    <div className="sp-locked">
      <span>🔒</span>
      <h3>Not available yet</h3>
      <p>This revision is scheduled for <strong>{error.scheduled_date}</strong></p>
      <button onClick={() => navigate('/revisions')}>Back to revisions</button>
    </div>
  );

  if (completed) return (
    <div className="sp-done">
      <span>✅</span>
      <h3>Revision complete!</h3>
      <p>Great work. See you on the next one.</p>
    </div>
  );

  // Normaliza o type para comparação
  const activityType = Array.isArray(data.type) ? data.type[0] : data.type;

  return (
    <div className="sp-page">

      <div className="sp-header">
        <button className="sp-back" onClick={() => navigate('/revisions')}>← Back</button>
        <div>
          <p className="sp-type">{activityType}</p>
          <h2 className="sp-title">{data.topic_title}</h2>
        </div>
      </div>

      {isEarly && (
        <div className="sp-early-banner">
          ⚡ Early revision — scheduled for <strong>{data?.scheduled_date}</strong>
        </div>
      )}

      {activityType === 'summary' && (
        <div className="sp-content">
          <div className="sp-card">
            <h3 className="sp-card-title">Summary</h3>
            <p className="sp-summary-text">{data.content.summary}</p>
          </div>
          <div className="sp-card">
            <h3 className="sp-card-title">Key points</h3>
            <ul className="sp-key-points">
              {data.content.key_points?.map((point, i) => (
                <li key={i} className="sp-point">
                  <span className="sp-point-dot" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          {data.content.important_terms?.length > 0 && (
            <div className="sp-card">
              <h3 className="sp-card-title">Important terms</h3>
              <div className="sp-terms">
                {data.content.important_terms.map((item, i) => (
                  <div key={i} className="sp-term">
                    <span className="sp-term-name">{item.term}</span>
                    <span className="sp-term-def">{item.definition}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button className="sp-complete-btn" onClick={handleComplete}>
            Mark as complete ✓
          </button>
        </div>
      )}

      {activityType === 'flashcards' && (
        <FlashcardView
          flashcards={data.content.flashcards}
          onComplete={handleComplete}
        />
      )}

      {activityType === 'quiz' && (
        <QuizView
          questions={data.content.questions}
          onComplete={handleComplete}
        />
      )}

    </div>
  );
}

export default StudyPage;