import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Start.css';

// 1. BARRA DE NAVEGAÇÃO SUPERIOR
function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="start-nav">
      <div className="start-logo">Revis<span>AI</span></div>
      <div className="start-nav-buttons">
        <button className="btn-login-nav" onClick={() => navigate('/login')}>Log In</button>
        <button className="btn-signup-nav" onClick={() => navigate('/signup')}>Get Started</button>
      </div>
    </nav>
  );
}

// 2. SEÇÃO PRINCIPAL (HERO)
function Hero() {
  const navigate = useNavigate();
  return (
    <header className="start-hero">
      <div className="start-hero-content">
        <span className="hero-badge">✨ Smart Studying</span>
        <h1>Never forget what you learn. Let AI handle your reviews.</h1>
        <p>
          Upload your notes, study material, or summaries. Our AI instantly breaks down the 
          content and builds a scientifically optimized revision plan using spaced repetition.
        </p>
        <div className="start-hero-btns">
          <button className="start-btn-primary" onClick={() => navigate('/signup')}>Create Free Account</button>
          <button className="start-btn-secondary" onClick={() => navigate('/login')}>Already have an account</button>
        </div>
      </div>
      <div className="start-hero-image">
        <div className="hero-mockup">
          <div className="mockup-dot-row"><span className="dot"></span><span className="dot"></span><span className="dot"></span></div>
          <div className="mockup-preview-item">
            <span className="m-icon">⚡</span>
            <div>
              <h6>Physics: Newton's Laws</h6>
              <p>Active Recall Quiz • Due Today</p>
            </div>
            <span className="m-badge">Pending</span>
          </div>
          <div className="mockup-preview-item done">
            <span className="m-icon">📄</span>
            <div>
              <h6>Biology: Cell Division</h6>
              <p>Summary Review • Completed</p>
            </div>
            <span className="m-badge-done">Done</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// 3. COMO FUNCIONA O SISTEMA (HOW IT WORKS)
function HowItWorks() {
  return (
    <section className="start-how">
      <div className="start-section-title">
        <h2>How it works</h2>
        <p>Three simple steps to long-term memory retention</p>
      </div>
      <div className="start-how-grid">
        <div className="how-card">
          <div className="how-num">1</div>
          <h4>Create & Upload</h4>
          <p>Create a subject and upload your study notes, texts, or attachments into a topic.</p>
        </div>
        <div className="how-card">
          <div className="how-num">2</div>
          <h4>AI Processing</h4>
          <p>Our built-in AI analyzes your content and calculates optimal review intervals.</p>
        </div>
        <div className="how-card">
          <div className="how-num">3</div>
          <h4>Daily Execution</h4>
          <p>Log in every day to check your dashboard, complete tasks, and build your study streak.</p>
        </div>
      </div>
    </section>
  );
}

// 4. RECURSOS CHAVE (FEATURES)
function Features() {
  return (
    <section className="start-features">
      <div className="start-section-title">
        <h2>System Features</h2>
        <p>Everything you need to master your exams</p>
      </div>
      <div className="start-features-grid">
        <div className="feature-item">
          <span className="f-icon">🤖</span>
          <h3>AI Revision Assistant</h3>
          <p>Automated planning that adjusts to your learning speed without manual calendar setup.</p>
        </div>
        <div className="feature-item">
          <span className="f-icon">📊</span>
          <h3>Progress Tracking</h3>
          <p>Beautiful completion bars showing your retention progress per subject in real-time.</p>
        </div>
        <div className="feature-item">
          <span className="f-icon">🔥</span>
          <h3>Streak Engine</h3>
          <p>Gamified accountability system to help you stay disciplined every single day.</p>
        </div>
      </div>
    </section>
  );
}

// 5. COMPONENTE PRINCIPAL MÃE (START)
function Start() {
  return (
    <div className="start-landing-container">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <footer className="start-footer">
        <p>&copy; 2026 RevisAI. Your AI-powered study assistant. Developed with 💚 by{' '}
            <a href="https://www.linkedin.com/in/joyceacaciopedro/" target="_blank" rel="noopener noreferrer">
            Joyce Pedro
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Start;