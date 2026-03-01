// src/components/navbar/UserNavbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [loginHover, setLoginHover] = useState(false);
  const [signupHover, setSignupHover] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          FindMyBite
        </Link>
        
        <div className="navbar-buttons">
          <button
            className={`navbar-btn login-btn ${loginHover ? 'hover' : ''}`}
            onMouseEnter={() => setLoginHover(true)}
            onMouseLeave={() => setLoginHover(false)}
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className={`navbar-btn signup-btn ${signupHover ? 'hover' : ''}`}
            onMouseEnter={() => setSignupHover(true)}
            onMouseLeave={() => setSignupHover(false)}
            onClick={() => navigate('/signup')}
          >
            Signup
          </button>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background: #ffffff;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
          padding: 0;
          position: sticky;
          top: 0;
          z-index: 1000;
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-logo {
          font-size: 28px;
          font-weight: 800;
          color: #e74c3c;
          text-decoration: none;
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
          transition: all 0.3s ease;
        }

        .navbar-logo:hover {
          transform: scale(1.05);
        }

        .navbar-buttons {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .navbar-btn {
          padding: 10px 24px;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .login-btn {
          background: transparent;
          color: #666;
          border: 2px solid transparent;
        }

        .login-btn.hover,
        .login-btn:hover {
          color: #e74c3c;
          border-color: #e74c3c;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(231, 76, 60, 0.2);
        }

        .signup-btn {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          color: white;
          border: 2px solid transparent;
          box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
        }

        .signup-btn.hover,
        .signup-btn:hover {
          background: linear-gradient(135deg, #c0392b, #a93226);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
        }

        @media (max-width: 768px) {
          .navbar-container {
            padding: 12px 16px;
          }

          .navbar-logo {
            font-size: 24px;
          }

          .navbar-btn {
            padding: 8px 16px;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .navbar-buttons {
            gap: 8px;
          }

          .navbar-btn {
            padding: 8px 12px;
            font-size: 12px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;