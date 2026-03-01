import React, { useState } from "react";
import Sidebar from "../components/Sidebar/restuarentSidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";

export default function DashboardLayout() {
  const [dishes, setDishes] = useState([]);

  const addDishHandler = (newDish) => {
    setDishes([...dishes, newDish]);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="dashboard-content">
        <Navbar />
        
        <div className="dashboard-main">
          {/* Header */}
          <div className="dashboard-header">
            <h1 className="dashboard-title">Restaurant Dashboard</h1>
            <p className="dashboard-subtitle">Manage your restaurant efficiently</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon orders">📦</div>
              <div className="stat-content">
                <h3 className="stat-number">24</h3>
                <p className="stat-label">Total Orders</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon menu">🍽️</div>
              <div className="stat-content">
                <h3 className="stat-number">{dishes.length}</h3>
                <p className="stat-label">Menu Items</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon revenue">💰</div>
              <div className="stat-content">
                <h3 className="stat-number">Rs. 12,450</h3>
                <p className="stat-label">Today's Revenue</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon pending">⏱️</div>
              <div className="stat-content">
                <h3 className="stat-number">8</h3>
                <p className="stat-label">Pending Orders</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h2 className="section-title">Quick Actions</h2>
            <div className="action-cards">
              <Link to="/restaurant/orders" className="action-card">
                <div className="action-icon">📋</div>
                <h3>View Orders</h3>
                <p>Manage and track all customer orders</p>
                <span className="action-arrow">→</span>
              </Link>
              
              <Link to="/restaurant/menu-list" className="action-card">
                <div className="action-icon">🍕</div>
                <h3>Menu List</h3>
                <p>View and update your menu items</p>
                <span className="action-arrow">→</span>
              </Link>
              
              <Link to="/restaurant/add-dish" className="action-card">
                <div className="action-icon">➕</div>
                <h3>Add New Dish</h3>
                <p>Add new dishes to your menu</p>
                <span className="action-arrow">→</span>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="recent-activity">
            <h2 className="section-title">Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon success">✓</div>
                <div className="activity-content">
                  <p>Order #102 completed successfully</p>
                  <span className="activity-time">10 minutes ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon warning">⚠</div>
                <div className="activity-content">
                  <p>Low stock alert for Chicken Biryani</p>
                  <span className="activity-time">25 minutes ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon info">🛒</div>
                <div className="activity-content">
                  <p>New order received from Ali Khan</p>
                  <span className="activity-time">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
        }

        .dashboard-content {
          margin-left: 240px;
          width: calc(100% - 240px);
          min-height: 100vh;
          transition: all 0.3s ease;
        }

        .dashboard-main {
          padding: 80px 30px 30px 30px;
          min-height: calc(100vh - 60px);
          margin-top: 60px;
        }

        .dashboard-header {
          margin-bottom: 40px;
        }

        .dashboard-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .dashboard-subtitle {
          color: #718096;
          font-size: 1.1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .stat-icon.orders {
          background: #e0f2fe;
          color: #0369a1;
        }

        .stat-icon.menu {
          background: #f0fdf4;
          color: #166534;
        }

        .stat-icon.revenue {
          background: #fef3c7;
          color: #92400e;
        }

        .stat-icon.pending {
          background: #fef3c7;
          color: #d97706;
        }

        .stat-content {
          flex: 1;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 4px;
          line-height: 1;
        }

        .stat-label {
          color: #718096;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .quick-actions {
          margin-bottom: 40px;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 20px;
        }

        .action-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .action-card {
          background: white;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
          position: relative;
          overflow: hidden;
        }

        .action-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          border-color: #667eea;
        }

        .action-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }

        .action-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .action-card p {
          color: #718096;
          margin-bottom: 16px;
          line-height: 1.5;
        }

        .action-arrow {
          color: #667eea;
          font-size: 1.2rem;
          font-weight: bold;
          transition: transform 0.3s ease;
        }

        .action-card:hover .action-arrow {
          transform: translateX(4px);
        }

        .recent-activity {
          background: white;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px;
          border-radius: 12px;
          transition: background-color 0.3s ease;
        }

        .activity-item:hover {
          background: #f8fafc;
        }

        .activity-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: bold;
          flex-shrink: 0;
        }

        .activity-icon.success {
          background: #d1fae5;
          color: #065f46;
        }

        .activity-icon.warning {
          background: #fef3c7;
          color: #92400e;
        }

        .activity-icon.info {
          background: #dbeafe;
          color: #1e40af;
        }

        .activity-content {
          flex: 1;
        }

        .activity-content p {
          color: #1a202c;
          margin-bottom: 4px;
          font-weight: 500;
        }

        .activity-time {
          color: #718096;
          font-size: 0.875rem;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .dashboard-content {
            margin-left: 0;
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .dashboard-main {
            padding: 80px 20px 20px 20px;
          }

          .dashboard-title {
            font-size: 2rem;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .action-cards {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .dashboard-main {
            padding: 80px 16px 16px 16px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-card {
            padding: 20px;
          }

          .dashboard-title {
            font-size: 1.75rem;
          }

          .action-card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}