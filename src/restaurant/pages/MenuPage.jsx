import React, { useState } from "react";
import Sidebar from "../components/Sidebar/restuarentSidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

export default function MenuPage() {
  const [menu, setMenu] = useState([
    {
      id: 1,
      name: "Zinger Burger",
      price: 350,
      quantity: 10,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Broast",
      price: 500,
      quantity: 7,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Pizza",
      price: 1200,
      quantity: 5,
      image: "https://via.placeholder.com/150",
    },
  ]);

  // Delete Item
  const deleteDish = (id) => {
    const newMenu = menu.filter((dish) => dish.id !== id);
    setMenu(newMenu);
  };

  // Edit Placeholder
  const editDish = (id) => {
    alert("Edit option here — dish id = " + id);
  };

  return (
    <div className="menu-container">
      <Sidebar />

      <div className="menu-content">
        <Navbar />

        <div className="menu-main">
          <h2 className="page-title">Restaurant Menu</h2>

          <div className="menu-grid">
            {menu.map((dish) => (
              <div key={dish.id} className="dish-card">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="dish-image"
                />

                <h3 className="dish-name">{dish.name}</h3>
                <p className="dish-price">Price: Rs {dish.price}</p>
                <p className="dish-quantity">Quantity: {dish.quantity}</p>

                <div className="dish-actions">
                  <button
                    onClick={() => editDish(dish.id)}
                    className="action-btn edit-btn"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteDish(dish.id)}
                    className="action-btn delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {menu.length === 0 && (
            <p className="no-dishes">No dishes found.</p>
          )}
        </div>
      </div>

      <style jsx>{`
        .menu-container {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
        }

        .menu-content {
          margin-left: 240px;
          width: calc(100% - 240px);
          min-height: 100vh;
          transition: all 0.3s ease;
        }

        .menu-main {
          padding: 80px 30px 30px 30px;
          min-height: calc(100vh - 60px);
          margin-top: 60px;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 30px;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 24px;
        }

        .dish-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .dish-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }

        .dish-image {
          width: 100%;
          height: 180px;
          border-radius: 8px;
          object-fit: cover;
          margin-bottom: 15px;
        }

        .dish-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .dish-price {
          color: #10b981;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .dish-quantity {
          color: #718096;
          margin-bottom: 15px;
        }

        .dish-actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .action-btn {
          flex: 1;
          border: none;
          padding: 10px 15px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .edit-btn {
          background: #ffc107;
          color: #000;
        }

        .edit-btn:hover {
          background: #e0a800;
        }

        .delete-btn {
          background: #dc3545;
          color: #fff;
        }

        .delete-btn:hover {
          background: #c82333;
        }

        .no-dishes {
          text-align: center;
          color: #718096;
          font-size: 1.1rem;
          margin-top: 40px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .menu-content {
            margin-left: 0;
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .menu-main {
            padding: 80px 20px 20px 20px;
          }

          .page-title {
            font-size: 1.75rem;
          }

          .menu-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .menu-main {
            padding: 80px 16px 16px 16px;
          }

          .page-title {
            font-size: 1.5rem;
          }

          .menu-grid {
            grid-template-columns: 1fr;
          }

          .dish-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}