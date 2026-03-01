import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/Navbar"; 
import AdminDashboardCards from "../components/AdminDashboardCards";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const stats = [
    { 
      label: "Total Restaurants", 
      value: "48", 
      icon: "🏪", 
      color: "#4dabf7", 
      change: "+8",
      link: "/admin/restaurants"
    },
    { 
      label: "Pending Requests", 
      value: "12", 
      icon: "📨", 
      color: "#ff6b6b", 
      change: "+3",
      link: "/admin/restaurant-requests"
    },
    { 
      label: "Blocked Restaurants", 
      value: "5", 
      icon: "🚫", 
      color: "#ffa94d", 
      change: "-2",
      link: "/admin/blocked-restaurants"
    },
    { 
      label: "Total Earnings", 
      value: "$2,840", 
      icon: "💰", 
      color: "#51cf66", 
      change: "+12%",
      link: "/admin/payments"
    },
    { 
      label: "Active Users", 
      value: "1,248", 
      icon: "👥", 
      color: "#845ef7", 
      change: "+5%",
      link: "/admin/users"
    },
    { 
      label: "Cities Covered", 
      value: "15", 
      icon: "📍", 
      color: "#ff8787", 
      change: "+2",
      link: "/admin/locations"
    },
  ];

  const recentActivities = [
    { user: "Ali Khan", action: "added new restaurant", time: "5 min ago", icon: "➕" },
    { user: "Sara Ahmed", action: "updated payment", time: "15 min ago", icon: "💳" },
    { user: "Restaurant X", action: "requested verification", time: "1 hour ago", icon: "✅" },
    { user: "Admin", action: "blocked Restaurant Y", time: "2 hours ago", icon: "🚫" },
    { user: "System", action: "payment received", time: "3 hours ago", icon: "💰" },
  ];

  return (
    <div className="admin-wrapper">

      {/* TOP NAVBAR */}
      <AdminNavbar />

      <div className="admin-container">
        {/* LEFT SIDEBAR */}
        <AdminSidebar />

        {/* MAIN CONTENT */}
        <div className="admin-content">
          {/* Header */}
          <div className="admin-header">
            <div>
              <h1 className="page-title">Admin Dashboard</h1>
              <p className="page-subtitle">Welcome back, Administrator! Here's what's happening today.</p>
            </div>
            <div className="header-actions">
              <button className="action-btn primary">
                <span className="btn-icon">📊</span>
                Generate Report
              </button>
              <Link to="/admin/restaurants" className="action-btn view-all-restaurants">
                <span className="btn-icon">🏪</span>
                View All Restaurants
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <Link 
                key={index} 
                to={stat.link} 
                className="stat-card-link"
                style={{ textDecoration: 'none' }}
              >
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                  <div className="stat-change">
                    <span className={`change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                      {stat.change}
                    </span>
                    <span className="change-label">this month</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Dashboard Cards */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Overview</h2>
              <div className="section-divider"></div>
            </div>
            <AdminDashboardCards />
          </section>

          {/* Recent Activities & Charts */}
          <div className="dashboard-row">
            {/* Recent Activities */}
            <div className="recent-activities">
              <div className="section-header">
                <h3 className="section-title">Recent Activities</h3>
                <Link to="/admin/activities" className="view-all">
                  View All →
                </Link>
              </div>
              <div className="activities-list">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">{activity.icon}</div>
                    <div className="activity-content">
                      <p>
                        <span className="activity-user">{activity.user}</span> {activity.action}
                      </p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Chart */}
            <div className="performance-chart">
              <div className="section-header">
                <h3 className="section-title">Performance</h3>
                <select className="time-select">
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="chart-placeholder">
                <div className="chart-info">
                  <div className="chart-value">+24.5%</div>
                  <div className="chart-label">Growth this month</div>
                </div>
                <div className="chart-bars">
                  {[40, 60, 80, 65, 90, 75, 85].map((height, index) => (
                    <div 
                      key={index} 
                      className="chart-bar" 
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Admin Dashboard Styles */
        .admin-wrapper {
          min-height: 100vh;
          background: #f8fafc;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .admin-container {
          display: flex;
          min-height: calc(100vh - 70px);
          margin-top: 70px;
        }

        .admin-content {
          flex: 1;
          padding: 30px;
          margin-left: 280px;
          transition: margin-left 0.3s ease;
          overflow-y: auto;
          max-width: calc(100% - 280px);
        }

        /* Header */
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
          padding-bottom: 25px;
          border-bottom: 1px solid #e9ecef;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1a1a1a;
          margin: 0 0 10px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-subtitle {
          color: #666;
          font-size: 1.1rem;
          margin: 0;
          max-width: 600px;
          line-height: 1.6;
        }

        .header-actions {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .action-btn {
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          border: none;
          text-decoration: none;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
        }

        .action-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .action-btn.view-all-restaurants {
          background: linear-gradient(135deg, #51cf66 0%, #2ecc71 100%);
          color: white;
          box-shadow: 0 5px 20px rgba(81, 207, 102, 0.3);
        }

        .action-btn.view-all-restaurants:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(81, 207, 102, 0.4);
        }

        .action-btn.secondary {
          background: white;
          color: #495057;
          border: 1px solid #dee2e6;
          position: relative;
        }

        .action-btn.secondary:hover {
          background: #f8f9fa;
          border-color: #adb5bd;
          transform: translateY(-2px);
        }

        .btn-icon {
          font-size: 1.1rem;
        }

        .notification-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ff6b6b;
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        /* Quick Stats */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card-link {
          display: block;
          transition: transform 0.3s ease;
        }

        .stat-card-link:hover {
          transform: translateY(-5px);
        }

        .stat-card {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          border: 1px solid #e9ecef;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .stat-card::after {
          content: '';
          position: absolute;
          top: 0;
          right: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: right 0.6s ease;
        }

        .stat-card-link:hover .stat-card::after {
          right: 100%;
        }

        .stat-card:hover {
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: #2d3436;
          line-height: 1;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #666;
          font-weight: 500;
        }

        .stat-change {
          text-align: right;
        }

        .change {
          display: block;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 2px;
        }

        .change.positive {
          color: #51cf66;
        }

        .change.negative {
          color: #ff6b6b;
        }

        .change-label {
          font-size: 0.75rem;
          color: #999;
          display: block;
        }

        /* Sections */
        .dashboard-section {
          margin-bottom: 50px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .section-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2d3436;
          margin: 0;
        }

        .section-divider {
          height: 4px;
          width: 60px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 2px;
        }

        /* Dashboard Row */
        .dashboard-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-top: 40px;
        }

        /* Recent Activities */
        .recent-activities,
        .performance-chart {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid #e9ecef;
        }

        .view-all {
          background: none;
          border: none;
          color: #667eea;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .view-all:hover {
          color: #764ba2;
          transform: translateX(5px);
        }

        .activities-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 15px;
          border-radius: 12px;
          transition: background 0.3s ease;
        }

        .activity-item:hover {
          background: #f8f9fa;
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          background: #f1f3f5;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .activity-content {
          flex: 1;
        }

        .activity-user {
          font-weight: 700;
          color: #2d3436;
        }

        .activity-content p {
          margin: 0 0 5px 0;
          color: #495057;
          font-size: 0.95rem;
        }

        .activity-time {
          font-size: 0.8rem;
          color: #999;
        }

        /* Performance Chart */
        .time-select {
          padding: 8px 16px;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          background: white;
          font-size: 0.9rem;
          color: #495057;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .time-select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .chart-placeholder {
          height: 250px;
          display: flex;
          align-items: flex-end;
          gap: 15px;
          padding-top: 30px;
        }

        .chart-info {
          text-align: center;
          padding-right: 20px;
          border-right: 1px solid #e9ecef;
        }

        .chart-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: #51cf66;
          margin-bottom: 5px;
        }

        .chart-label {
          font-size: 0.9rem;
          color: #666;
        }

        .chart-bars {
          flex: 1;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 100%;
        }

        .chart-bar {
          flex: 1;
          background: linear-gradient(to top, #667eea, #764ba2);
          border-radius: 6px 6px 0 0;
          margin: 0 2px;
          min-height: 10px;
          transition: height 0.5s ease;
          animation: barGrow 1s ease-out forwards;
          animation-delay: calc(var(--index) * 0.1s);
        }

        @keyframes barGrow {
          from { height: 0%; }
          to { height: var(--height); }
        }

        /* Quick Actions Bar */
        .quick-actions {
          display: flex;
          gap: 15px;
          margin: 20px 0 40px;
          flex-wrap: wrap;
        }

        .quick-action-btn {
          background: white;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          padding: 15px 25px;
          font-weight: 600;
          color: #495057;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
        }

        .quick-action-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-color: #667eea;
          color: #667eea;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .admin-content {
            margin-left: 250px;
            max-width: calc(100% - 250px);
          }

          .dashboard-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 992px) {
          .admin-content {
            margin-left: 0;
            max-width: 100%;
            padding: 20px;
          }

          .admin-header {
            flex-direction: column;
            gap: 20px;
          }

          .header-actions {
            width: 100%;
            justify-content: flex-start;
          }

          .quick-actions {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .page-title {
            font-size: 2rem;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .header-actions {
            flex-direction: column;
            gap: 10px;
          }

          .action-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 576px) {
          .admin-content {
            padding: 15px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .admin-header {
            margin-bottom: 30px;
          }

          .page-title {
            font-size: 1.8rem;
          }

          .recent-activities,
          .performance-chart {
            padding: 20px;
          }

          .dashboard-row {
            gap: 20px;
          }

          .quick-actions {
            flex-direction: column;
          }

          .quick-action-btn {
            width: 100%;
            justify-content: center;
          }
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
          .admin-wrapper {
            background: #121212;
          }

          .admin-content {
            background: #121212;
          }

          .page-title,
          .section-title,
          .stat-value,
          .activity-user {
            color: #ffffff;
          }

          .page-subtitle,
          .stat-label,
          .activity-content p {
            color: #b0b0b0;
          }

          .stat-card,
          .recent-activities,
          .performance-chart,
          .quick-action-btn {
            background: #1e1e1e;
            border-color: #333;
          }

          .activity-item:hover {
            background: #2d2d2d;
          }

          .activity-icon {
            background: #2d2d2d;
          }

          .time-select {
            background: #2d2d2d;
            border-color: #444;
            color: #ffffff;
          }

          .action-btn.secondary,
          .quick-action-btn {
            background: #2d2d2d;
            border-color: #444;
            color: #ffffff;
          }

          .action-btn.secondary:hover,
          .quick-action-btn:hover {
            background: #333;
            border-color: #667eea;
          }

          .chart-bar {
            background: linear-gradient(to top, #4dabf7, #845ef7);
          }
        }

        /* Print Styles */
        @media print {
          .admin-sidebar,
          .header-actions,
          .view-btn,
          .view-all,
          .time-select,
          .quick-actions {
            display: none;
          }

          .admin-content {
            margin-left: 0;
            max-width: 100%;
          }

          .admin-wrapper {
            background: white;
          }

          .stat-card,
          .recent-activities,
          .performance-chart {
            box-shadow: none;
            border: 1px solid #ddd;
            break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}