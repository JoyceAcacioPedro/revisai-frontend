import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const [activities, setActivities] = useState([]);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Busca o nome real do utilizador
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('https://web-production-7d784.up.railway.app/api/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        // Usa o primeiro nome, ou o username sem o email
        setUserName(data.first_name || data.username?.split('@')[0] || 'Student');
      } catch {
        setUserName(localStorage.getItem('username')?.split('@')[0] || 'Student');
      }
    };

    const fetchActivities = async () => {
      try {
        const response = await api.get('activity/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setActivities(response.data);
      } catch (error) {
        console.error('Erro ao buscar atividades:', error);
      }
    };

    fetchProfile();
    fetchActivities();
  }, []);

  const getIcon = (type) => {
    if (!type) return 'summary';
    const t = type.toLowerCase();
    if (t.includes('quiz')) return 'quiz';
    if (t.includes('flash')) return 'flash';
    return 'summary';
  };

  const isToday = (date) => {
    return date === new Date().toISOString().split('T')[0];
  };

  return (
    <div className="db-container">

      <div className="db-welcome">
        <div className="db-welcome-text">
          <h2>Hello, {userName}.</h2>
          <p>{activities.length} revision{activities.length !== 1 ? 's' : ''} scheduled for today</p>
        </div>
        <div className="db-streak">
          <span className="db-streak-num">{activities.length}</span>
          <span className="db-streak-label">today</span>
        </div>
      </div>

      <div className="db-content">
        <div className="db-section-header">
          <span className="db-section-title">Today's revisions</span>
          <Link to="/revisions" className="db-see-all">See all</Link>
        </div>

        <div className="db-activity-list">
          {activities.length === 0 ? (
            <div className="db-empty">
              <span>📚</span>
              <p>No revisions for today. Enjoy your rest!</p>
            </div>
          ) : (
            activities.map((item) => (
              <div
                key={item.id}
                className="db-activity-card"
                onClick={() => navigate(`/study/${item.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className={`db-activity-icon ${getIcon(item.type)}`}>
                  {item.type?.includes('quiz') ? '?' :
                   item.type?.includes('flash') ? '⚡' : '📄'}
                </div>
                <div className="db-activity-info">
                  <div className="db-activity-title">
                    {item.topic?.title || item.materia || 'Topic'}
                  </div>
                  <div className="db-activity-meta">
                    {item.type} · {item.data}
                  </div>
                </div>
                <span className={`db-badge ${item.status === 'Complete' ? 'done' : 'pending'}`}>
                  {item.status === 'Complete' ? 'Done' : 'Pending'}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;