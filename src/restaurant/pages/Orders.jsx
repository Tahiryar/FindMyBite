import React, { useState } from "react";
import Sidebar from "../components/Sidebar/restuarentSidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  // Sample orders data with status
  const orders = [
    {
      id: 1,
      user: "Ali Khan",
      time: "2025-11-29 12:30 PM",
      dish: "Chicken Biryani",
      quantity: 2,
      price: "Rs. 800",
      address: "123 Main Street, Lahore",
      phone: "0300-1234567",
      status: "pending",
      customerNote: "Extra spicy please"
    },
    {
      id: 2,
      user: "Sara Ahmed",
      time: "2025-11-29 01:15 PM",
      dish: "Veg Pizza",
      quantity: 1,
      price: "Rs. 1200",
      address: "45 Park Avenue, Karachi",
      phone: "0312-9876543",
      status: "preparing",
      customerNote: "No onions"
    },
    {
      id: 3,
      user: "Ahmed Raza",
      time: "2025-11-29 11:45 AM",
      dish: "Beef Burger + Fries",
      quantity: 3,
      price: "Rs. 1500",
      address: "78 Commercial Area, Islamabad",
      phone: "0333-4567890",
      status: "delivered",
      customerNote: "Add extra cheese"
    },
    {
      id: 4,
      user: "Fatima Noor",
      time: "2025-11-29 02:20 PM",
      dish: "Chicken Tikka",
      quantity: 2,
      price: "Rs. 950",
      address: "56 Garden Town, Faisalabad",
      phone: "0345-1122334",
      status: "pending",
      customerNote: ""
    }
  ];

  const filteredOrders = selectedStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "#f59e0b", bg: "#fef3c7", label: "Pending" },
      preparing: { color: "#3b82f6", bg: "#dbeafe", label: "Preparing" },
      delivered: { color: "#10b981", bg: "#d1fae5", label: "Delivered" },
      cancelled: { color: "#ef4444", bg: "#fee2e2", label: "Cancelled" }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span 
        className="status-badge"
        style={{ 
          backgroundColor: config.bg, 
          color: config.color,
          border: `1px solid ${config.color}20`
        }}
      >
        {config.label}
      </span>
    );
  };

  const updateOrderStatus = (orderId, newStatus) => {
    // In real app, this would update the backend
    console.log(`Updating order ${orderId} to ${newStatus}`);
  };

  return (
    <div className="orders-container">
      <Sidebar />
      
      <div className="orders-content">
        <Navbar />
        
        <div className="orders-main">
          {/* Header */}
          <div className="orders-header">
            <div className="header-left">
              <h1 className="orders-title">Orders Management</h1>
              <p className="orders-subtitle">Manage and track all customer orders</p>
            </div>
            <div className="header-right">
              <div className="orders-stats">
                <div className="stat-card">
                  <span className="stat-number">{orders.length}</span>
                  <span className="stat-label">Total Orders</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">
                    {orders.filter(o => o.status === 'pending').length}
                  </span>
                  <span className="stat-label">Pending</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="orders-filters">
            <div className="filter-group">
              <label className="filter-label">Filter by Status:</label>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="status-filter"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Search orders..." 
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          {/* Orders Table */}
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Time</th>
                  <th>Items</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="order-row">
                    <td className="order-id">#{order.id}</td>
                    <td className="customer-info">
                      <div className="customer-name">{order.user}</div>
                      <div className="customer-address">{order.address}</div>
                      {order.customerNote && (
                        <div className="customer-note">
                          <span className="note-icon">📝</span>
                          {order.customerNote}
                        </div>
                      )}
                    </td>
                    <td className="order-time">{order.time}</td>
                    <td className="order-dish">{order.dish}</td>
                    <td className="order-quantity">
                      <span className="quantity-badge">{order.quantity}</span>
                    </td>
                    <td className="order-price">{order.price}</td>
                    <td className="order-status">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="order-contact">
                      <div className="phone-number">{order.phone}</div>
                      <button className="contact-btn">Call</button>
                    </td>
                    <td className="order-actions">
                      <div className="action-buttons">
                        {order.status === "pending" && (
                          <>
                            <button 
                              className="action-btn accept"
                              onClick={() => updateOrderStatus(order.id, "preparing")}
                            >
                              Accept
                            </button>
                            <button 
                              className="action-btn reject"
                              onClick={() => updateOrderStatus(order.id, "cancelled")}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {order.status === "preparing" && (
                          <button 
                            className="action-btn complete"
                            onClick={() => updateOrderStatus(order.id, "delivered")}
                          >
                            Mark Ready
                          </button>
                        )}
                        <button className="action-btn view">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <div className="no-orders">
                <div className="no-orders-icon">📦</div>
                <h3>No orders found</h3>
                <p>There are no orders matching your current filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .orders-container {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
        }

        .orders-content {
          margin-left: 240px;
          width: calc(100% - 240px);
          min-height: 100vh;
          transition: all 0.3s ease;
        }

        .orders-main {
          padding: 80px 30px 30px 30px;
          min-height: calc(100vh - 60px);
          margin-top: 60px;
        }

        .orders-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .header-left {
          flex: 1;
        }

        .orders-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .orders-subtitle {
          color: #718096;
          font-size: 1rem;
        }

        .orders-stats {
          display: flex;
          gap: 16px;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          text-align: center;
          min-width: 120px;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #718096;
          font-weight: 500;
        }

        .orders-filters {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .filter-label {
          font-weight: 600;
          color: #2d3748;
          font-size: 0.9rem;
        }

        .status-filter {
          padding: 10px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .status-filter:focus {
          outline: none;
          border-color: #667eea;
        }

        .search-box {
          position: relative;
          width: 300px;
        }

        .search-input {
          width: 100%;
          padding: 10px 40px 10px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .search-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #718096;
        }

        .orders-table-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
        }

        .orders-table th {
          background: #f7fafc;
          padding: 16px 20px;
          text-align: left;
          font-weight: 600;
          color: #2d3748;
          font-size: 0.9rem;
          border-bottom: 2px solid #e2e8f0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .orders-table td {
          padding: 20px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: top;
        }

        .order-row:hover {
          background: #f8fafc;
        }

        .order-id {
          font-weight: 600;
          color: #667eea;
          font-size: 0.9rem;
        }

        .customer-info {
          min-width: 200px;
        }

        .customer-name {
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 4px;
        }

        .customer-address {
          font-size: 0.875rem;
          color: #718096;
          margin-bottom: 6px;
          line-height: 1.4;
        }

        .customer-note {
          font-size: 0.8rem;
          color: #f59e0b;
          background: #fffbeb;
          padding: 4px 8px;
          border-radius: 6px;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .note-icon {
          font-size: 0.7rem;
        }

        .order-time {
          color: #718096;
          font-size: 0.9rem;
          white-space: nowrap;
        }

        .order-dish {
          font-weight: 500;
          color: #2d3748;
        }

        .quantity-badge {
          background: #667eea;
          color: white;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          min-width: 30px;
          display: inline-block;
          text-align: center;
        }

        .order-price {
          font-weight: 700;
          color: #10b981;
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

        .order-contact {
          min-width: 140px;
        }

        .phone-number {
          font-size: 0.9rem;
          color: #2d3748;
          margin-bottom: 6px;
        }

        .contact-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .contact-btn:hover {
          background: #059669;
          transform: translateY(-1px);
        }

        .order-actions {
          min-width: 200px;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .action-btn.accept {
          background: #10b981;
          color: white;
        }

        .action-btn.accept:hover {
          background: #059669;
          transform: translateY(-1px);
        }

        .action-btn.reject {
          background: #ef4444;
          color: white;
        }

        .action-btn.reject:hover {
          background: #dc2626;
          transform: translateY(-1px);
        }

        .action-btn.complete {
          background: #3b82f6;
          color: white;
        }

        .action-btn.complete:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }

        .action-btn.view {
          background: #6b7280;
          color: white;
        }

        .action-btn.view:hover {
          background: #4b5563;
          transform: translateY(-1px);
        }

        .no-orders {
          text-align: center;
          padding: 60px 20px;
          color: #718096;
        }

        .no-orders-icon {
          font-size: 4rem;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        .no-orders h3 {
          color: #4a5568;
          margin-bottom: 8px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .orders-content {
            margin-left: 0;
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .orders-main {
            padding: 80px 20px 20px 20px;
          }

          .orders-header {
            flex-direction: column;
            gap: 20px;
          }

          .orders-stats {
            width: 100%;
            justify-content: space-between;
          }

          .orders-filters {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }

          .search-box {
            width: 100%;
          }

          .orders-table-container {
            overflow-x: auto;
          }

          .orders-table {
            min-width: 1000px;
          }
        }
      `}</style>
    </div>
  );
};

export default Orders;