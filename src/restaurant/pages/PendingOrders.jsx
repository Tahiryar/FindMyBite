import React, { useState } from "react";
import Sidebar from "../components/Sidebar/restuarentSidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

export default function PendingOrders() {
  const [pendingOrders, setPendingOrders] = useState([
    {
      id: 1,
      customerName: "Ali Khan",
      dishName: "Chicken Biryani",
      quantity: 2,
      price: "Rs. 800",
      address: "Street #5, DHA Phase 5, Lahore",
      phone: "0300-1234567",
      time: "10:45 AM",
      status: "pending",
      customerNote: "Extra spicy with raita",
      orderType: "Delivery"
    },
    {
      id: 2,
      customerName: "Ahmed Raza",
      dishName: "Zinger Burger + Fries",
      quantity: 1,
      price: "Rs. 650",
      address: "Gulshan-e-Iqbal, Block 7, Karachi",
      phone: "0312-9876543",
      time: "09:10 AM",
      status: "pending",
      customerNote: "No mayo, add extra cheese",
      orderType: "Pickup"
    },
    {
      id: 3,
      customerName: "Fatima Noor",
      dishName: "Chicken Tikka Platter",
      quantity: 3,
      price: "Rs. 1,200",
      address: "Sector F-8/2, Islamabad",
      phone: "0333-4567890",
      time: "11:20 AM",
      status: "pending",
      customerNote: "",
      orderType: "Delivery"
    }
  ]);

  const handleAcceptOrder = (orderId) => {
    setPendingOrders(prev => prev.filter(order => order.id !== orderId));
    // In real app, update order status in backend
    console.log(`Order ${orderId} accepted`);
  };

  const handleRejectOrder = (orderId) => {
    setPendingOrders(prev => prev.filter(order => order.id !== orderId));
    // In real app, update order status in backend
    console.log(`Order ${orderId} rejected`);
  };

  const getTimeAgo = (timeString) => {
    // Simple time ago calculation
    const orderTime = new Date(`2025-11-29 ${timeString}`);
    const now = new Date();
    const diffMinutes = Math.floor((now - orderTime) / (1000 * 60));
    
    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const hours = Math.floor(diffMinutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="pending-orders-container">
      <Sidebar />
      
      <div className="pending-orders-content">
        <Navbar />
        
        <div className="pending-orders-main">
          {/* Header */}
          <div className="orders-header">
            <div className="header-content">
              <h1 className="page-title">
                <span className="title-icon">📌</span>
                Pending Orders
              </h1>
              <p className="page-subtitle">Review and manage incoming orders</p>
            </div>
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-number">{pendingOrders.length}</span>
                <span className="stat-label">Pending</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {pendingOrders.filter(order => order.orderType === 'Delivery').length}
                </span>
                <span className="stat-label">Delivery</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {pendingOrders.filter(order => order.orderType === 'Pickup').length}
                </span>
                <span className="stat-label">Pickup</span>
              </div>
            </div>
          </div>

          {/* Orders Grid */}
          {pendingOrders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎉</div>
              <h3>No Pending Orders</h3>
              <p>All orders have been processed. New orders will appear here.</p>
            </div>
          ) : (
            <div className="orders-grid">
              {pendingOrders.map((order) => (
                <div key={order.id} className="order-card">
                  {/* Order Header */}
                  <div className="order-header">
                    <div className="order-meta">
                      <span className="order-id">Order #{order.id}</span>
                      <span className="order-time">
                        <span className="time-icon">🕒</span>
                        {order.time} • {getTimeAgo(order.time)}
                      </span>
                    </div>
                    <div className={`order-type ${order.orderType.toLowerCase()}`}>
                      {order.orderType}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="customer-section">
                    <div className="customer-avatar">
                      {order.customerName.charAt(0)}
                    </div>
                    <div className="customer-info">
                      <h3 className="customer-name">{order.customerName}</h3>
                      <div className="customer-contact">
                        <span className="phone">
                          <span className="contact-icon">📞</span>
                          {order.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="order-details">
                    <div className="dish-info">
                      <h4 className="dish-name">{order.dishName}</h4>
                      <div className="order-meta-info">
                        <span className="quantity">Qty: {order.quantity}</span>
                        <span className="price">{order.price}</span>
                      </div>
                    </div>
                    
                    {order.customerNote && (
                      <div className="customer-note">
                        <span className="note-icon">📝</span>
                        <span className="note-text">{order.customerNote}</span>
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  {order.orderType === 'Delivery' && (
                    <div className="address-section">
                      <span className="address-icon">📍</span>
                      <span className="address-text">{order.address}</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <button 
                      className="btn btn-reject"
                      onClick={() => handleRejectOrder(order.id)}
                    >
                      <span className="btn-icon">✕</span>
                      Reject
                    </button>
                    <button 
                      className="btn btn-accept"
                      onClick={() => handleAcceptOrder(order.id)}
                    >
                      <span className="btn-icon">✓</span>
                      Accept Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .pending-orders-container {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
        }

        .pending-orders-content {
          margin-left: 240px;
          width: calc(100% - 240px);
          min-height: 100vh;
          transition: all 0.3s ease;
        }

        .pending-orders-main {
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
          gap: 20px;
        }

        .stat-item {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          text-align: center;
          min-width: 100px;
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
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .orders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 24px;
        }

        .order-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .order-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .order-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .order-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .order-id {
          font-weight: 700;
          color: #2d3748;
          font-size: 1.1rem;
        }

        .order-time {
          font-size: 0.875rem;
          color: #718096;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .time-icon {
          font-size: 0.8rem;
        }

        .order-type {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .order-type.delivery {
          background: #e0f2fe;
          color: #0369a1;
          border: 1px solid #bae6fd;
        }

        .order-type.pickup {
          background: #f0fdf4;
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .customer-section {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f1f5f9;
        }

        .customer-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1.2rem;
        }

        .customer-info {
          flex: 1;
        }

        .customer-name {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 4px;
        }

        .customer-contact {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .phone {
          font-size: 0.875rem;
          color: #718096;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .contact-icon {
          font-size: 0.8rem;
        }

        .order-details {
          margin-bottom: 16px;
        }

        .dish-info {
          margin-bottom: 12px;
        }

        .dish-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .order-meta-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .quantity {
          background: #667eea;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .price {
          font-size: 1.1rem;
          font-weight: 700;
          color: #10b981;
        }

        .customer-note {
          background: #fffbeb;
          border: 1px solid #fef3c7;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-top: 12px;
        }

        .note-icon {
          font-size: 0.8rem;
          color: #f59e0b;
          margin-top: 1px;
        }

        .note-text {
          font-size: 0.875rem;
          color: #92400e;
          line-height: 1.4;
        }

        .address-section {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 20px;
          padding: 12px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .address-icon {
          font-size: 0.8rem;
          color: #ef4444;
          margin-top: 2px;
        }

        .address-text {
          font-size: 0.875rem;
          color: #4b5563;
          line-height: 1.4;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
        }

        .btn {
          flex: 1;
          padding: 12px 16px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .btn-reject {
          background: #fef2f2;
          color: #dc2626;
          border: 2px solid #fecaca;
        }

        .btn-reject:hover {
          background: #dc2626;
          color: white;
          transform: translateY(-2px);
        }

        .btn-accept {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border: 2px solid #10b981;
        }

        .btn-accept:hover {
          background: linear-gradient(135deg, #059669, #047857);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }

        .btn-icon {
          font-size: 1rem;
          font-weight: bold;
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
          .pending-orders-content {
            margin-left: 0;
            width: 100%;
          }

          .orders-grid {
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .pending-orders-main {
            padding: 80px 20px 20px 20px;
          }

          .orders-header {
            flex-direction: column;
            gap: 20px;
          }

          .header-stats {
            width: 100%;
            justify-content: space-between;
          }

          .orders-grid {
            grid-template-columns: 1fr;
          }

          .action-buttons {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .pending-orders-main {
            padding: 80px 16px 16px 16px;
          }

          .order-card {
            padding: 20px;
          }

          .page-title {
            font-size: 1.75rem;
          }

          .stat-item {
            padding: 16px;
            min-width: 80px;
          }

          .stat-number {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}