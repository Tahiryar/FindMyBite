// src/pages/Main.jsx
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import foodvideoMp4 from "../video/foodvideo.mp4";

const Main = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Video loop settings
    if (videoRef.current) {
      videoRef.current.play().catch(e => {
        console.log("Autoplay prevented:", e);
      });
    }
  }, []);

  return (
    <div className="main-page">
      {/* Hero Section with Video Background */}
      <div className="hero-section">
        {/* Video Background */}
        <div className="video-background">
          <video
            ref={videoRef}
            className="background-video"
            loop
            muted
            playsInline
            autoPlay
          >
            <source src={foodvideoMp4} type="video/mp4" />
          </video>
        </div>
        
        <div className="hero-content">
          <h1 className="main-title" style={{ color: "red" }} >
            FindMYBite.
          </h1>
          
          <p className="subtitle">
            Restaurants delivering & Takeout near you
          </p>

          {/* Login and Signup Buttons - Centered below subtitle */}
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">
              Log in
            </Link>
            <Link to="/signup" className="signup-btn">
              Sign up
            </Link>
          </div>

          {/* App Download Buttons - Image wali EXACT style */}
          <div className="app-download-section">
            <p className="download-text">Get the app</p>
            <div className="app-badges">
              {/* App Store Button - EXACT Image Style */}
              <button className="app-store-badge">
                <span className="badge-icon">📱</span>
                <div className="badge-content">
                  <div className="badge-text">Download on the</div>
                  <div className="badge-title">App Store</div>
                </div>
              </button>
              
              {/* Google Play Button - EXACT Image Style */}
              <button className="google-play-badge">
                <span className="badge-icon">▶️</span>
                <div className="badge-content">
                  <div className="badge-text">GET IT ON</div>
                  <div className="badge-title">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DID SOMEBODY SAY JUST EAT Section */}
      <div className="brand-section">
        <div className="brand-content">
          <h2 className="brand-question">
            DID SOMEBODY SAY
          </h2>
          <h1 className="brand-name">
            JUST EAT
          </h1>
          <p className="brand-subtitle">
            Discover amazing food from local restaurants
          </p>
          
          <div className="brand-features">
            <div className="feature">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Get your food delivered in minutes</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">🍔</div>
              <h3>Wide Variety</h3>
              <p>Choose from thousands of restaurants</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">⭐</div>
              <h3>Top Rated</h3>
              <p>Only the best restaurants on our platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="how-it-works">
        <h2 className="section-title">How it works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-icon">📍</div>
            <h3>Enter your address</h3>
            <p>Tell us where you are and we'll show you what's nearby</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-icon">🍽️</div>
            <h3>Choose your food</h3>
            <p>Browse menus from local restaurants and grocery stores</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-icon">🚚</div>
            <h3>Get it delivered</h3>
            <p>Track your order in real-time until it arrives at your door</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>FindMYBite</h3>
            <p>Your favorite food, delivered.</p>
            <div className="footer-app-badges">
              <button className="footer-app-store-badge">
                <span className="badge-icon">📱</span>
                <div className="badge-content">
                  <div className="badge-text">Download on the</div>
                  <div className="badge-title">App Store</div>
                </div>
              </button>
              
              <button className="footer-google-play-badge">
                <span className="badge-icon">▶️</span>
                <div className="badge-content">
                  <div className="badge-text">GET IT ON</div>
                  <div className="badge-title">Google Play</div>
                </div>
              </button>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/press">Press</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><Link to="/help">Help & Support</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>For Restaurants</h4>
            <ul>
              <li><Link to="/partner">Partner with us</Link></li>
              <li><Link to="/business">For Business</Link></li>
              <li><Link to="/register">Register your restaurant</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 FindMYBite. All rights reserved.</p>
          <div className="social-icons">
            <span className="social-icon">📘</span>
            <span className="social-icon">🐦</span>
            <span className="social-icon">📸</span>
            <span className="social-icon">🎬</span>
          </div>
        </div>
      </footer>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .main-page {
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          background: #ffffff;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        button {
          cursor: pointer;
          border: none;
          background: none;
        }

        /* Hero Section with Video Background */
        .hero-section {
          position: relative;
          padding: 80px 20px;
          text-align: center;
          color: white;
          min-height: 700px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .video-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .background-video {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          object-fit: cover;
          filter: none;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .main-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 20px;
          line-height: 1.1;
          color: red;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 0, 0, 0.5);
        }

        .subtitle {
          font-size: 1.3rem;
          margin-bottom: 40px;
          opacity: 0.95;
          font-weight: 400;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7), 0 0 10px rgba(0, 0, 0, 0.5);
        }

        /* Auth Buttons - Centered */
        .auth-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 50px;
        }

        .login-btn {
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          padding: 14px 35px;
          border-radius: 30px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          white-space: nowrap;
          min-width: 140px;
        }

        .login-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.7);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .signup-btn {
          color: #FF6B6B;
          font-size: 1.1rem;
          font-weight: 700;
          padding: 14px 35px;
          border-radius: 30px;
          background: white;
          border: none;
          transition: all 0.3s ease;
          white-space: nowrap;
          min-width: 140px;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
        }

        .signup-btn:hover {
          background: #f8f8f8;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
        }

        /* App Download Section - EXACT Image Style */
        .app-download-section {
          margin-top: 30px;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .download-text {
          font-size: 1rem;
          margin-bottom: 25px;
          opacity: 0.9;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .app-badges {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        /* App Store Badge - EXACT Image Style */
        .app-store-badge {
          display: inline-flex;
          align-items: center;
          background: #000;
          color: white;
          padding: 12px 24px;
          border-radius: 10px;
          text-decoration: none;
          transition: transform 0.2s, opacity 0.2s;
          cursor: pointer;
          border: none;
          min-width: 220px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        .app-store-badge:hover {
          transform: translateY(-3px);
          opacity: 0.95;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }

        /* Google Play Badge - EXACT Image Style */
        .google-play-badge {
          display: inline-flex;
          align-items: center;
          background: #000;
          color: white;
          padding: 12px 24px;
          border-radius: 10px;
          text-decoration: none;
          transition: transform 0.2s, opacity 0.2s;
          cursor: pointer;
          border: none;
          min-width: 220px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        .google-play-badge:hover {
          transform: translateY(-3px);
          opacity: 0.95;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }

        .badge-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        /* App Store Specific Styles */
        .app-store-badge .badge-icon {
          font-size: 28px;
          margin-right: 12px;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .app-store-badge .badge-text {
          font-size: 14px;
          font-weight: 400;
          opacity: 0.9;
          line-height: 1;
          margin-bottom: 2px;
          text-align: left;
        }

        .app-store-badge .badge-title {
          font-size: 24px;
          font-weight: 600;
          line-height: 1;
          text-align: left;
          letter-spacing: -0.5px;
        }

        /* Google Play Specific Styles */
        .google-play-badge .badge-icon {
          font-size: 24px;
          margin-right: 12px;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .google-play-badge .badge-text {
          font-size: 14px;
          font-weight: 500;
          opacity: 0.9;
          line-height: 1;
          margin-bottom: 2px;
          text-align: left;
        }

        .google-play-badge .badge-title {
          font-size: 22px;
          font-weight: 500;
          line-height: 1;
          text-align: left;
          letter-spacing: -0.5px;
        }

        /* Brand Section */
        .brand-section {
          padding: 80px 20px;
          background: #f8f9fa;
          text-align: center;
        }

        .brand-content {
          max-width: 1000px;
          margin: 0 auto;
        }

        .brand-question {
          font-size: 2rem;
          color: #666;
          font-weight: 700;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .brand-name {
          font-size: 5rem;
          font-weight: 900;
          color: #FF6B6B;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .brand-subtitle {
          font-size: 1.3rem;
          color: #666;
          margin-bottom: 60px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .brand-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin-top: 40px;
        }

        .feature {
          padding: 40px 30px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .feature:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .feature h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 15px;
        }

        .feature p {
          color: #666;
          font-size: 1rem;
          line-height: 1.5;
        }

        /* How It Works */
        .how-it-works {
          padding: 80px 20px;
          background: white;
          text-align: center;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #333;
          margin-bottom: 60px;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .step {
          position: relative;
          padding: 40px 30px;
          background: #f8f9fa;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .step:hover {
          background: white;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
          transform: translateY(-5px);
        }

        .step-number {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 50px;
          background: #FF6B6B;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 800;
        }

        .step-icon {
          font-size: 3rem;
          margin: 20px 0;
        }

        .step h3 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 15px;
        }

        .step p {
          color: #666;
          font-size: 1rem;
          line-height: 1.5;
        }

        /* Footer */
        .main-footer {
          background: #2d3436;
          color: white;
          padding: 60px 20px 30px;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-section h3,
        .footer-section h4 {
          margin-bottom: 20px;
          font-weight: 700;
        }

        .footer-section h3 {
          font-size: 1.8rem;
          color: #FF6B6B;
        }

        .footer-section h4 {
          font-size: 1.1rem;
          color: white;
        }

        .footer-section p {
          color: #b0b0b0;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .footer-section ul {
          list-style: none;
        }

        .footer-section ul li {
          margin-bottom: 10px;
        }

        .footer-section ul li a {
          color: #b0b0b0;
          transition: color 0.3s ease;
        }

        .footer-section ul li a:hover {
          color: white;
        }

        /* Footer App Badges - EXACT Image Style */
        .footer-app-badges {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-app-store-badge,
        .footer-google-play-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.1);
          padding: 10px 18px;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.3s ease;
          color: white;
          border: none;
          text-align: left;
        }

        .footer-app-store-badge:hover,
        .footer-google-play-badge:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .footer-app-store-badge .badge-content,
        .footer-google-play-badge .badge-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-app-store-badge .badge-text,
        .footer-google-play-badge .badge-text {
          font-size: 12px;
          opacity: 0.9;
          line-height: 1;
          margin-bottom: 2px;
        }

        .footer-app-store-badge .badge-title,
        .footer-google-play-badge .badge-title {
          font-size: 18px;
          font-weight: 600;
          line-height: 1;
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-bottom p {
          color: #b0b0b0;
          font-size: 0.9rem;
        }

        .social-icons {
          display: flex;
          gap: 15px;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .social-icon:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Responsive Design */
        @media (max-width: 992px) {
          .main-title {
            font-size: 2.8rem;
          }

          .brand-name {
            font-size: 4rem;
          }

          .auth-buttons {
            flex-direction: column;
            align-items: center;
            gap: 15px;
          }

          .login-btn,
          .signup-btn {
            width: 250px;
            text-align: center;
          }

          .app-badges {
            flex-direction: column;
            align-items: center;
          }

          .app-store-badge,
          .google-play-badge {
            width: 250px;
          }

          .brand-features,
          .steps {
            grid-template-columns: repeat(2, 1fr);
          }

          .footer-content {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 60px 20px;
            min-height: 650px;
          }

          .main-title {
            font-size: 2.2rem;
          }

          .subtitle {
            font-size: 1.1rem;
            margin-bottom: 30px;
          }

          .brand-name {
            font-size: 3rem;
          }

          .brand-question {
            font-size: 1.5rem;
          }

          .brand-features,
          .steps {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 2rem;
          }

          .footer-content {
            grid-template-columns: 1fr;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }

          .login-btn,
          .signup-btn {
            font-size: 1rem;
            padding: 12px 30px;
            min-width: 200px;
          }

          .app-store-badge,
          .google-play-badge {
            min-width: 220px;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            min-height: 600px;
          }

          .main-title {
            font-size: 1.8rem;
          }

          .brand-name {
            font-size: 2.5rem;
          }

          .login-btn,
          .signup-btn {
            font-size: 0.95rem;
            padding: 11px 25px;
            min-width: 180px;
          }

          .app-store-badge,
          .google-play-badge {
            min-width: 200px;
            padding: 10px 20px;
          }
        }

        /* Mobile mein video background hide na ho */
        @media (max-width: 768px) {
          .background-video {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default Main;