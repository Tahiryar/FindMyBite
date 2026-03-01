import React, { useState, useEffect } from "react";

export default function BlockedRestaurants() {
  const [blockedRestaurants, setBlockedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReason, setSelectedReason] = useState("all");

  const dummyData = [
    {
      id: 1,
      name: "Burger Hub",
      owner: "Ali Raza",
      email: "ali@burgerhub.com",
      phone: "03001234567",
      blockedDate: "2025-12-01",
      reason: "Policy Violation",
      location: "DHA Phase 5, Lahore",
      category: "Fast Food",
      daysBlocked: 5,
      status: "blocked"
    },
    {
      id: 2,
      name: "Sweet Treats",
      owner: "Sara Khan",
      email: "sara@sweettreats.com",
      phone: "03007654321",
      blockedDate: "2025-11-30",
      reason: "Multiple Complaints",
      location: "Gulshan, Karachi",
      category: "Desserts",
      daysBlocked: 6,
      status: "blocked"
    },
    {
      id: 3,
      name: "Spicy Corner",
      owner: "Ahmed Malik",
      email: "ahmed@spicycorner.com",
      phone: "03111223344",
      blockedDate: "2025-11-28",
      reason: "Legal Issues",
      location: "Blue Area, Islamabad",
      category: "Desi",
      daysBlocked: 8,
      status: "blocked"
    },
    {
      id: 4,
      name: "Pizza Palace",
      owner: "Fatima Noor",
      email: "fatima@pizzapalace.com",
      phone: "03214455667",
      blockedDate: "2025-11-25",
      reason: "Payment Issues",
      location: "Bahria Town, Rawalpindi",
      category: "Italian",
      daysBlocked: 11,
      status: "blocked"
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setBlockedRestaurants(dummyData);
      setLoading(false);
    }, 800);
  }, []);

  const handleUnblock = (id) => {
    if (window.confirm("Are you sure you want to unblock this restaurant?")) {
      setBlockedRestaurants(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleBulkUnblock = () => {
    if (window.confirm("Unblock all selected restaurants?")) {
      setBlockedRestaurants([]);
    }
  };

  const filteredRestaurants = blockedRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesReason = selectedReason === "all" || restaurant.reason === selectedReason;
    return matchesSearch && matchesReason;
  });

  const getReasonColor = (reason) => {
    const colors = {
      "Policy Violation": "#ef4444",
      "Multiple Complaints": "#f59e0b",
      "Legal Issues": "#8b5cf6",
      "Payment Issues": "#64748b"
    };
    return colors[reason] || "#6b7280";
  };

  const getDaysColor = (days) => {
    if (days >= 10) return "#ef4444";
    if (days >= 5) return "#f59e0b";
    return "#10b981";
  };

  return (
    <div className="blocked-restaurants-container">
      {/* Header */}
      <div className="blocked-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">🚫</span>
            Blocked Restaurants
          </h1>
          <p className="page-subtitle">Manage temporarily or permanently blocked restaurants</p>
        </div>
        
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">{blockedRestaurants.length}</span>
            <span className="stat-label">Blocked</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {blockedRestaurants.filter(r => r.daysBlocked >= 7).length}
            </span>
            <span className="stat-label">Week+</span>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="actions-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filters">
          <select 
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="reason-filter"
          >
            <option value="all">All Reasons</option>
            <option value="Policy Violation">Policy Violation</option>
            <option value="Multiple Complaints">Multiple Complaints</option>
            <option value="Legal Issues">Legal Issues</option>
            <option value="Payment Issues">Payment Issues</option>
          </select>
          
          <button 
            className="bulk-unblock-btn"
            onClick={handleBulkUnblock}
            disabled={blockedRestaurants.length === 0}
          >
            Unblock All
          </button>
        </div>
      </div>

      {/* Blocked Restaurants Grid */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading blocked restaurants...</p>
        </div>
      ) : (
        <div className="blocked-grid">
          {filteredRestaurants.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✅</div>
              <h3>No Blocked Restaurants</h3>
              <p>All restaurants are currently active. New blocks will appear here.</p>
            </div>
          ) : (
            filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="blocked-card">
                {/* Card Header */}
                <div className="card-header">
                  <div className="restaurant-avatar">
                    {restaurant.name.charAt(0)}
                  </div>
                  <div className="header-info">
                    <h3 className="restaurant-name">{restaurant.name}</h3>
                    <div className="restaurant-category">{restaurant.category}</div>
                  </div>
                  <div 
                    className="blocked-badge"
                    style={{ backgroundColor: getReasonColor(restaurant.reason) }}
                  >
                    Blocked
                  </div>
                </div>

                {/* Reason Section */}
                <div className="reason-section">
                  <div className="reason-label">Reason:</div>
                  <div 
                    className="reason-text"
                    style={{ color: getReasonColor(restaurant.reason) }}
                  >
                    {restaurant.reason}
                  </div>
                </div>

                {/* Owner Info */}
                <div className="owner-section">
                  <div className="info-row">
                    <span className="info-icon">👤</span>
                    <span className="info-label">Owner:</span>
                    <span className="info-value">{restaurant.owner}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-icon">📍</span>
                    <span className="info-label">Location:</span>
                    <span className="info-value">{restaurant.location}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-icon">📧</span>
                    <span className="info-label">Email:</span>
                    <span className="info-value">{restaurant.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-icon">📞</span>
                    <span className="info-label">Phone:</span>
                    <span className="info-value">{restaurant.phone}</span>
                  </div>
                </div>

                {/* Block Info */}
                <div className="block-info">
                  <div className="block-meta">
                    <div className="meta-item">
                      <span className="meta-label">Blocked On:</span>
                      <span className="meta-value">{restaurant.blockedDate}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Days Blocked:</span>
                      <span 
                        className="meta-value"
                        style={{ color: getDaysColor(restaurant.daysBlocked) }}
                      >
                        {restaurant.daysBlocked} days
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="card-actions">
                  <button 
                    className="action-btn view-details"
                  >
                    View Details
                  </button>
                  <button 
                    className="action-btn unblock-btn"
                    onClick={() => handleUnblock(restaurant.id)}
                  >
                    <span className="btn-icon">↻</span>
                    Unblock Restaurant
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <style jsx>{`
        .blocked-restaurants-container {
          padding: 30px;
          background: #f8fafc;
          min-height: 100vh;
        }

        .blocked-header {
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

        .page-subtitle {
          color: #718096;
          font-size: 1.1rem;
        }

        .header-stats {
          display: flex;
          gap: 16px;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          text-align: center;
          min-width: 100px;
          border-left: 4px solid #ef4444;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #ef4444;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #718096;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .actions-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }

        .search-box {
          position: relative;
          width: 300px;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #718096;
          font-size: 0.9rem;
        }

        .search-input {
          width: 100%;
          padding: 10px 10px 10px 36px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .filters {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .reason-filter {
          padding: 10px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .reason-filter:focus {
          outline: none;
          border-color: #667eea;
        }

        .bulk-unblock-btn {
          padding: 10px 20px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .bulk-unblock-btn:hover:not(:disabled) {
          background: #059669;
          transform: translateY(-1px);
        }

        .bulk-unblock-btn:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
          transform: none;
        }

        .loading-state {
          text-align: center;
          padding: 80px 20px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e2e8f0;
          border-top: 3px solid #ef4444;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .blocked-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 24px;
        }

        .blocked-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #fee2e2;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .blocked-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .blocked-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(135deg, #ef4444, #f87171);
        }

        .card-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
        }

        .restaurant-avatar {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ef4444, #f87171);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .header-info {
          flex: 1;
        }

        .restaurant-name {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 4px;
        }

        .restaurant-category {
          font-size: 0.875rem;
          color: #64748b;
          background: #f1f5f9;
          padding: 4px 8px;
          border-radius: 6px;
          display: inline-block;
        }

        .blocked-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .reason-section {
          background: #fef2f2;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .reason-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
        }

        .reason-text {
          font-size: 0.875rem;
          font-weight: 600;
        }

        .owner-section {
          margin-bottom: 20px;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          font-size: 0.875rem;
        }

        .info-icon {
          font-size: 0.8rem;
          opacity: 0.7;
          width: 16px;
          text-align: center;
        }

        .info-label {
          color: #6b7280;
          font-weight: 500;
          min-width: 60px;
        }

        .info-value {
          color: #1f2937;
          font-weight: 500;
          flex: 1;
        }

        .block-info {
          background: #f9fafb;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 20px;
        }

        .block-meta {
          display: flex;
          justify-content: space-between;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .meta-label {
          font-size: 0.75rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .meta-value {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1f2937;
        }

        .card-actions {
          display: flex;
          gap: 12px;
        }

        .action-btn {
          flex: 1;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .view-details {
          background: #f3f4f6;
          color: #4b5563;
        }

        .view-details:hover {
          background: #e5e7eb;
        }

        .unblock-btn {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }

        .unblock-btn:hover {
          background: linear-gradient(135deg, #059669, #047857);
          transform: translateY(-1px);
        }

        .btn-icon {
          font-size: 0.9rem;
        }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          grid-column: 1 / -1;
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
          .blocked-restaurants-container {
            padding: 20px;
          }

          .blocked-grid {
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .blocked-header {
            flex-direction: column;
            gap: 20px;
          }

          .actions-bar {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }

          .search-box {
            width: 100%;
          }

          .filters {
            flex-direction: column;
            align-items: stretch;
          }

          .blocked-grid {
            grid-template-columns: 1fr;
          }

          .card-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .blocked-restaurants-container {
            padding: 16px;
          }

          .page-title {
            font-size: 1.75rem;
          }

          .blocked-card {
            padding: 20px;
          }

          .block-meta {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}