import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://web-production-7d784.up.railway.app/api/auth/forgot-password/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        alert('Email not found.');
      }
    } catch {
      alert('Unable to connect to server.');
    }
  };

  if (sent) return (
    <div className='login-page'>
      <div className='login-left'>
        <div className='login-brand'>
          <div className='login-brand-mark'>✦</div>
          <span className='login-brand-text'>RevisAI</span>
        </div>
        <h2 className='login-headline'>Check your<br />inbox.</h2>
        <p className='login-tagline'>We sent a reset link to {email}</p>
      </div>
      <div className='login-right'>
        <div className='login-card'>
          <h1>Email sent!</h1>
          <p>Check your inbox for the reset link. It expires in 1 hour.</p>
          <Link to="/login" style={{ display: 'block', marginTop: '1.5rem', textAlign: 'center', color: '#1D9E75', fontWeight: '500' }}>
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className='login-page'>
      <div className='login-left'>
        <div className='login-brand'>
          <div className='login-brand-mark'>✦</div>
          <span className='login-brand-text'>RevisAI</span>
        </div>
        <h2 className='login-headline'>Reset your<br />password.</h2>
        <p className='login-tagline'>Enter your email and we'll send you a reset link.</p>
      </div>
      <div className='login-right'>
        <div className='login-card'>
          <h1>Forgot password</h1>
          <p>Enter your account email</p>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
            <button type="submit">Send reset link</button>
          </form>
          <p className="signup-link">
            <Link to="/login">Back to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;