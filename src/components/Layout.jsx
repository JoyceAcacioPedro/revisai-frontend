import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaBookOpen, FaPlusCircle, FaChartLine, FaUser } from 'react-icons/fa';
import './Layout.css';

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = localStorage.getItem('username') || 'Student';
  const [modalOpen, setModalOpen] = useState(false);

  const today = new Date().toLocaleDateString('pt-PT', {
    weekday: 'long', day: 'numeric', month: 'short',
  });

  const navItems = [
    { to: '/dashboard', icon: <FaHome size={16} />, label: 'Dashboard' },
    { to: '/revisions', icon: <FaBookOpen size={16} />, label: 'Revisions' },
    { to: '/progress', icon: <FaChartLine size={16} />, label: 'Progress' },
    { to: '/subjects', icon: <FaBookOpen size={16} />, label: 'My Subjects' },
  ];

  const handleAdd = (path) => {
    setModalOpen(false);
    navigate(path);
  };

  return (
    <div className="layout-shell">

      {/* TOPBAR */}
      <header className="layout-topbar">
        <div className="layout-logo">
          <div className="layout-logo-mark">✦</div>
          <span className="layout-logo-text">Revis<span>AI</span></span>
        </div>
        <div className="layout-topbar-right">
          <span className="layout-greeting">{today}</span>
          <div className="layout-avatar">{userName.slice(0, 2).toUpperCase()}</div>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className="layout-sidebar">
        <span className="layout-nav-label">Menu</span>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`layout-nav-item ${location.pathname === item.to ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
        <button className="layout-nav-item add-item" onClick={() => setModalOpen(true)}>
          <FaPlusCircle size={16} />
          <span>Add</span>
        </button>
        <span className="layout-nav-label">Account</span>
        <Link
          to="/profile"
          className={`layout-nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
        >
          <FaUser size={16} /><span>Profile</span>
        </Link>
      </aside>

      {/* MAIN */}
      <main className="layout-main">
        {children}
      </main>

      {/* MOBILE NAV */}
      <nav className="layout-mobile-nav">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`layout-mobile-item ${location.pathname === item.to ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
        <button className="layout-mobile-item add-item" onClick={() => setModalOpen(true)}>
          <FaPlusCircle size={20} />
          <span>Add</span>
        </button>
        <Link
          to="/profile"
          className={`layout-mobile-item ${location.pathname === '/profile' ? 'active' : ''}`}
        >
          <FaUser size={16} /><span>Profile</span>
        </Link>
      </nav>

      {/* MODAL */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">What to add?</span>
              <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <div className="modal-options">
              <button className="modal-option" onClick={() => handleAdd('/addsubject')}>
                <span className="modal-option-icon">📚</span>
                <div>
                  <p className="modal-option-title">Subject</p>
                  <p className="modal-option-sub">Add a new subject area</p>
                </div>
              </button>
              <button className="modal-option" onClick={() => handleAdd('/addtopic')}>
                <span className="modal-option-icon">📝</span>
                <div>
                  <p className="modal-option-title">Topic</p>
                  <p className="modal-option-sub">Add a topic to a subject</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Layout;