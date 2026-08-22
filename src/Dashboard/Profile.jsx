import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('${API_URL}/api/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
    loadProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  if (!user) return <div className="pf-loading">Loading...</div>;

 const initials = `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase();

  return (
    <div>

      {/* AVATAR + NOME */}
      <div className="pf-hero">
        <div className="pf-avatar">{initials}</div>
        <div>
          <h2 className="pf-name">
            {user.first_name || user.username} {user.last_name}
          </h2>
          <p className="pf-username">{user.email}</p>
        </div>
      </div>

      {/* INFO CARD */}
      <div className="pf-card">
        <p className="pf-card-title">Account info</p>

        <div className="pf-row">
          <span className="pf-label">Email</span>
          <span className="pf-value">{user.email || '—'}</span>
        </div>
        <div className="pf-divider" />

        <div className="pf-row">
  <span className="pf-label">Username</span>
  <span className="pf-value">
    {user.first_name} {user.last_name}
  </span>
</div>
        <div className="pf-divider" />

        <div className="pf-row">
          <span className="pf-label">Country</span>
          <span className="pf-value">{user.country || '—'}</span>
        </div>
        <div className="pf-divider" />

        <div className="pf-row">
          <span className="pf-label">Member since</span>
          <span className="pf-value">
            {user.date_joined
              ? new Date(user.date_joined).toLocaleDateString('pt-PT', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })
              : '—'}
          </span>
        </div>
      </div>

      {/* LOGOUT */}
      <button className="pf-logout" onClick={handleLogout}>
        Log out
      </button>

    </div>
  );
}

export default Profile;