import React, { useState } from "react";
import Sidebar from "../components/Sidebar/restuarentSidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Order Received",
      message: "Order #102 placed by Ali — 2x Chicken Biryani, 1x Coke",
      time: "5 mins ago",
      type: "order",
      read: false,
      priority: "high"
    },
    {
      id: 2,
      title: "Order Preparation",
      message: "Order #98 is being prepared. Estimated time: 15 minutes",
      time: "15 mins ago",
      type: "preparation",
      read: false,
      priority: "medium"
    },
    {
      id: 3,
      title: "Order Delivered Successfully",
      message: "Order #87 has been successfully delivered to customer",
      time: "1 hour ago",
      type: "delivery",
      read: true,
      priority: "low"
    },
    {
      id: 4,
      title: "Low Stock Alert",
      message: "Chicken Tikka is running low. Current stock: 5 portions",
      time: "2 hours ago",
      type: "stock",
      read: false,
      priority: "high"
    },
    {
      id: 5,
      title: "Payment Received",
      message: "Payment of Rs. 1,250 received for Order #101",
      time: "3 hours ago",
      type: "payment",
      read: true,
      priority: "low"
    },
    {
      id: 6,
      title: "New Review",
      message: "Customer rated your restaurant 5 stars!",
      time: "5 hours ago",
      type: "review",
      read: true,
      priority: "medium"
    }
  ]);

  const [filter, setFilter] = useState("all");

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type) => {
    const icons = {
      order: "🛒",
      preparation: "👨‍🍳",
      delivery: "🚚",
      stock: "📦",
      payment: "💳",
      review: "⭐"
    };
    return icons[type] || "🔔";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "#ef4444",
      medium: "#f59e0b",
      low: "#10b981"
    };
    return colors[priority] || "#6b7280";
  };

  const filteredNotifications = filter === "all" 
    ? notifications 
    : filter === "unread" 
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-container">
      <Sidebar />
      
      <div className="notifications-content">
        <Navbar />
        
        <div className="notifications-main">
          {/* Header */}
          <div className="notifications-header">
            <div className="header-content">
              <h1 className="page-title">
                <span className="title-icon">🔔</span>
                Notifications
                {unreadCount > 0 && (
                  <span className="unread-badge">{unreadCount}</span>
                )}
              </h1>
              <p className="page-subtitle">Stay updated with restaurant activities</p>
            </div>
            
            <div className="header-actions">
              <button 
                className="action-btn mark-all-read"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                Mark all as read
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="filters-section">
            <div className="filter-tabs">
              <button 
                className={`filter-tab ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button 
                className={`filter-tab ${filter === "unread" ? "active" : ""}`}
                onClick={() => setFilter("unread")}
              >
                Unread
              </button>
              <button 
                className={`filter-tab ${filter === "order" ? "active" : ""}`}
                onClick={() => setFilter("order")}
              >
                Orders
              </button>
              <button 
                className={`filter-tab ${filter === "stock" ? "active" : ""}`}
                onClick={() => setFilter("stock")}
              >
                Stock
              </button>
            </div>
            
            <div className="stats">
              <span className="stat-text">
                {filteredNotifications.length} notifications
              </span>
            </div>
          </div>

          {/* Notifications List */}
          <div className="notifications-list">
            {filteredNotifications.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h3>No notifications</h3>
                <p>
                  {filter === "all" 
                    ? "You're all caught up!" 
                    : `No ${filter} notifications found`
                  }
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`notification-card ${notification.read ? "read" : "unread"}`}
                >
                  <div className="notification-indicator">
                    {!notification.read && <div className="unread-dot"></div>}
                  </div>
                  
                  <div className="notification-icon">
                    <span 
                      className="icon"
                      style={{ 
                        backgroundColor: `${getPriorityColor(notification.priority)}20`,
                        color: getPriorityColor(notification.priority)
                      }}
                    >
                      {getNotificationIcon(notification.type)}
                    </span>
                  </div>

                  <div className="notification-content">
                    <div className="notification-header">
                      <h3 className="notification-title">{notification.title}</h3>
                      <div className="notification-actions">
                        {!notification.read && (
                          <button 
                            className="action-btn read-btn"
                            onClick={() => markAsRead(notification.id)}
                            title="Mark as read"
                          >
                            ✓
                          </button>
                        )}
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => deleteNotification(notification.id)}
                          title="Delete notification"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    
                    <p className="notification-message">{notification.message}</p>
                    
                    <div className="notification-footer">
                      <span className="notification-time">{notification.time}</span>
                      <span 
                        className="priority-badge"
                        style={{ 
                          backgroundColor: `${getPriorityColor(notification.priority)}20`,
                          color: getPriorityColor(notification.priority)
                        }}
                      >
                        {notification.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .notifications-container {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
        }

        .notifications-content {
          margin-left: 240px;
          width: calc(100% - 240px);
          min-height: 100vh;
          transition: all 0.3s ease;
        }

        .notifications-main {
          padding: 80px 30px 30px 30px;
          min-height: calc(100vh - 60px);
          margin-top: 60px;
        }

        .notifications-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .header-content {
          flex: 1;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .title-icon {
          font-size: 1.8rem;
        }

        .unread-badge {
          background: #ef4444;
          color: white;
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-left: 8px;
        }

        .page-subtitle {
          color: #718096;
          font-size: 1.1rem;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .action-btn {
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mark-all-read {
          background: #667eea;
          color: white;
        }

        .mark-all-read:hover:not(:disabled) {
          background: #5a67d8;
          transform: translateY(-1px);
        }

        .mark-all-read:disabled {
          background: #cbd5e0;
          cursor: not-allowed;
          transform: none;
        }

        .filters-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }

        .filter-tabs {
          display: flex;
          gap: 8px;
        }

        .filter-tab {
          padding: 8px 16px;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #718096;
        }

        .filter-tab:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .filter-tab.active {
          background: #667eea;
          border-color: #667eea;
          color: white;
        }

        .stats {
          font-size: 0.875rem;
          color: #718096;
          font-weight: 500;
        }

        .notifications-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .notification-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          display: flex;
          gap: 16px;
          align-items: flex-start;
          transition: all 0.3s ease;
          border-left: 4px solid transparent;
        }

        .notification-card.unread {
          border-left-color: #667eea;
          background: #f8fafc;
        }

        .notification-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
        }

        .notification-card.read {
          opacity: 0.8;
        }

        .notification-indicator {
          width: 20px;
          display: flex;
          justify-content: center;
          padding-top: 4px;
        }

        .unread-dot {
          width: 8px;
          height: 8px;
          background: #667eea;
          border-radius: 50%;
        }

        .notification-icon {
          flex-shrink: 0;
        }

        .notification-icon .icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .notification-content {
          flex: 1;
          min-width: 0;
        }

        .notification-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .notification-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a202c;
          margin: 0;
        }

        .notification-actions {
          display: flex;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .notification-card:hover .notification-actions {
          opacity: 1;
        }

        .read-btn, .delete-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .read-btn {
          background: #10b98120;
          color: #10b981;
        }

        .read-btn:hover {
          background: #10b981;
          color: white;
        }

        .delete-btn {
          background: #ef444420;
          color: #ef4444;
        }

        .delete-btn:hover {
          background: #ef4444;
          color: white;
        }

        .notification-message {
          color: #4b5563;
          margin: 0 0 12px 0;
          line-height: 1.5;
        }

        .notification-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .notification-time {
          font-size: 0.875rem;
          color: #9ca3af;
        }

        .priority-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 20px;
          opacity: 0.7;
        }

        .empty-state h3 {
          color: #374151;
          margin-bottom: 8px;
          font-size: 1.5rem;
        }

        .empty-state p {
          color: #6b7280;
          font-size: 1rem;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .notifications-content {
            margin-left: 0;
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .notifications-main {
            padding: 80px 20px 20px 20px;
          }

          .notifications-header {
            flex-direction: column;
            gap: 16px;
          }

          .filters-section {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }

          .filter-tabs {
            flex-wrap: wrap;
            justify-content: center;
          }

          .notification-card {
            padding: 16px;
          }

          .notification-actions {
            opacity: 1;
          }
        }

        @media (max-width: 480px) {
          .notifications-main {
            padding: 80px 16px 16px 16px;
          }

          .page-title {
            font-size: 1.75rem;
          }

          .notification-header {
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
          }

          .notification-actions {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  );
}