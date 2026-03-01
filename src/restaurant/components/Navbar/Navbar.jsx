import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2 className="navbar-title">Restaurant Dashboard</h2>
      <div className="navbar-user-section">
        <span className="navbar-username">Hello, Admin</span>
        <button className="navbar-logout-btn">Logout</button>
      </div>

      <style jsx>{`
        .navbar {
          height: 60px;
          width: calc(100% - 240px);
          background-color: #1b1f24;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          position: fixed;
          top: 0;
          left: 240px;
          z-index: 999;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }

        .navbar-title {
          font-size: 20px;
          font-weight: bold;
        }

        .navbar-user-section {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .navbar-username {
          font-size: 16px;
        }

        .navbar-logout-btn {
          padding: 6px 12px;
          background-color: #ff4d4d;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .navbar-logout-btn:hover {
          background-color: #ff3333;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .navbar {
            width: 100%;
            left: 0;
          }
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 0 15px;
          }

          .navbar-title {
            font-size: 18px;
          }

          .navbar-username {
            font-size: 14px;
          }

          .navbar-logout-btn {
            padding: 5px 10px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .navbar {
            padding: 0 10px;
          }

          .navbar-title {
            font-size: 16px;
          }

          .navbar-user-section {
            gap: 10px;
          }

          .navbar-username {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Navbar;