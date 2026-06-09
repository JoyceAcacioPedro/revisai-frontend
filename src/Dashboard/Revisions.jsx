import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Revisions.css';

function Revisions() {
  const [search, setSearch] = useState('');
  const [revisions, setRevisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ← aqui dentro do componente

  useEffect(() => {
    const fetchRevisions = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8000/api/reviews/pending/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setRevisions(data);
      } catch (error) {
        console.error('Erro ao carregar revisões:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRevisions();
  }, []);

  const filtered = revisions.filter((r) => {
    const topicTitle = r.topic?.title || '';
    const subjectName = r.topic?.subject?.subject_name || '';
    const query = search.toLowerCase();
    return topicTitle.toLowerCase().includes(query) ||
           subjectName.toLowerCase().includes(query);
  });

  const getTypeIcon = (type) => {
    if (!type) return '📄';
    if (type.toLowerCase().includes('quiz')) return '❓';
    if (type.toLowerCase().includes('flash')) return '⚡';
    if (type.toLowerCase().includes('summar')) return '📝';
    return '📄';
  };

  const isOverdue = (date) => {
    return new Date(date) < new Date(new Date().toDateString());
  };

  const isToday = (date) => {
    return date === new Date().toISOString().split('T')[0];
  };

  if (loading) return <div className="rv-loading">Loading...</div>;

  return (
    <div>
      <div className="rv-header">
        <div>
          <h2 className="rv-title">Pending revisions</h2>
          <p className="rv-sub">{filtered.length} revision{filtered.length !== 1 ? 's' : ''} pending</p>
        </div>
      </div>

      <div className="rv-search-wrap">
        <input
          type="text"
          placeholder="Search by topic or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rv-search"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rv-empty">
          <span>🎉</span>
          <p>No pending revisions. You're all caught up!</p>
        </div>
      ) : (
        <div className="rv-list">
          {filtered.map((rev) => {
            const overdue = isOverdue(rev.data);
            const today = isToday(rev.data);
            return (
              <div
                key={rev.id}
                className={`rv-card ${overdue ? 'overdue' : ''} ${today ? 'today' : ''}`}
                onClick={() => navigate(`/study/${rev.id}${!today && !overdue ? '?early=true' : ''}`)}
                style={{ cursor: today || overdue ? 'pointer' : 'default' }}
              >
                <div className="rv-card-icon">{getTypeIcon(rev.type)}</div>
                <div className="rv-card-body">
                  <h4 className="rv-card-title">
                    {rev.topic?.title || 'Topic'}
                  </h4>
                  <p className="rv-card-subject">
                    {rev.topic?.subject?.subject_name || '—'}
                  </p>
                  <p className="rv-card-meta">
                    {rev.type} · {rev.data}
                  </p>
                </div>
                <div className="rv-card-right">
                  <span className={`rv-badge ${overdue ? 'late' : today ? 'today' : 'pending'}`}>
                    {overdue ? 'Overdue' : today ? 'Today' : 'Pending'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Revisions;