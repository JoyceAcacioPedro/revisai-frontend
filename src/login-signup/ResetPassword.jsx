import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Login.css';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirm) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/auth/reset-password/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, password }),
      });

      if (res.ok) {
        alert('Password reset successfully!');
        navigate('/login');
      } else {
        alert('Invalid or expired link.');
      }
    } catch {
      alert('Unable to connect to server.');
    }
  };

  return (
    <div className='login-page'>
      <div className='login-left'>
        <div className='login-brand'>
          <div className='login-brand-mark'>✦</div>
          <span className='login-brand-text'>RevisAI</span>
        </div>
        <h2 className='login-headline'>New<br />password.</h2>
        <p className='login-tagline'>Choose a strong password for your account.</p>
      </div>
      <div className='login-right'>
        <div className='login-card'>
          <h1>Reset password</h1>
          <p>Enter your new password below</p>
          <form onSubmit={handleSubmit}>
            <label>New password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              required
            />
            <label>Confirm password</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Repeat password"
              required
            />
            <button type="submit">Reset password</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;