import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaUtensils, 
  FaPlus, 
  FaList, 
  FaImage, 
  FaSignOutAlt, 
  FaHome, 
  FaClipboardList, 
  FaBell, 
  FaHourglassHalf 
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/restaurant/dashboard", icon: FaHome, label: "Dashboard" },
    { path: "/restaurant/add-dish", icon: FaPlus, label: "Add New Dish" },
    { path: "/restaurant/menu-list", icon: FaList, label: "Menu List" },
    { path: "/restaurant/update-images", icon: FaImage, label: "Update Images" },
    { path: "/restaurant/orders", icon: FaClipboardList, label: "Orders" },
    { path: "/restaurant/pending-orders", icon: FaHourglassHalf, label: "Pending Orders" },
    { path: "/restaurant/notifications", icon: FaBell, label: "Notifications" },
    { path: "/logout", icon: FaSignOutAlt, label: "Logout" }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <h2 className="logo">Restaurant Panel</h2>

      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.path} className="menu-item">
            <Link 
              to={item.path} 
              className={`menu-link ${isActive(item.path) ? 'active' : ''}`}
            >
              <item.icon className="menu-icon" />
              <span className="menu-label">{item.label}</span>
              {isActive(item.path) && <div className="active-indicator"></div>}
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .sidebar {
          width: 240px;
          height: 100vh;
          background: linear-gradient(135deg, #1b1f24 0%, #2d3748 100%);
          color: white;
          padding: 20px;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
          overflow-y: auto;
        }

        .logo {
          margin-bottom: 40px;
          text-align: center;
          font-size: 22px;
          font-weight: bold;
          color: #ff6b6b;
          padding-bottom: 20px;
          border-bottom: 1px solid #374151;
        }

        .menu-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .menu-item {
          margin-bottom: 8px;
          position: relative;
        }

        .menu-link {
          color: #d1d5db;
          text-decoration: none;
          font-size: 16px;
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
        }

        .menu-link:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          transform: translateX(4px);
        }

        .menu-link.active {
          background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
          color: white;
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
        }

        .menu-icon {
          margin-right: 12px;
          font-size: 18px;
          width: 20px;
          text-align: center;
        }

        .menu-label {
          flex: 1;
          font-weight: 500;
        }

        .active-indicator {
          width: 4px;
          height: 20px;
          background: white;
          border-radius: 2px;
          margin-left: 8px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }

          .sidebar.open {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;