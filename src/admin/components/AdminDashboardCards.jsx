// src/components/AdminDashboardCards.jsx
import React from "react";

export default function AdminDashboardCards() {
  const cards = [
    { 
      title: "Restaurant Requests", 
      value: "12",
      icon: "📨",
      color: "#ff6b6b",
      trend: "+3 new",
      description: "Pending approval",
      link: "/admin/restaurant-requests"
    },
    { 
      title: "All Restaurants", 
      value: "48",
      icon: "🏪",
      color: "#4dabf7",
      trend: "+8 this month",
      description: "Active listings",
      link: "/admin/restaurants"
    },
    { 
      title: "Blocked Restaurants", 
      value: "5",
      icon: "🚫",
      color: "#ffa94d",
      trend: "-2 resolved",
      description: "Under review",
      link: "/admin/blocked-restaurants"
    },
    { 
      title: "Payments", 
      value: "$2,840",
      icon: "💳",
      color: "#51cf66",
      trend: "+12% growth",
      description: "This month",
      link: "/admin/payments"
    },
    { 
      title: "User Reports", 
      value: "7",
      icon: "📊",
      color: "#845ef7",
      trend: "3 urgent",
      description: "Need attention",
      link: "/admin/user-reports"
    },
    { 
      title: "Locations", 
      value: "15",
      icon: "📍",
      color: "#ff8787",
      trend: "+2 added",
      description: "Cities covered",
        link: "/admin/locations"
    },
  ];

  return (
    <div className="admin-cards-grid">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="admin-card"
          style={{ '--card-color': card.color }}
        >
          <div className="card-icon" style={{ background: card.color }}>
            {card.icon}
          </div>
          <div className="card-content">
            <div className="card-stats">
              <h3 className="card-value">{card.value}</h3>
              <span className="card-trend">{card.trend}</span>
            </div>
            <h4 className="card-title">{card.title}</h4>
            <p className="card-description">{card.description}</p>
          </div>
          <div className="card-actions">
            <button className="view-btn">View Details →</button>
          </div>
        </div>
      ))}

      <style jsx>{`
        .admin-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 25px;
          margin-top: 30px;
        }

        .admin-card {
          background: white;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid #e9ecef;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .admin-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
          background: var(--card-color);
          transition: width 0.3s ease;
        }

        .admin-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .admin-card:hover::before {
          width: 8px;
        }

        .card-icon {
          width: 60px;
          height: 60px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 20px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .admin-card:hover .card-icon {
          transform: scale(1.1) rotate(10deg);
        }

        .card-content {
          flex: 1;
          margin-bottom: 20px;
        }

        .card-stats {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 10px;
        }

        .card-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: #2d3436;
          margin: 0;
          line-height: 1;
          background: linear-gradient(135deg, var(--card-color), #2d3436);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-trend {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--card-color);
          background: rgba(0, 0, 0, 0.05);
          padding: 4px 10px;
          border-radius: 20px;
        }

        .card-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #2d3436;
          margin: 0 0 8px 0;
        }

        .card-description {
          font-size: 0.9rem;
          color: #666;
          margin: 0;
          line-height: 1.5;
        }

        .card-actions {
          border-top: 1px solid #f1f3f5;
          padding-top: 20px;
        }

        .view-btn {
          background: transparent;
          border: none;
          color: var(--card-color);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          padding: 8px 0;
        }

        .view-btn:hover {
          gap: 12px;
          transform: translateX(5px);
        }

        @media (max-width: 768px) {
          .admin-cards-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
          }

          .admin-card {
            padding: 20px;
          }

          .card-value {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .admin-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}