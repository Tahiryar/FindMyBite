// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords don't match!");
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setMessage("Account created successfully! Redirecting to login...");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join us today</p>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              placeholder="Choose a username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="terms-group">
            <input
              type="checkbox"
              id="terms"
              className="terms-checkbox"
              required
            />
            <label htmlFor="terms" className="terms-label">
              I agree to the <Link to="/terms" className="terms-link">Terms of Service</Link> and <Link to="/privacy" className="terms-link">Privacy Policy</Link>
            </label>
          </div>

          <button 
            type="submit" 
            className={`auth-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

          {message && (
            <div className={`message ${message.includes("don't match") ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </form>

        {/* Divider */}
        <div className="auth-divider">
          <span>Or sign up with</span>
        </div>

        {/* Social Signup */}
        <div className="social-buttons">
          <button type="button" className="social-button google">
            <svg className="social-icon" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          
          <button type="button" className="social-button facebook">
            <svg className="social-icon" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>
        </div>

        {/* Footer */}
        <div className="auth-footer">
          <p>Already have an account? <Link to="/Login" className="auth-link">Sign in</Link></p>
        </div>
      </div>

      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .auth-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 440px;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .auth-subtitle {
          color: #718096;
          font-size: 1rem;
        }

        .auth-form {
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 6px;
          font-size: 0.9rem;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #fafafa;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .terms-group {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin: 24px 0;
          padding: 16px;
          background: #f7fafc;
          border-radius: 8px;
        }

        .terms-checkbox {
          margin-top: 2px;
          accent-color: #667eea;
        }

        .terms-label {
          font-size: 0.875rem;
          color: #4a5568;
          line-height: 1.4;
        }

        .terms-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
        }

        .terms-link:hover {
          color: #5a67d8;
        }

        .auth-button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .auth-button:hover:not(.loading) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .auth-button.loading {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .message {
          padding: 12px;
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
          margin-top: 16px;
        }

        .message.success {
          background: #f0fff4;
          color: #38a169;
          border: 1px solid #9ae6b4;
        }

        .message.error {
          background: #fed7d7;
          color: #c53030;
          border: 1px solid #feb2b2;
        }

        .auth-divider {
          text-align: center;
          position: relative;
          margin: 24px 0;
          color: #a0aec0;
          font-size: 0.875rem;
        }

        .auth-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e2e8f0;
        }

        .auth-divider span {
          background: white;
          padding: 0 16px;
          position: relative;
        }

        .social-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .social-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 14px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: white;
          color: #4a5568;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .social-button:hover {
          border-color: #667eea;
          transform: translateY(-1px);
        }

        .social-icon {
          width: 20px;
          height: 20px;
        }

        .auth-footer {
          text-align: center;
          color: #718096;
          font-size: 0.9rem;
        }

        .auth-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }

        .auth-link:hover {
          color: #5a67d8;
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .auth-container {
            padding: 16px;
          }

          .auth-card {
            padding: 24px;
          }

          .auth-title {
            font-size: 1.75rem;
          }

          .terms-group {
            padding: 12px;
          }

          .social-buttons {
            gap: 8px;
          }

          .social-button {
            font-size: 0.85rem;
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default Signup;