import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Dummy data with more details
  const dummyData = [
    { 
      id: 1, 
      name: "Pizza Hub", 
      location: "Karachi", 
      status: "active",
      rating: 4.5,
      category: "Italian",
      totalOrders: 1245,
      revenue: "$12,450"
    },
    { 
      id: 2, 
      name: "Burger King", 
      location: "Lahore", 
      status: "active",
      rating: 4.2,
      category: "Fast Food",
      totalOrders: 856,
      revenue: "$8,560"
    },
    { 
      id: 3, 
      name: "Sushi World", 
      location: "Islamabad", 
      status: "inactive",
      rating: 4.8,
      category: "Japanese",
      totalOrders: 342,
      revenue: "$4,120"
    },
    { 
      id: 4, 
      name: "BBQ Tonight", 
      location: "Karachi", 
      status: "active",
      rating: 4.3,
      category: "BBQ",
      totalOrders: 967,
      revenue: "$9,870"
    },
    { 
      id: 5, 
      name: "Cafe Aylanto", 
      location: "Lahore", 
      status: "active",
      rating: 4.6,
      category: "Continental",
      totalOrders: 721,
      revenue: "$10,850"
    },
    { 
      id: 6, 
      name: "KFC", 
      location: "Islamabad", 
      status: "inactive",
      rating: 4.0,
      category: "Fast Food",
      totalOrders: 1543,
      revenue: "$15,430"
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRestaurants(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRestaurants = restaurants.filter(rest => {
    const matchesSearch = rest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rest.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || rest.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    return status === "active" ? "#51cf66" : "#ff6b6b";
  };

  const getStatusIcon = (status) => {
    return status === "active" ? "✅" : "⏸️";
  };

  if (loading) {
    return (
      <div className="all-restaurants">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading restaurants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="all-restaurants">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">All Restaurants</h1>
          <p className="page-subtitle">Manage and monitor all registered restaurants</p>
        </div>
        <Link to="/admin/add-restaurant" className="add-btn">
          <span className="btn-icon">➕</span>
          Add New Restaurant
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search restaurants by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-options">
          <button 
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({restaurants.length})
          </button>
          <button 
            className={`filter-btn ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active ({restaurants.filter(r => r.status === "active").length})
          </button>
          <button 
            className={`filter-btn ${filter === "inactive" ? "active" : ""}`}
            onClick={() => setFilter("inactive")}
          >
            Inactive ({restaurants.filter(r => r.status === "inactive").length})
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon total">🏪</div>
          <div className="stat-content">
            <h3 className="stat-number">{restaurants.length}</h3>
            <p className="stat-label">Total Restaurants</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">✅</div>
          <div className="stat-content">
            <h3 className="stat-number">{restaurants.filter(r => r.status === "active").length}</h3>
            <p className="stat-label">Active</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon inactive">⏸️</div>
          <div className="stat-content">
            <h3 className="stat-number">{restaurants.filter(r => r.status === "inactive").length}</h3>
            <p className="stat-label">Inactive</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon revenue">💰</div>
          <div className="stat-content">
            <h3 className="stat-number">$50,280</h3>
            <p className="stat-label">Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="restaurants-grid">
        {filteredRestaurants.map((rest) => (
          <div key={rest.id} className="restaurant-card">
            {/* Restaurant Header */}
            <div className="restaurant-header">
              <div className="restaurant-avatar">
                {rest.name.charAt(0)}
              </div>
              <div className="restaurant-info">
                <h3 className="restaurant-name">{rest.name}</h3>
                <div className="restaurant-location">
                  <span className="location-icon">📍</span>
                  {rest.location}
                </div>
              </div>
              <div className="restaurant-status" style={{ color: getStatusColor(rest.status) }}>
                <span className="status-icon">{getStatusIcon(rest.status)}</span>
                {rest.status.charAt(0).toUpperCase() + rest.status.slice(1)}
              </div>
            </div>

            {/* Restaurant Details */}
            <div className="restaurant-details">
              <div className="detail-row">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{rest.category}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Rating:</span>
                <span className="detail-value">
                  <span className="rating-stars">{"★".repeat(Math.floor(rest.rating))}</span>
                  <span className="rating-number"> ({rest.rating})</span>
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Total Orders:</span>
                <span className="detail-value">{rest.totalOrders.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Revenue:</span>
                <span className="detail-value revenue">{rest.revenue}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="restaurant-actions">
              <Link to={`/admin/restaurants/${rest.id}`} className="action-btn view-btn">
                View Details
              </Link>
              <button className="action-btn edit-btn">
                Edit
              </button>
              <button className={`action-btn status-btn ${rest.status === "active" ? "deactivate" : "activate"}`}>
                {rest.status === "active" ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRestaurants.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🏪</div>
          <h3>No restaurants found</h3>
          <p>Try adjusting your search or filter to find what you're looking for.</p>
          <button 
            className="clear-filters-btn"
            onClick={() => {
              setSearchTerm("");
              setFilter("all");
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {filteredRestaurants.length > 0 && (
        <div className="pagination">
          <button className="pagination-btn prev">← Previous</button>
          <div className="page-numbers">
            <span className="page-number active">1</span>
            <span className="page-number">2</span>
            <span className="page-number">3</span>
            <span className="page-dots">...</span>
            <span className="page-number">10</span>
          </div>
          <button className="pagination-btn next">Next →</button>
        </div>
      )}

      <style jsx>{`
        /* All Restaurants Page Styles */
        .all-restaurants {
          min-height: 100vh;
          background: #f8fafc;
          padding: 30px;
          margin-left: 280px;
          max-width: calc(100% - 280px);
        }

        /* Header */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
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

        .add-btn {
          background: linear-gradient(135deg, #51cf66 0%, #2ecc71 100%);
          color: white;
          padding: 14px 28px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 5px 20px rgba(81, 207, 102, 0.3);
        }

        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(81, 207, 102, 0.4);
        }

        .btn-icon {
          font-size: 1.1rem;
        }

        /* Filters Section */
        .filters-section {
          background: white;
          border-radius: 20px;
          padding: 25px;
          margin-bottom: 30px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e9ecef;
        }

        .search-box {
          position: relative;
          margin-bottom: 20px;
        }

        .search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
          font-size: 1.2rem;
        }

        .search-input {
          width: 100%;
          padding: 16px 20px 16px 55px;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .filter-options {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 10px 20px;
          border: 2px solid #e9ecef;
          background: white;
          border-radius: 10px;
          font-weight: 600;
          color: #666;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .filter-btn.active {
          background: #667eea;
          border-color: #667eea;
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        /* Stats Overview */
        .stats-overview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          border: 1px solid #e9ecef;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
        }

        .stat-icon.total {
          background: #e3f2fd;
          color: #1976d2;
        }

        .stat-icon.active {
          background: #e8f5e9;
          color: #2e7d32;
        }

        .stat-icon.inactive {
          background: #ffebee;
          color: #d32f2f;
        }

        .stat-icon.revenue {
          background: #fff3e0;
          color: #f57c00;
        }

        .stat-content {
          flex: 1;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 800;
          color: #2d3436;
          margin: 0 0 5px 0;
          line-height: 1;
        }

        .stat-label {
          color: #666;
          font-size: 0.9rem;
          font-weight: 500;
          margin: 0;
        }

        /* Restaurants Grid */
        .restaurants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 25px;
          margin-bottom: 40px;
        }

        .restaurant-card {
          background: white;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid #e9ecef;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        .restaurant-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
          background: linear-gradient(to bottom, #667eea, #764ba2);
          transition: width 0.3s ease;
        }

        .restaurant-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .restaurant-card:hover::before {
          width: 8px;
        }

        .restaurant-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f1f3f5;
        }

        .restaurant-avatar {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.8rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .restaurant-info {
          flex: 1;
        }

        .restaurant-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: #2d3436;
          margin: 0 0 8px 0;
        }

        .restaurant-location {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
          font-size: 0.95rem;
        }

        .location-icon {
          font-size: 0.9rem;
        }

        .restaurant-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 6px 12px;
          border-radius: 20px;
          background: rgba(0, 0, 0, 0.05);
        }

        .status-icon {
          font-size: 0.8rem;
        }

        /* Restaurant Details */
        .restaurant-details {
          margin-bottom: 25px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px dashed #f1f3f5;
        }

        .detail-row:last-child {
          border-bottom: none;
        }

        .detail-label {
          color: #666;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .detail-value {
          font-weight: 600;
          color: #2d3436;
          font-size: 0.95rem;
        }

        .rating-stars {
          color: #ffc107;
          margin-right: 5px;
        }

        .rating-number {
          color: #999;
          font-size: 0.85rem;
        }

        .detail-value.revenue {
          color: #51cf66;
          font-weight: 700;
        }

        /* Action Buttons */
        .restaurant-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .action-btn {
          flex: 1;
          padding: 12px 20px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          text-decoration: none;
        }

        .view-btn {
          background: #667eea;
          color: white;
        }

        .view-btn:hover {
          background: #5a67d8;
          transform: translateY(-2px);
        }

        .edit-btn {
          background: #ffc107;
          color: #212529;
        }

        .edit-btn:hover {
          background: #e0a800;
          transform: translateY(-2px);
        }

        .status-btn {
          background: #e9ecef;
          color: #495057;
        }

        .status-btn.deactivate {
          background: #ff6b6b;
          color: white;
        }

        .status-btn.activate {
          background: #51cf66;
          color: white;
        }

        .status-btn:hover {
          transform: translateY(-2px);
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 80px 20px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid #e9ecef;
          margin: 40px 0;
        }

        .empty-icon {
          font-size: 5rem;
          margin-bottom: 20px;
          opacity: 0.7;
        }

        .empty-state h3 {
          color: #2d3436;
          margin: 0 0 10px 0;
          font-size: 1.8rem;
        }

        .empty-state p {
          color: #666;
          font-size: 1.1rem;
          margin: 0 0 30px 0;
          max-width: 500px;
          margin: 0 auto 30px;
        }

        .clear-filters-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 14px 28px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .clear-filters-btn:hover {
          background: #5a67d8;
          transform: translateY(-2px);
        }

        /* Pagination */
        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e9ecef;
        }

        .pagination-btn {
          padding: 10px 20px;
          border: 2px solid #e9ecef;
          background: white;
          border-radius: 8px;
          font-weight: 600;
          color: #666;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pagination-btn:hover:not(:disabled) {
          border-color: #667eea;
          color: #667eea;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .page-numbers {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .page-number {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-weight: 600;
          color: #666;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .page-number:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .page-number.active {
          background: #667eea;
          border-color: #667eea;
          color: white;
        }

        .page-dots {
          color: #999;
          font-weight: 600;
        }

        /* Loading State */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 20px;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #f1f3f5;
          border-top-color: #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .all-restaurants {
            margin-left: 250px;
            max-width: calc(100% - 250px);
          }
        }

        @media (max-width: 992px) {
          .all-restaurants {
            margin-left: 0;
            max-width: 100%;
            padding: 20px;
          }

          .page-header {
            flex-direction: column;
            gap: 20px;
            align-items: flex-start;
          }

          .add-btn {
            width: 100%;
            justify-content: center;
          }

          .restaurants-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2rem;
          }

          .restaurants-grid {
            grid-template-columns: 1fr;
          }

          .stats-overview {
            grid-template-columns: repeat(2, 1fr);
          }

          .restaurant-actions {
            flex-direction: column;
          }

          .action-btn {
            width: 100%;
          }

          .pagination {
            flex-direction: column;
            gap: 20px;
          }
        }

        @media (max-width: 576px) {
          .all-restaurants {
            padding: 15px;
          }

          .stats-overview {
            grid-template-columns: 1fr;
          }

          .filter-options {
            flex-direction: column;
          }

          .filter-btn {
            width: 100%;
          }

          .page-title {
            font-size: 1.8rem;
          }
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
          .all-restaurants {
            background: #121212;
          }

          .filters-section,
          .stat-card,
          .restaurant-card,
          .empty-state,
          .pagination {
            background: #1e1e1e;
            border-color: #333;
          }

          .page-title,
          .restaurant-name,
          .stat-number,
          .detail-value,
          .empty-state h3 {
            color: #ffffff;
          }

          .page-subtitle,
          .restaurant-location,
          .stat-label,
          .detail-label,
          .empty-state p {
            color: #b0b0b0;
          }

          .search-input {
            background: #2d2d2d;
            border-color: #444;
            color: #ffffff;
          }

          .search-input:focus {
            background: #333;
            border-color: #667eea;
          }

          .filter-btn,
          .pagination-btn,
          .page-number {
            background: #2d2d2d;
            border-color: #444;
            color: #ffffff;
          }

          .filter-btn:hover,
          .pagination-btn:hover:not(:disabled),
          .page-number:hover {
            border-color: #667eea;
            color: #667eea;
          }

          .filter-btn.active {
            background: #667eea;
          }

          .page-number.active {
            background: #667eea;
            color: white;
          }

          .stat-icon.total,
          .stat-icon.active,
          .stat-icon.inactive,
          .stat-icon.revenue {
            opacity: 0.9;
          }
        }

        /* Print Styles */
        @media print {
          .all-restaurants {
            margin-left: 0;
            max-width: 100%;
            background: white;
          }

          .add-btn,
          .restaurant-actions,
          .pagination {
            display: none;
          }

          .filters-section,
          .restaurant-card,
          .empty-state {
            box-shadow: none;
            border: 1px solid #ddd;
            break-inside: avoid;
          }

          .restaurant-card {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}