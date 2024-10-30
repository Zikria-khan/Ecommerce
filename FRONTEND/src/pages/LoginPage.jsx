import React, { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import './AuthStyles.css'; // Import the CSS file

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser({ email, password });
    if (result.token) {
      localStorage.setItem('token', result.token);
      navigate('/'); // Redirect to home after successful login
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="auth-input"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="auth-input"
          required
        />
        <button type="submit" className="auth-button">Login</button>
      </form>
      <div className="auth-footer">
        <Link to="/" className="back-button">Back to Home</Link>
        <p>Don't have an account? <Link to="/register" className="switch-link">Register</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
