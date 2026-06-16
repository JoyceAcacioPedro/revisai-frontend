import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import.meta.env.VITE_API_URL

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("All fields are required.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    const userLoginData = {
      email : email,
      password : password,
    };

    try {
      // ✅ Correção: Usa o link dinâmico da variável de ambiente ou o fallback local
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      
      const response = await fetch(`${apiUrl}/api/user/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLoginData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        // 🔐 Armazena o token de acesso de forma correta
        localStorage.setItem("token", data.access);
        localStorage.setItem("username", email.split('@')[0]);

        navigate('/dashboard');
      } else {
        alert("Error: " + (data.detail || "Invalid credentials"));
      }

    } catch (error) {
      console.error("Server error:", error);
      alert("Unable to connect to the server.");
    }
  };

 return (
  <div className='login-page'>

    <div className='login-left'>
      <div className='login-brand'>
        <div className='login-brand-mark'>✦</div>
        <span className='login-brand-text'>RevisAI</span>
      </div>
      <h2 className='login-headline'>Study smarter,<br />not harder.</h2>
      <p className='login-tagline'>
        AI-powered revision plans that adapt to you —
        so you retain more and stress less.
      </p>
    </div>

    <div className='login-right'>
      <div className='login-card'>
        <h1>Welcome back</h1>
        <p>Login to continue to RevisAI</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p className="signup-link">
  <Link to="/forgot-password">Forgot password?</Link>
</p>
      </div>
    </div>

  </div>
);
}

export default Login;