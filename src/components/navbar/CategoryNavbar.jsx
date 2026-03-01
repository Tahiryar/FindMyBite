// src/components/navbar/CategoryNavbar.js
import React, { useState } from "react";

const CategoryNavbar = ({ selectedCategories = [], setSelectedCategories }) => {
  const categories = ["Top", "Deals", "New", "Best"];
  const [active, setActive] = useState("Top");

  const handleClick = (cat) => {
    setActive(cat);
    if (!setSelectedCategories) return;

    // Example filter logic
    if (cat === "Top") setSelectedCategories(["Biryani", "BBQ", "Burgers"]);
    if (cat === "Deals") setSelectedCategories(["BBQ"]);
    if (cat === "New") setSelectedCategories([]);
    if (cat === "Best") setSelectedCategories(["Biryani", "Burgers"]);
  };

  return (
    <div className="category-navbar">
      <div className="category-container">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${active === cat ? 'active' : ''}`}
            onClick={() => handleClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <style jsx>{`
        .category-navbar {
          display: flex;
          justify-content: center;
          margin: 30px 0;
          padding: 0 20px;
        }

        .category-container {
          display: flex;
          gap: 8px;
          background: #f8f9fa;
          padding: 8px;
          border-radius: 16px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
          flex-wrap: wrap;
          justify-content: center;
        }

        .category-btn {
          padding: 12px 28px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          background: transparent;
          color: #666;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
        }

        .category-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.5s ease;
        }

        .category-btn:hover::before {
          left: 100%;
        }

        .category-btn:hover {
          color: #e74c3c;
          transform: translateY(-2px);
        }

        .category-btn.active {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          color: white;
          box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .category-navbar {
            margin: 20px 0;
          }

          .category-container {
            gap: 6px;
            padding: 6px;
          }

          .category-btn {
            padding: 10px 20px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .category-container {
            width: 100%;
          }

          .category-btn {
            flex: 1;
            min-width: 80px;
            padding: 10px 16px;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoryNavbar;