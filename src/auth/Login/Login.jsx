import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // FAKE LOGIN — FRONTEND ONLY
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", form.role);

      setMessage("Login successful! Redirecting...");
      setLoading(false);

      // REDIRECT BASED ON ROLE
      if (form.role === "admin") {
        navigate("/admin/dashboard");
      } else if (form.role === "restaurant") {
        navigate("/restaurant/dashboard");
      } else {
        navigate("/home");
      }
    }, 1200);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* Decorative Elements */}
        <div className="decorative-corner top-left"></div>
        <div className="decorative-corner top-right"></div>
        <div className="decorative-corner bottom-left"></div>
        <div className="decorative-corner bottom-right"></div>
        
        {/* Logo/Header Section */}
        <div className="auth-header">
          <div className="logo-circle">
            <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue your culinary journey</p>
        </div>

        {/* Form Section */}
        <form className="auth-form" onSubmit={handleSubmit}>
          
          {/* EMAIL */}
          <div className="form-group floating">
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder=" "
              value={form.email}
              onChange={handleChange}
              required
            />
            <label className="form-label">Email Address</label>
            <div className="input-icon">
              <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="form-group floating">
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder=" "
              value={form.password}
              onChange={handleChange}
              required
            />
            <label className="form-label">Password</label>
            <div className="input-icon">
              <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* ROLE SELECTOR */}
          <div className="form-group">
            <label className="form-label">Login As</label>
            <div className="role-selector">
              {["user", "restaurant", "admin"].map((role) => (
                <div
                  key={role}
                  className={`role-option ${form.role === role ? "active" : ""}`}
                  onClick={() => setForm({ ...form, role })}
                >
                  <div className="role-icon">
                    {role === "user" && (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {role === "restaurant" && (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 22H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 22V16C9 15.4696 9.21071 14.9609 9.58579 14.5858C9.96086 14.2107 10.4696 14 11 14H13C13.5304 14 14.0391 14.2107 14.4142 14.5858C14.7893 14.9609 15 15.4696 15 16V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 10V6C6 5.46957 6.21071 4.96086 6.58579 4.58579C6.96086 4.21071 7.46957 4 8 4H8.5C9.88071 4 11 5.11929 11 6.5V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18 10V6C18 5.46957 17.7893 4.96086 17.4142 4.58579C17.0391 4.21071 16.5304 4 16 4H15.5C14.1193 4 13 5.11929 13 6.5V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {role === "admin" && (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="role-text">
                    {role === "user" ? "User" : role === "restaurant" ? "Restaurant" : "Admin"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </div>

          {/* BUTTON */}
          <button type="submit" className="auth-button" disabled={loading}>
            <span className="button-text">
              {loading ? "Signing In..." : "Sign In"}
            </span>
            {!loading && (
              <svg className="button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>

          {/* Message Display */}
          {message && (
            <div className="message success">
              <svg className="message-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {message}
            </div>
          )}
        </form>

        {/* Divider */}
        <div className="divider">
          <span className="divider-text">or continue with</span>
        </div>

        {/* Social Login */}
        <div className="social-login">
          <button type="button" className="social-button google">
            <svg className="social-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
              <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.14 18.63 6.72 16.7 5.84 14.1H2.18V16.94C4 20.53 7.7 23 12 23Z" fill="#34A853"/>
              <path d="M5.84 14.09C5.62 13.43 5.49 12.73 5.49 12C5.49 11.27 5.62 10.57 5.84 9.91V7.07H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.93L5.84 14.09Z" fill="#FBBC05"/>
              <path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.7 1 4 3.47 2.18 7.07L5.84 9.91C6.72 7.31 9.14 5.38 12 5.38Z" fill="#EA4335"/>
            </svg>
            <span>Google</span>
          </button>
          <button type="button" className="social-button facebook">
            <svg className="social-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" fill="#1877F2" stroke="#1877F2" strokeWidth="0.5"/>
            </svg>
            <span>Facebook</span>
          </button>
        </div>

        {/* Footer */}
        <div className="auth-footer">
          <p className="footer-text">
            New to FoodHub?{" "}
            <Link to="/signup" className="footer-link">
              Create an account
              <svg className="link-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </p>
        </div>
      </div>
      
      {/* Background Animation */}
      <div className="background-animation">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        /* Background Animation */
        .background-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          top: -150px;
          right: -100px;
          animation: float 15s infinite ease-in-out;
        }

        .shape-2 {
          width: 200px;
          height: 200px;
          bottom: -80px;
          left: -80px;
          animation: float 12s infinite ease-in-out reverse;
        }

        .shape-3 {
          width: 150px;
          height: 150px;
          top: 50%;
          right: 20%;
          animation: float 10s infinite ease-in-out;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        /* Card */
        .login-card {
          width: 100%;
          max-width: 480px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 48px 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 2;
          border: 1px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
        }

        /* Decorative Corners */
        .decorative-corner {
          position: absolute;
          width: 80px;
          height: 80px;
          border: 2px solid #667eea;
          opacity: 0.1;
        }

        .top-left {
          top: 0;
          left: 0;
          border-right: none;
          border-bottom: none;
          border-top-left-radius: 24px;
        }

        .top-right {
          top: 0;
          right: 0;
          border-left: none;
          border-bottom: none;
          border-top-right-radius: 24px;
        }

        .bottom-left {
          bottom: 0;
          left: 0;
          border-right: none;
          border-top: none;
          border-bottom-left-radius: 24px;
        }

        .bottom-right {
          bottom: 0;
          right: 0;
          border-left: none;
          border-top: none;
          border-bottom-right-radius: 24px;
        }

        /* Header */
        .auth-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .logo-circle {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          color: white;
        }

        .auth-title {
          font-size: 32px;
          font-weight: 800;
          color: #2c3e50;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .auth-subtitle {
          color: #7f8c8d;
          font-size: 16px;
          font-weight: 400;
          margin: 0;
        }

        /* Form */
        .auth-form {
          margin-bottom: 32px;
        }

        /* Floating Labels */
        .form-group.floating {
          position: relative;
          margin-bottom: 28px;
        }

        .form-input {
          width: 100%;
          padding: 18px 20px 18px 50px;
          font-size: 16px;
          border: 2px solid #e1e5e9;
          border-radius: 12px;
          background: #f8f9fa;
          transition: all 0.3s ease;
          outline: none;
          color: #2c3e50;
        }

        .form-input:focus {
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-input:focus + .form-label,
        .form-input:not(:placeholder-shown) + .form-label {
          transform: translateY(-28px) scale(0.85);
          color: #667eea;
          background: white;
          padding: 0 8px;
          left: 42px;
        }

        .form-label {
          position: absolute;
          left: 50px;
          top: 18px;
          color: #95a5a6;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.3s ease;
          pointer-events: none;
          transform-origin: left center;
        }

        .input-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #95a5a6;
        }

        .input-icon .icon {
          width: 20px;
          height: 20px;
        }

        /* Role Selector */
        .role-selector {
          display: flex;
          gap: 12px;
          margin-top: 12px;
        }

        .role-option {
          flex: 1;
          padding: 16px 12px;
          border: 2px solid #e1e5e9;
          border-radius: 12px;
          background: #f8f9fa;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .role-option:hover {
          border-color: #bdc3c7;
          transform: translateY(-2px);
        }

        .role-option.active {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }

        .role-icon {
          width: 32px;
          height: 32px;
          color: #667eea;
        }

        .role-text {
          font-size: 14px;
          font-weight: 600;
          color: #2c3e50;
          text-transform: capitalize;
        }

        .role-option.active .role-text {
          color: #667eea;
        }

        /* Form Options */
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 24px 0 32px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .checkbox-input {
          display: none;
        }

        .checkbox-custom {
          width: 20px;
          height: 20px;
          border: 2px solid #bdc3c7;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .checkbox-input:checked + .checkbox-custom {
          background: #667eea;
          border-color: #667eea;
        }

        .checkbox-input:checked + .checkbox-custom::after {
          content: "✓";
          color: white;
          font-size: 14px;
          font-weight: bold;
        }

        .checkbox-text {
          font-size: 14px;
          color: #7f8c8d;
        }

        .forgot-link {
          font-size: 14px;
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .forgot-link:hover {
          color: #764ba2;
          text-decoration: underline;
        }

        /* Button */
        .auth-button {
          width: 100%;
          padding: 18px 24px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .auth-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(102, 126, 234, 0.5);
        }

        .auth-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .auth-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .button-icon {
          width: 20px;
          height: 20px;
        }

        /* Message */
        .message {
          padding: 16px;
          border-radius: 12px;
          margin-top: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          animation: slideIn 0.5s ease;
        }

        .message.success {
          background: rgba(46, 204, 113, 0.1);
          color: #27ae60;
          border: 1px solid rgba(46, 204, 113, 0.2);
        }

        .message-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Divider */
        .divider {
          position: relative;
          text-align: center;
          margin: 32px 0;
        }

        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e1e5e9;
        }

        .divider-text {
          position: relative;
          display: inline-block;
          padding: 0 16px;
          background: white;
          color: #95a5a6;
          font-size: 14px;
        }

        /* Social Login */
        .social-login {
          display: flex;
          gap: 16px;
          margin-bottom: 32px;
        }

        .social-button {
          flex: 1;
          padding: 16px;
          border: 2px solid #e1e5e9;
          border-radius: 12px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #2c3e50;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .social-button:hover {
          transform: translateY(-2px);
          border-color: #bdc3c7;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .social-icon {
          width: 20px;
          height: 20px;
        }

        .social-button.google:hover {
          border-color: #4285F4;
        }

        .social-button.facebook:hover {
          border-color: #1877F2;
        }

        /* Footer */
        .auth-footer {
          text-align: center;
        }

        .footer-text {
          color: #7f8c8d;
          font-size: 14px;
          margin: 0;
        }

        .footer-link {
          color: #667eea;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #764ba2;
        }

        .link-arrow {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
        }

        .footer-link:hover .link-arrow {
          transform: translateX(4px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .login-card {
            padding: 32px 24px;
          }

          .auth-title {
            font-size: 28px;
          }

          .role-selector {
            flex-direction: column;
          }

          .social-login {
            flex-direction: column;
          }

          .shape-1,
          .shape-2,
          .shape-3 {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 16px;
          }

          .login-card {
            padding: 24px 20px;
          }

          .auth-title {
            font-size: 24px;
          }

          .auth-subtitle {
            font-size: 14px;
          }

          .form-input {
            padding: 16px 20px 16px 48px;
          }

          .input-icon {
            left: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;