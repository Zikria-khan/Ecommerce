import React, { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import './AuthStyles.css'; // Import the CSS file

function RegisterPage() {
  const [name, setName] = useState(''); // New state for name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser({ name, email, password }); // Include name in registration

    if (result.success) {
      localStorage.clear(); // Clear all local storage
      alert('Registration successful! Redirecting to home page.'); // Optional alert
      setTimeout(() => {
        navigate('/'); // Redirect to home page after a short delay
      }, 6000); // 2 seconds delay
    } else {
      alert(`Registration failed: ${result.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="auth-input"
          required
        />
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
        <button type="submit" className="auth-button">Register</button>
      </form>
      <div className="auth-footer">
        <Link to="/" className="back-button">Back to Home</Link>
        <p>Already have an account? <Link to="/login" className="switch-link">Login</Link></p>
      </div>
    </div>
  );
}

export default RegisterPage;
