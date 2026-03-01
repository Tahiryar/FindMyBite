import React, { useEffect, useState } from "react";

export default function AllPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const dummyPayments = [
    {
      id: 1,
      restaurantName: "Pizza Hub",
      restaurantId: "RST001",
      amount: 5000,
      commission: 500,
      netAmount: 4500,
      date: "2025-12-01",
      time: "12:30 PM",
      status: "paid",
      paymentMethod: "Stripe",
      transactionId: "TXN_001234",
      invoiceNo: "INV-2025-001",
      customerEmail: "ali@example.com",
      customerName: "Ali Khan",
      daysAgo: "2 days ago"
    },
    {
      id: 2,
      restaurantName: "Burger King",
      restaurantId: "RST002",
      amount: 3000,
      commission: 300,
      netAmount: 2700,
      date: "2025-12-02",
      time: "11:15 AM",
      status: "pending",
      paymentMethod: "Bank Transfer",
      transactionId: "TXN_001235",
      invoiceNo: "INV-2025-002",
      customerEmail: "sara@example.com",
      customerName: "Sara Ahmed",
      daysAgo: "1 day ago"
    },
    {
      id: 3,
      restaurantName: "Sushi World",
      restaurantId: "RST003",
      amount: 7000,
      commission: 700,
      netAmount: 6300,
      date: "2025-12-02",
      time: "03:45 PM",
      status: "paid",
      paymentMethod: "PayPal",
      transactionId: "TXN_001236",
      invoiceNo: "INV-2025-003",
      customerEmail: "ahmed@example.com",
      customerName: "Ahmed Raza",
      daysAgo: "1 day ago"
    },
    {
      id: 4,
      restaurantName: "Spice & Rice",
      restaurantId: "RST004",
      amount: 4500,
      commission: 450,
      netAmount: 4050,
      date: "2025-12-01",
      time: "10:20 AM",
      status: "failed",
      paymentMethod: "Stripe",
      transactionId: "TXN_001237",
      invoiceNo: "INV-2025-004",
      customerEmail: "fatima@example.com",
      customerName: "Fatima Noor",
      daysAgo: "2 days ago"
    },
    {
      id: 5,
      restaurantName: "Cafe Delight",
      restaurantId: "RST005",
      amount: 6000,
      commission: 600,
      netAmount: 5400,
      date: "2025-11-30",
      time: "02:15 PM",
      status: "paid",
      paymentMethod: "Credit Card",
      transactionId: "TXN_001238",
      invoiceNo: "INV-2025-005",
      customerEmail: "raza@example.com",
      customerName: "Raza Ali",
      daysAgo: "3 days ago"
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPayments(dummyPayments);
      setLoading(false);
    }, 800);
  }, []);

  const getStatusBadge = (status) => {
    const config = {
      paid: { color: "#10b981", bg: "#d1fae5", icon: "✓" },
      pending: { color: "#f59e0b", bg: "#fef3c7", icon: "⏳" },
      failed: { color: "#ef4444", bg: "#fee2e2", icon: "✕" },
      refunded: { color: "#8b5cf6", bg: "#ede9fe", icon: "↻" }
    };
    const style = config[status] || config.pending;
    return (
      <span className="status-badge" style={{ backgroundColor: style.bg, color: style.color }}>
        <span className="status-icon">{style.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentMethodIcon = (method) => {
    const icons = {
      "Stripe": "💳",
      "PayPal": "📱",
      "Bank Transfer": "🏦",
      "Credit Card": "💳"
    };
    return icons[method] || "💰";
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || payment.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalCommission = payments.reduce((sum, p) => sum + p.commission, 0);
  const totalNetAmount = payments.reduce((sum, p) => sum + p.netAmount, 0);

  const paidCount = payments.filter(p => p.status === "paid").length;
  const pendingCount = payments.filter(p => p.status === "pending").length;

  return (
    <div className="payments-container">
      {/* Header */}
      <div className="payments-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">💰</span>
            Restaurant Payments
          </h1>
          <p className="page-subtitle">Monitor and manage all payment transactions</p>
        </div>
        
        <button className="export-btn">
          <span className="export-icon">📥</span>
          Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="payments-stats">
        <div className="stat-card">
          <div className="stat-icon revenue">💰</div>
          <div className="stat-content">
            <h3 className="stat-number">Rs. {totalRevenue.toLocaleString()}</h3>
            <p className="stat-label">Total Revenue</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon commission">📊</div>
          <div className="stat-content">
            <h3 className="stat-number">Rs. {totalCommission.toLocaleString()}</h3>
            <p className="stat-label">Total Commission</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon net">💵</div>
          <div className="stat-content">
            <h3 className="stat-number">Rs. {totalNetAmount.toLocaleString()}</h3>
            <p className="stat-label">Net Amount</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon transactions">📈</div>
          <div className="stat-content">
            <h3 className="stat-number">{payments.length}</h3>
            <p className="stat-label">Total Transactions</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="filters-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search restaurant, transaction ID, or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({payments.length})
          </button>
          <button 
            className={`filter-tab ${filter === "paid" ? "active" : ""}`}
            onClick={() => setFilter("paid")}
          >
            Paid ({paidCount})
          </button>
          <button 
            className={`filter-tab ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Pending ({pendingCount})
          </button>
          <button 
            className={`filter-tab ${filter === "failed" ? "active" : ""}`}
            onClick={() => setFilter("failed")}
          >
            Failed ({payments.filter(p => p.status === "failed").length})
          </button>
        </div>
      </div>

      {/* Payments Table */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading payments...</p>
        </div>
      ) : (
        <div className="payments-table-container">
          {filteredPayments.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No payments found</h3>
              <p>No payments match your search criteria.</p>
            </div>
          ) : (
            <table className="payments-table">
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Restaurant</th>
                  <th>Customer</th>
                  <th>Amount Details</th>
                  <th>Payment Method</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="payment-row">
                    <td className="transaction-info">
                      <div className="transaction-id">{payment.transactionId}</div>
                      <div className="invoice-no">{payment.invoiceNo}</div>
                    </td>
                    <td className="restaurant-info">
                      <div className="restaurant-name">{payment.restaurantName}</div>
                      <div className="restaurant-id">ID: {payment.restaurantId}</div>
                    </td>
                    <td className="customer-info">
                      <div className="customer-name">{payment.customerName}</div>
                      <div className="customer-email">{payment.customerEmail}</div>
                    </td>
                    <td className="amount-info">
                      <div className="amount-row">
                        <span className="amount-label">Amount:</span>
                        <span className="amount-value">Rs. {payment.amount}</span>
                      </div>
                      <div className="amount-row">
                        <span className="amount-label">Commission:</span>
                        <span className="commission-value">-Rs. {payment.commission}</span>
                      </div>
                      <div className="amount-row total">
                        <span className="amount-label">Net:</span>
                        <span className="net-value">Rs. {payment.netAmount}</span>
                      </div>
                    </td>
                    <td className="payment-method">
                      <div className="method-icon">
                        {getPaymentMethodIcon(payment.paymentMethod)}
                      </div>
                      <div className="method-name">{payment.paymentMethod}</div>
                    </td>
                    <td className="datetime-info">
                      <div className="date">{payment.date}</div>
                      <div className="time">{payment.time}</div>
                      <div className="days-ago">{payment.daysAgo}</div>
                    </td>
                    <td className="status-cell">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="actions-cell">
                      <div className="action-buttons">
                        <button className="action-btn view-invoice">
                          <span className="btn-icon">📄</span>
                          Invoice
                        </button>
                        <button className="action-btn view-details">
                          <span className="btn-icon">👁️</span>
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Summary Footer */}
      <div className="summary-footer">
        <div className="summary-content">
          <div className="summary-item">
            <span className="summary-label">Showing:</span>
            <span className="summary-value">
              {filteredPayments.length} of {payments.length} transactions
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Filtered Revenue:</span>
            <span className="summary-value">
              Rs. {filteredPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .payments-container {
          padding: 30px;
          background: #f8fafc;
          min-height: 100vh;
        }

        .payments-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
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

        .export-btn {
          padding: 12px 24px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .export-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .export-icon {
          font-size: 1rem;
        }

        .payments-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
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
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .stat-icon.revenue {
          background: #f0fdf4;
          color: #166534;
        }

        .stat-icon.commission {
          background: #e0f2fe;
          color: #0369a1;
        }

        .stat-icon.net {
          background: #fef3c7;
          color: #92400e;
        }

        .stat-icon.transactions {
          background: #ede9fe;
          color: #7c3aed;
        }

        .stat-content {
          flex: 1;
        }

        .stat-number {
          font-size: 1.75rem;
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

        .filters-section {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 24px;
          border: 1px solid #e2e8f0;
        }

        .search-box {
          position: relative;
          margin-bottom: 20px;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #718096;
          font-size: 1rem;
        }

        .search-input {
          width: 100%;
          padding: 14px 14px 14px 44px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          background: #fafafa;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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
          padding: 80px 20px;
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

        .payments-table-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          margin-bottom: 20px;
          border: 1px solid #e2e8f0;
        }

        .payments-table {
          width: 100%;
          border-collapse: collapse;
        }

        .payments-table th {
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

        .payments-table td {
          padding: 20px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: top;
        }

        .payment-row:hover {
          background: #f8fafc;
        }

        .transaction-info {
          min-width: 150px;
        }

        .transaction-id {
          font-weight: 600;
          color: #1a202c;
          font-size: 0.9rem;
          margin-bottom: 4px;
        }

        .invoice-no {
          font-size: 0.8rem;
          color: #64748b;
          background: #f1f5f9;
          padding: 4px 8px;
          border-radius: 6px;
          display: inline-block;
        }

        .restaurant-info {
          min-width: 150px;
        }

        .restaurant-name {
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 4px;
        }

        .restaurant-id {
          font-size: 0.8rem;
          color: #64748b;
        }

        .customer-info {
          min-width: 180px;
        }

        .customer-name {
          font-weight: 500;
          color: #1a202c;
          margin-bottom: 4px;
        }

        .customer-email {
          font-size: 0.8rem;
          color: #64748b;
        }

        .amount-info {
          min-width: 180px;
        }

        .amount-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
          font-size: 0.85rem;
        }

        .amount-row.total {
          padding-top: 8px;
          border-top: 1px solid #e2e8f0;
          margin-top: 8px;
          font-weight: 600;
        }

        .amount-label {
          color: #64748b;
        }

        .amount-value {
          color: #1a202c;
          font-weight: 500;
        }

        .commission-value {
          color: #ef4444;
          font-weight: 500;
        }

        .net-value {
          color: #10b981;
          font-weight: 600;
        }

        .payment-method {
          min-width: 120px;
          text-align: center;
        }

        .method-icon {
          font-size: 1.5rem;
          margin-bottom: 6px;
        }

        .method-name {
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 500;
        }

        .datetime-info {
          min-width: 120px;
        }

        .date {
          font-weight: 500;
          color: #1a202c;
          margin-bottom: 4px;
        }

        .time {
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 4px;
        }

        .days-ago {
          font-size: 0.75rem;
          color: #9ca3af;
          font-style: italic;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .status-icon {
          font-size: 0.7rem;
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .action-btn {
          padding: 8px 12px;
          border: none;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .view-invoice {
          background: #e0f2fe;
          color: #0369a1;
        }

        .view-invoice:hover {
          background: #bae6fd;
          transform: translateY(-1px);
        }

        .view-details {
          background: #f1f5f9;
          color: #475569;
        }

        .view-details:hover {
          background: #e2e8f0;
          transform: translateY(-1px);
        }

        .btn-icon {
          font-size: 0.9rem;
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

        .summary-footer {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
        }

        .summary-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .summary-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .summary-label {
          color: #64748b;
          font-size: 0.9rem;
        }

        .summary-value {
          font-weight: 600;
          color: #1a202c;
          font-size: 0.95rem;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .payments-container {
            padding: 20px;
          }

          .payments-table {
            display: block;
            overflow-x: auto;
          }

          .payments-table th,
          .payments-table td {
            white-space: nowrap;
          }
        }

        @media (max-width: 768px) {
          .payments-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .payments-stats {
            grid-template-columns: 1fr 1fr;
          }

          .filter-tabs {
            justify-content: center;
          }

          .summary-content {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .payments-container {
            padding: 16px;
          }

          .payments-stats {
            grid-template-columns: 1fr;
          }

          .page-title {
            font-size: 1.75rem;
          }

          .stat-card {
            padding: 20px;
          }

          .action-buttons {
            flex-direction: row;
          }
        }
      `}</style>
    </div>
  );
}