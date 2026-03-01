import React, { useState } from "react";
import Sidebar from "../components/Sidebar/restuarentSidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

const AddDish = ({ addDishHandler }) => {
  const [dish, setDish] = useState({
    name: "",
    price: "",
    quantity: "",
    image: "",
    category: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDish({ ...dish, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      addDishHandler(dish);
      setDish({ name: "", price: "", quantity: "", image: "", category: "", description: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="add-dish-container">
      <Sidebar />
      
      <div className="add-dish-content">
        <Navbar />
        
        <div className="add-dish-main">
          <div className="add-dish-card">
            {/* Header */}
            <div className="add-dish-header">
              <h2 className="add-dish-title">Add New Dish</h2>
              <p className="add-dish-subtitle">Fill in the details to add a new dish to your menu</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="add-dish-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Dish Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter dish name"
                    value={dish.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category" className="form-label">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={dish.category}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select Category</option>
                    <option value="appetizer">Appetizer</option>
                    <option value="main-course">Main Course</option>
                    <option value="dessert">Dessert</option>
                    <option value="beverage">Beverage</option>
                    <option value="special">Special</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price" className="form-label">Price (Rs) *</label>
                  <div className="input-with-icon">
                    <span className="input-icon">₹</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder="0.00"
                      value={dish.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="quantity" className="form-label">Quantity *</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="Available quantity"
                    value={dish.quantity}
                    onChange={handleChange}
                    required
                    min="0"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe the dish, ingredients, etc."
                  value={dish.description}
                  onChange={handleChange}
                  rows="3"
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label htmlFor="image" className="form-label">Image URL</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={dish.image}
                  onChange={handleChange}
                  className="form-input"
                />
                <p className="input-help">Provide a direct link to the dish image</p>
              </div>

              {/* Image Preview */}
              {dish.image && (
                <div className="image-preview">
                  <p className="preview-label">Image Preview:</p>
                  <div className="preview-container">
                    <img src={dish.image} alt="Preview" className="preview-image" />
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                className={`submit-button ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Adding Dish...
                  </>
                ) : (
                  <>
                    <span className="button-icon">+</span>
                    Add Dish to Menu
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .add-dish-container {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
        }

        .add-dish-content {
          margin-left: 240px;
          width: calc(100% - 240px);
          min-height: 100vh;
          transition: all 0.3s ease;
        }

        .add-dish-main {
          padding: 80px 30px 30px 30px;
          min-height: calc(100vh - 60px);
          margin-top: 60px;
        }

        .add-dish-card {
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          max-width: 800px;
          margin: 0 auto;
        }

        .add-dish-header {
          margin-bottom: 32px;
          text-align: center;
        }

        .add-dish-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .add-dish-subtitle {
          color: #718096;
          font-size: 1rem;
        }

        .add-dish-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
          font-size: 0.9rem;
        }

        .form-input, .form-select, .form-textarea {
          padding: 14px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #fafafa;
          font-family: inherit;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 16px center;
          background-repeat: no-repeat;
          background-size: 16px;
          padding-right: 40px;
        }

        .input-with-icon {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #718096;
          font-weight: 600;
          font-size: 1rem;
        }

        .input-with-icon .form-input {
          padding-left: 40px;
        }

        .input-help {
          font-size: 0.8rem;
          color: #718096;
          margin-top: 6px;
        }

        .image-preview {
          margin-top: 8px;
        }

        .preview-label {
          font-size: 0.9rem;
          color: #4a5568;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .preview-container {
          border: 2px dashed #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          background: #f7fafc;
        }

        .preview-image {
          max-width: 200px;
          max-height: 150px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .submit-button {
          padding: 16px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
        }

        .submit-button:hover:not(.loading) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .submit-button.loading {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .button-icon {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .add-dish-content {
            margin-left: 0;
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .add-dish-main {
            padding: 80px 20px 20px 20px;
          }

          .add-dish-card {
            padding: 24px;
          }

          .add-dish-title {
            font-size: 1.75rem;
          }

          .form-row {
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .add-dish-main {
            padding: 80px 16px 16px 16px;
          }

          .add-dish-card {
            padding: 20px;
          }

          .add-dish-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AddDish;