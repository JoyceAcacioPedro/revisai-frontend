import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Subjects.css';

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [topics, setTopics] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subjectsRes, topicsRes] = await Promise.all([
        fetch('http://localhost:8000/api/subject/', { headers }),
        fetch('http://localhost:8000/api/topics/', { headers }),
      ]);
      const subjectsData = await subjectsRes.json();
      const topicsData = await topicsRes.json();
      setSubjects(subjectsData);
      setTopics(topicsData);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getTopicsForSubject = (subjectId) => {
    return topics.filter(t => t.subject === subjectId);
  };

  const handleDeleteSubject = async (subjectId) => {
    try {
      await fetch(`http://localhost:8000/api/subject/${subjectId}/`, {
        method: 'DELETE',
        headers,
      });
      setSubjects(prev => prev.filter(s => s.id !== subjectId));
      setTopics(prev => prev.filter(t => t.subject !== subjectId));
      setConfirmDelete(null);
    } catch (error) {
      console.error('Erro ao eliminar subject:', error);
    }
  };

  const handleDeleteTopic = async (topicId) => {
    try {
      await fetch(`http://localhost:8000/api/topics/${topicId}/`, {
        method: 'DELETE',
        headers,
      });
      setTopics(prev => prev.filter(t => t.id !== topicId));
      setConfirmDelete(null);
    } catch (error) {
      console.error('Erro ao eliminar topic:', error);
    }
  };

  if (loading) return <div className="sb-loading">Loading...</div>;

  return (
    <div>
      <div className="sb-header">
        <div>
          <h2 className="sb-title">My subjects</h2>
          <p className="sb-sub">{subjects.length} subject{subjects.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {subjects.length === 0 ? (
        <div className="sb-empty">
          <span>📚</span>
          <p>No subjects yet. Add one to get started.</p>
        </div>
      ) : (
        <div className="sb-list">
          {subjects.map((s) => {
            const subjectTopics = getTopicsForSubject(s.id);
            const isOpen = expanded[s.id];

            return (
              <div key={s.id} className="sb-subject">

                <div className="sb-subject-header" onClick={() => toggleExpand(s.id)}>
                  <div className="sb-subject-left">
                    <span className="sb-arrow">{isOpen ? '▾' : '▸'}</span>
                    <span className="sb-subject-icon">📚</span>
                    <div>
                      <p className="sb-subject-name">{s.subject_name}</p>
                      <p className="sb-subject-count">
                        {subjectTopics.length} topic{subjectTopics.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="sb-actions" onClick={e => e.stopPropagation()}>
                    <button
                      className="sb-btn-delete"
                      onClick={() => setConfirmDelete({ type: 'subject', id: s.id, name: s.subject_name })}
                    >
                      🗑
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="sb-topics">
                    {subjectTopics.length === 0 ? (
                      <p className="sb-no-topics">No topics yet.</p>
                    ) : (
                      subjectTopics.map((t) => (
                        <div key={t.id} className="sb-topic">
                          <div className="sb-topic-left">
                            <span className="sb-topic-icon">📝</span>
                            <div>
                              <p className="sb-topic-name">{t.title}</p>
                              <p className="sb-topic-date">{t.date?.split('T')[0]}</p>
                            </div>
                          </div>
                          <div className="sb-actions">
                            <button
                              className="sb-btn-delete"
                              onClick={() => setConfirmDelete({ type: 'topic', id: t.id, name: t.title })}
                            >
                              🗑
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                    <button
                      className="sb-add-topic"
                      onClick={() => navigate('/addtopic')}
                    >
                      + Add topic
                    </button>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO */}
      {confirmDelete && (
        <div className="sb-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="sb-modal" onClick={e => e.stopPropagation()}>
            <h3 className="sb-modal-title">Delete {confirmDelete.type}?</h3>
            <p className="sb-modal-text">
              Are you sure you want to delete <strong>{confirmDelete.name}</strong>?
              {confirmDelete.type === 'subject' && ' All topics and revisions will also be deleted.'}
              {confirmDelete.type === 'topic' && ' All revisions for this topic will also be deleted.'}
            </p>
            <div className="sb-modal-actions">
              <button className="sb-btn-cancel" onClick={() => setConfirmDelete(null)}>
                Cancel
              </button>
              <button
                className="sb-btn-confirm"
                onClick={() =>
                  confirmDelete.type === 'subject'
                    ? handleDeleteSubject(confirmDelete.id)
                    : handleDeleteTopic(confirmDelete.id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Subjects;