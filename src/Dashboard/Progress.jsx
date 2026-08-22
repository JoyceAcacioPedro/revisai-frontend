import React, { useEffect, useState } from 'react';
import './Progress.css';

function Progress() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    try {
      const [subjectsRes, progressRes] = await Promise.all([
        fetch('${API_URL}/api/subject/', { headers }),
        fetch('${API_URL}/api/progress/', { headers }),
      ]);

      const subjectsData = await subjectsRes.json();
      const progressData = await progressRes.json();

      // progressData é { topic_id: percentagem }
      // Precisamos calcular a média por subject

      // Busca os topics para saber a que subject pertencem
      const topicsRes = await fetch('${API_URL}/api/topics/', { headers });
      const topicsData = await topicsRes.json();

      // Calcula progresso por subject
      const subjectProgress = {};
      subjectsData.forEach(s => { subjectProgress[s.id] = []; });

      topicsData.forEach(topic => {
        const subjectId = topic.subject;
        const topicProgress = progressData[topic.id] ?? 0;
        if (subjectProgress[subjectId] !== undefined) {
          subjectProgress[subjectId].push(topicProgress);
        }
      });

      // Adiciona o progresso calculado a cada subject
      const subjectsWithProgress = subjectsData.map(s => ({
        ...s,
        progress: subjectProgress[s.id]?.length > 0
          ? Math.round(
              subjectProgress[s.id].reduce((a, b) => a + b, 0) /
              subjectProgress[s.id].length
            )
          : 0,
      }));

      setSubjects(subjectsWithProgress);
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
  const getColor = (p) => {
    if (p === 100) return { bar: '#1D9E75', bg: '#E1F5EE', text: '#0F6E56' };
    if (p >= 60)   return { bar: '#378ADD', bg: '#E6F1FB', text: '#185FA5' };
    return               { bar: '#EF9F27', bg: '#FAEEDA', text: '#854F0B' };
  };

  const total = subjects.length;
  const progressValues = subjects.map((s) => s.progress ?? 0);
  const avg = total > 0 ? Math.round(progressValues.reduce((a, b) => a + b, 0) / total) : 0;
  const done = subjects.filter((s) => (s.progress ?? 0) === 100).length;

  if (loading) {
    return <div className="pg-loading">Loading...</div>;
  }

  return (
    <div className="pg-container">
      <div className="pg-header">
        <h2 className="pg-title">Study progress</h2>
        <p className="pg-sub">Track your mastery per subject</p>
      </div>

      <div className="pg-stats">
        <div className="pg-stat">
          <span className="pg-stat-val">{total}</span>
          <span className="pg-stat-label">subjects</span>
        </div>
        <div className="pg-stat">
          <span className="pg-stat-val">{avg}%</span>
          <span className="pg-stat-label">avg progress</span>
        </div>
        <div className="pg-stat">
          <span className="pg-stat-val">{done}</span>
          <span className="pg-stat-label">completed</span>
        </div>
      </div>

      {subjects.length === 0 ? (
        <div className="pg-empty">No subjects yet. Add one to start tracking.</div>
      ) : (
        <div className="pg-list">
          {subjects.map((s) => {
            const p = s.progress ?? 0;
            const c = getColor(p);
            return (
              <div key={s.id} className="pg-card">
                <div className="pg-card-top">
                  <div className="pg-card-left">
                    <div className="pg-dot" style={{ background: c.bar }} />
                    <span className="pg-card-name">{s.subject_name}</span>
                  </div>
                  <span className="pg-badge" style={{ background: c.bg, color: c.text }}>
                    {p}%
                  </span>
                </div>
                <div className="pg-bar-track">
                  <div className="pg-bar-fill" style={{ width: `${p}%`, background: c.bar }} />
                </div>
                {p === 100 && <p className="pg-complete-msg">Mastered ✓</p>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Progress;