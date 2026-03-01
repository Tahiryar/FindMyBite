import React, { useEffect, useState } from "react";

export default function RestaurentRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const dummyRequests = [
    {
      id: 1,
      restaurantName: "Tasty Treats",
      ownerName: "Ali Khan",
      email: "ali@example.com",
      phone: "03001234567",
      status: "pending",
      date: "2025-12-02",
      location: "DHA Phase 5, Lahore",
      category: "Fast Food",
      requestType: "New Registration",
      submittedAt: "2 days ago"
    },
    {
      id: 2,
      restaurantName: "Pizza Planet",
      ownerName: "Sara Ahmed",
      email: "sara@example.com",
      phone: "03007654321",
      status: "pending",
      date: "2025-12-02",
      location: "Gulshan, Karachi",
      category: "Italian",
      requestType: "New Registration",
      submittedAt: "1 day ago"
    },
    {
      id: 3,
      restaurantName: "Spice & Rice",
      ownerName: "Ahmed Raza",
      email: "ahmed@example.com",
      phone: "03111234567",
      status: "accepted",
      date: "2025-12-01",
      location: "Blue Area, Islamabad",
      category: "Desi",
      requestType: "Menu Update",
      submittedAt: "3 days ago"
    },
    {
      id: 4,
      restaurantName: "Burger Hub",
      ownerName: "Fatima Noor",
      email: "fatima@example.com",
      phone: "03219876543",
      status: "rejected",
      date: "2025-11-30",
      location: "Bahria Town, Rawalpindi",
      category: "Fast Food",
      requestType: "New Registration",
      submittedAt: "5 days ago"
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRequests(dummyRequests);
      setLoading(false);
    }, 800);
  }, []);

  const handleAccept = (id) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: "accepted" } : req
      )
    );
  };

  const handleReject = (id) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );
  };

  const filteredRequests = filter === "all" 
    ? requests 
    : requests.filter(req => req.status === filter);

  const pendingCount = requests.filter(r => r.status === "pending").length;
  const acceptedCount = requests.filter(r => r.status === "accepted").length;
  const rejectedCount = requests.filter(r => r.status === "rejected").length;

  const getStatusBadge = (status) => {
    const config = {
      pending: { color: "#f59e0b", bg: "#fef3c7", label: "Pending" },
      accepted: { color: "#10b981", bg: "#d1fae5", label: "Accepted" },
      rejected: { color: "#ef4444", bg: "#fee2e2", label: "Rejected" }
    };
    const style = config[status] || config.pending;
    return (
      <span className="status-badge" style={{ backgroundColor: style.bg, color: style.color }}>
        {style.label}
      </span>
    );
  };

  return (
    <div className="restaurant-requests-container">
      {/* Header */}
      <div className="requests-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">📋</span>
            Restaurant Requests
          </h1>
          <p className="page-subtitle">Manage restaurant registration and update requests</p>
        </div>
      </div>

      {/* Stats */}
      <div className="requests-stats">
        <div className="stat-card" onClick={() => setFilter("all")}>
          <span className="stat-number">{requests.length}</span>
          <span className="stat-label">Total Requests</span>
        </div>
        <div className="stat-card pending" onClick={() => setFilter("pending")}>
          <span className="stat-number">{pendingCount}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card accepted" onClick={() => setFilter("accepted")}>
          <span className="stat-number">{acceptedCount}</span>
          <span className="stat-label">Accepted</span>
        </div>
        <div className="stat-card rejected" onClick={() => setFilter("rejected")}>
          <span className="stat-number">{rejectedCount}</span>
          <span className="stat-label">Rejected</span>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Requests
          </button>
          <button 
            className={`filter-tab ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button 
            className={`filter-tab ${filter === "accepted" ? "active" : ""}`}
            onClick={() => setFilter("accepted")}
          >
            Accepted
          </button>
          <button 
            className={`filter-tab ${filter === "rejected" ? "active" : ""}`}
            onClick={() => setFilter("rejected")}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* Requests Table */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading requests...</p>
        </div>
      ) : (
        <div className="requests-table-container">
          {filteredRequests.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No requests found</h3>
              <p>There are no requests matching your current filter.</p>
            </div>
          ) : (
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Restaurant</th>
                  <th>Owner Details</th>
                  <th>Request Info</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="request-row">
                    <td className="restaurant-info">
                      <div className="restaurant-avatar">
                        {req.restaurantName.charAt(0)}
                      </div>
                      <div className="restaurant-details">
                        <h4 className="restaurant-name">{req.restaurantName}</h4>
                        <p className="restaurant-category">{req.category}</p>
                        <p className="restaurant-location">
                          <span className="location-icon">📍</span>
                          {req.location}
                        </p>
                      </div>
                    </td>
                    <td className="owner-info">
                      <p className="owner-name">
                        <span className="info-icon">👤</span>
                        {req.ownerName}
                      </p>
                      <p className="owner-contact">
                        <span className="info-icon">📧</span>
                        {req.email}
                      </p>
                      <p className="owner-contact">
                        <span className="info-icon">📞</span>
                        {req.phone}
                      </p>
                    </td>
                    <td className="request-info">
                      <div className="request-type">{req.requestType}</div>
                      <div className="request-date">
                        <span className="date-icon">📅</span>
                        {req.date}
                      </div>
                      <div className="request-time">{req.submittedAt}</div>
                    </td>
                    <td className="status-cell">
                      {getStatusBadge(req.status)}
                    </td>
                    <td className="actions-cell">
                      {req.status === "pending" ? (
                        <div className="action-buttons">
                          <button 
                            className="action-btn accept-btn"
                            onClick={() => handleAccept(req.id)}
                          >
                            <span className="btn-icon">✓</span>
                            Accept
                          </button>
                          <button 
                            className="action-btn reject-btn"
                            onClick={() => handleReject(req.id)}
                          >
                            <span className="btn-icon">✕</span>
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button className="view-details-btn">View Details</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <style jsx>{`
        .restaurant-requests-container {
          padding: 30px;
          background: #f8fafc;
          min-height: 100vh;
        }

        .requests-header {
          margin-bottom: 32px;
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

        .requests-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
        }

        .stat-card.pending {
          border-color: #f59e0b20;
        }

        .stat-card.accepted {
          border-color: #10b98120;
        }

        .stat-card.rejected {
          border-color: #ef444420;
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 8px;
        }

        .stat-card.pending .stat-number {
          color: #f59e0b;
        }

        .stat-card.accepted .stat-number {
          color: #10b981;
        }

        .stat-card.rejected .stat-number {
          color: #ef4444;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #718096;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filters-section {
          margin-bottom: 24px;
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }

        .filter-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-tab {
          padding: 10px 20px;
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

        .loading-state {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e2e8f0;
          border-top: 3px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .requests-table-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .requests-table {
          width: 100%;
          border-collapse: collapse;
        }

        .requests-table th {
          background: #f7fafc;
          padding: 20px;
          text-align: left;
          font-weight: 600;
          color: #2d3748;
          font-size: 0.9rem;
          border-bottom: 2px solid #e2e8f0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .requests-table td {
          padding: 24px 20px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: top;
        }

        .request-row:hover {
          background: #f8fafc;
        }

        .restaurant-info {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          min-width: 250px;
        }

        .restaurant-avatar {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .restaurant-details {
          flex: 1;
        }

        .restaurant-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 4px;
        }

        .restaurant-category {
          font-size: 0.875rem;
          color: #667eea;
          background: #667eea10;
          padding: 4px 8px;
          border-radius: 6px;
          display: inline-block;
          margin-bottom: 8px;
        }

        .restaurant-location {
          font-size: 0.875rem;
          color: #718096;
          display: flex;
          align-items: center;
          gap: 6px;
          margin: 0;
        }

        .location-icon {
          font-size: 0.8rem;
        }

        .owner-info p {
          margin: 0 0 8px 0;
          color: #4b5563;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
        }

        .info-icon {
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .owner-name {
          font-weight: 600;
          color: #1a202c;
        }

        .request-info {
          min-width: 150px;
        }

        .request-type {
          background: #f3f4f6;
          color: #6b7280;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 8px;
          display: inline-block;
        }

        .request-date {
          font-size: 0.875rem;
          color: #718096;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }

        .date-icon {
          font-size: 0.8rem;
        }

        .request-time {
          font-size: 0.75rem;
          color: #9ca3af;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: inline-block;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .accept-btn {
          background: #10b981;
          color: white;
        }

        .accept-btn:hover {
          background: #059669;
          transform: translateY(-1px);
        }

        .reject-btn {
          background: #ef4444;
          color: white;
        }

        .reject-btn:hover {
          background: #dc2626;
          transform: translateY(-1px);
        }

        .btn-icon {
          font-weight: bold;
        }

        .view-details-btn {
          padding: 8px 16px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-details-btn:hover {
          background: #5a67d8;
          transform: translateY(-1px);
        }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
          color: #718096;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        .empty-state h3 {
          color: #4a5568;
          margin-bottom: 8px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .restaurant-requests-container {
            padding: 20px;
          }

          .requests-table {
            display: block;
            overflow-x: auto;
          }

          .requests-table th,
          .requests-table td {
            white-space: nowrap;
          }
        }

        @media (max-width: 768px) {
          .requests-stats {
            grid-template-columns: 1fr 1fr;
          }

          .filter-tabs {
            justify-content: center;
          }

          .restaurant-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }

        @media (max-width: 480px) {
          .restaurant-requests-container {
            padding: 16px;
          }

          .requests-stats {
            grid-template-columns: 1fr;
          }

          .page-title {
            font-size: 1.75rem;
          }

          .action-buttons {
            flex-direction: column;
          }

          .action-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}