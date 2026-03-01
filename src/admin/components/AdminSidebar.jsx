import React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h2 className="logo">Admin Panel</h2>
      <ul className="sidebar-menu">
        <li className="menu-item">
          <Link to="/admin/dashboard" className="menu-link">
            <span className="menu-icon">📊</span>
            <span className="menu-text">Dashboard</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/admin/restaurants" className="menu-link">
            <span className="menu-icon">🏪</span>
            <span className="menu-text">All Restaurants</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/admin/add-restaurant" className="menu-link">
            <span className="menu-icon">➕</span>
            <span className="menu-text">Add New Restaurant</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/admin/restaurant-requests" className="menu-link">
            <span className="menu-icon">📨</span>
            <span className="menu-text">Requests</span>
            <span className="badge">3</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/admin/payments" className="menu-link">
            <span className="menu-icon">💳</span>
            <span className="menu-text">Payments</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/admin/locations" className="menu-link">
            <span className="menu-icon">📍</span>
            <span className="menu-text">Locations</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/admin/blocked-restaurants" className="menu-link">
            <span className="menu-icon">🚫</span>
            <span className="menu-text">Blocked</span>
            <span className="badge danger">2</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/admin/profile" className="menu-link">
            <span className="menu-icon">👤</span>
            <span className="menu-text">Profile</span>
          </Link>
        </li>
      </ul>

      <div className="sidebar-footer">
        <div className="admin-profile">
          <div className="profile-avatar">A</div>
          <div className="profile-info">
            <h4 className="admin-name">Admin User</h4>
            <p className="admin-role">Super Administrator</p>
          </div>
        </div>
        <button className="logout-btn">
          <span className="logout-icon">🚪</span>
          Logout
        </button>
      </div>

      <style jsx>{`
        /* Admin Sidebar Styles */
        .admin-sidebar {
          width: 280px;
          height: 100vh;
          background: linear-gradient(180deg, #1e3c72 0%, #2a5298 100%);
          color: white;
          padding: 30px 0;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          box-shadow: 5px 0 25px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .admin-sidebar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        }

        .logo {
          font-size: 24px;
          font-weight: 800;
          margin: 0 30px 40px;
          padding-bottom: 20px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          background: linear-gradient(135deg, #fff 0%, #a3b5ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 1px;
          position: relative;
        }

        .logo::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
          border-radius: 2px;
        }

        .sidebar-menu {
          list-style: none;
          padding: 0;
          margin: 0;
          flex: 1;
          overflow-y: auto;
          padding-right: 10px;
        }

        .menu-item {
          margin: 8px 20px;
          position: relative;
        }

        .menu-link {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 16px 20px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          font-weight: 500;
        }

        .menu-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .menu-link:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          transform: translateX(10px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .menu-link:hover::before {
          left: 100%;
        }

        .menu-link.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }

        .menu-icon {
          font-size: 20px;
          width: 24px;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .menu-link:hover .menu-icon {
          transform: scale(1.2);
        }

        .menu-text {
          flex: 1;
          font-size: 15px;
          letter-spacing: 0.3px;
        }

        .badge {
          background: #4facfe;
          color: white;
          font-size: 12px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
          min-width: 24px;
          text-align: center;
          animation: pulse 2s infinite;
        }

        .badge.danger {
          background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        /* Sidebar Footer */
        .sidebar-footer {
          padding: 25px 20px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 20px;
        }

        .admin-profile {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          transition: all 0.3s ease;
        }

        .admin-profile:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .profile-avatar {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
          color: white;
          box-shadow: 0 5px 15px rgba(79, 172, 254, 0.3);
        }

        .profile-info {
          flex: 1;
        }

        .admin-name {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 4px;
          color: white;
        }

        .admin-role {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          font-weight: 400;
        }

        .logout-btn {
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 14px 20px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          backdrop-filter: blur(10px);
        }

        .logout-btn:hover {
          background: rgba(255, 107, 107, 0.2);
          border-color: rgba(255, 107, 107, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(255, 107, 107, 0.2);
        }

        .logout-icon {
          font-size: 18px;
          transition: transform 0.3s ease;
        }

        .logout-btn:hover .logout-icon {
          transform: translateX(5px);
        }

        /* Scrollbar Styling */
        .sidebar-menu::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar-menu::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .sidebar-menu::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          border-radius: 10px;
        }

        .sidebar-menu::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .admin-sidebar {
            width: 250px;
            transform: translateX(-100%);
          }

          .admin-sidebar.open {
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            width: 100%;
            height: auto;
            position: fixed;
            bottom: 0;
            top: auto;
            padding: 15px;
            box-shadow: 0 -5px 25px rgba(0, 0, 0, 0.2);
            border-radius: 20px 20px 0 0;
          }

          .logo {
            display: none;
          }

          .sidebar-menu {
            display: flex;
            overflow-x: auto;
            gap: 10px;
            padding-bottom: 10px;
            flex: 0;
          }

          .menu-item {
            margin: 0;
            flex-shrink: 0;
          }

          .menu-link {
            flex-direction: column;
            padding: 12px;
            width: 80px;
            height: 80px;
            gap: 8px;
          }

          .menu-text {
            font-size: 12px;
            text-align: center;
          }

          .menu-icon {
            font-size: 18px;
          }

          .badge {
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 10px;
            padding: 2px 6px;
            min-width: 18px;
          }

          .sidebar-footer {
            display: none;
          }

          .menu-link:hover {
            transform: translateY(-5px);
          }
        }

        @media (max-width: 480px) {
          .admin-sidebar {
            padding: 10px;
          }

          .menu-link {
            width: 70px;
            height: 70px;
            padding: 10px;
          }

          .menu-icon {
            font-size: 16px;
          }

          .menu-text {
            font-size: 11px;
          }
        }

        /* Active Link Styling */
        .menu-link.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
          animation: activePulse 2s infinite;
        }

        @keyframes activePulse {
          0%, 100% { box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4); }
          50% { box-shadow: 0 5px 25px rgba(102, 126, 234, 0.6); }
        }

        /* Loading Animation */
        .admin-sidebar.loading .menu-link {
          animation: shimmer 1.5s infinite;
          background: linear-gradient(90deg, 
            rgba(255,255,255,0.05) 25%, 
            rgba(255,255,255,0.1) 50%, 
            rgba(255,255,255,0.05) 75%);
          background-size: 200% 100%;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
          .admin-sidebar {
            background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
          }

          .menu-link:hover {
            background: rgba(255, 255, 255, 0.05);
          }

          .logout-btn {
            background: rgba(255, 255, 255, 0.05);
          }
        }

        /* Print Styles */
        @media print {
          .admin-sidebar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}