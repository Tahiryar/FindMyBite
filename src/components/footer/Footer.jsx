// src/components/footer/Footer.js
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">FindMyBite</h3>
            <p className="footer-description">
              Discover the best restaurants in your area and enjoy delicious meals delivered to your doorstep.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/restaurants">Restaurants</Link></li>
              <li><Link to="/deals">Deals</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact Info</h4>
            <div className="contact-info">
              <p>📧 info@findmybite.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Food Street, City, State</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 FindMyBite. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Instagram">📷</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #2c3e50, #34495e);
          color: white;
          margin-top: auto;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 50px 20px 20px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-section h3.footer-title {
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
        }

        .footer-description {
          line-height: 1.6;
          color: #bdc3c7;
          margin: 0;
        }

        .footer-heading {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #ecf0f1;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-links a {
          color: #bdc3c7;
          text-decoration: none;
          transition: color 0.3s ease;
          font-weight: 500;
        }

        .footer-links a:hover {
          color: #e74c3c;
        }

        .contact-info p {
          margin-bottom: 12px;
          color: #bdc3c7;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 30px;
          border-top: 1px solid #34495e;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-bottom p {
          margin: 0;
          color: #95a5a6;
        }

        .social-links {
          display: flex;
          gap: 16px;
        }

        .social-links a {
          color: #bdc3c7;
          font-size: 20px;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-links a:hover {
          color: #e74c3c;
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 40px 16px 20px;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 30px;
            text-align: center;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .contact-info p {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .footer-content {
            gap: 24px;
          }

          .footer-section h3.footer-title {
            font-size: 24px;
          }

          .footer-heading {
            font-size: 16px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;