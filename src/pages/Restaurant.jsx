// src/pages/RestaurantPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { restaurants } from "../data/restaurantData/data";
import Cart from "../components/carts/cart";
import Comments from "../components/comment/comments";

const RestaurantPage = () => {
  const { id } = useParams();
  const restaurant = restaurants.find(r => r.id === parseInt(id));
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [deliveryTime, setDeliveryTime] = useState("30-40 min");
  const [minOrder, setMinOrder] = useState(500);
  const [deliveryFee, setDeliveryFee] = useState(100);

  useEffect(() => {
    if (restaurant) {
      setDeliveryFee(restaurant.deliveryFee || 100);
      setDeliveryTime(restaurant.deliveryTime || "30-40 min");
      setMinOrder(restaurant.minOrder || 500);
    }
  }, [restaurant]);

  if (!restaurant) {
    return (
      <div className="restaurant-not-found">
        <div className="error-container">
          <h2>Restaurant Not Found</h2>
          <p>The restaurant you're looking for doesn't exist.</p>
          <a href="/" className="back-home-btn">Return to Home</a>
        </div>
      </div>
    );
  }

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.name === item.name);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryCharge = deliveryOption === "delivery" ? deliveryFee : 0;
  const estimatedTotal = cartSubtotal + deliveryCharge;

  const handleDeliveryOptionChange = (option) => {
    setDeliveryOption(option);
    if (option === "pickup") {
      setDeliveryTime("20-30 min");
    } else {
      setDeliveryTime("30-40 min");
    }
  };

  // Image-style featured dishes data
  const featuredDishes = [
    {
      id: 1,
      title: "Chicken Fajitas",
      subtitle: "with Guacamole and Cheddar Cheese",
      price: 75,
      description: "Tender chicken strips with peppers and onions, served with guacamole and cheddar cheese.",
      fullDescription: "Marinated chicken breast, bell peppers, onions, guacamole, cheddar cheese, flour tortillas, sour cream, and salsa.",
      ingredients: ["Chicken Breast", "Bell Peppers", "Onions", "Guacamole", "Cheddar Cheese", "Flour Tortillas"],
      category: "Mexican",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
      popular: true
    },
    {
      id: 2,
      title: "Classic Chicken Salad",
      subtitle: "with Croutons and Parmesan",
      price: 99,
      description: "Fresh chicken salad with crispy croutons and shaved parmesan cheese.",
      fullDescription: "Grilled chicken breast, mixed greens, cherry tomatoes, cucumbers, croutons, parmesan cheese, and house dressing.",
      ingredients: ["Grilled Chicken", "Mixed Greens", "Cherry Tomatoes", "Cucumbers", "Croutons", "Parmesan"],
      category: "Salads",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      popular: true
    },
    {
      id: 3,
      title: "Veggie Lentil Ziti-Style",
      subtitle: "Pasta Bake with Roasted Veg",
      price: 89,
      description: "Hearty lentil pasta bake with roasted seasonal vegetables.",
      fullDescription: "Ziti pasta, green lentils, roasted bell peppers, zucchini, mushrooms, marinara sauce, and mozzarella cheese.",
      ingredients: ["Ziti Pasta", "Green Lentils", "Bell Peppers", "Zucchini", "Mushrooms", "Mozzarella"],
      category: "Vegetarian",
      image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop",
      popular: false
    },
    {
      id: 4,
      title: "Moroccan Lamb Tagine",
      subtitle: "with Eggplant and Raisins",
      price: 69,
      description: "Slow-cooked lamb tagine with eggplant, raisins, and Moroccan spices.",
      fullDescription: "Lamb shoulder, eggplant, raisins, apricots, chickpeas, Moroccan spices, served with couscous.",
      ingredients: ["Lamb Shoulder", "Eggplant", "Raisins", "Apricots", "Chickpeas", "Moroccan Spices"],
      category: "Middle Eastern",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
      popular: true
    },
    {
      id: 5,
      title: "Basket of Wedges",
      price: 35,
      originalPrice: 45,
      description: "Crispy potato wedges with extra crunch.",
      fullDescription: "Potatoes, Butter, Olive oil, Ground paprika, Lemon zest, Salt & Pepper for seasoning.",
      ingredients: ["Potatoes", "Butter", "Olive oil", "Paprika", "Lemon zest"],
      category: "Appetizers",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=250&fit=crop",
      popular: true
    }
  ];

  return (
    <div className="restaurant-page">

      {/* Top Navigation Bar - Image Style */}
      <nav className="top-navbar">
        <div className="nav-container">
          {/* Left Side Navigation */}
          <div className="nav-left">
            <div className="logo">
              <span className="logo-text">Wellfed</span>
            </div>
            <div className="nav-links">
              <Link to="/menu" className="nav-link">Our Menu</Link>
              <Link to="/story" className="nav-link">Our story</Link>
              <Link to="/how-it-works" className="nav-link">HowItWorks</Link>
              <Link to="/pages" className="nav-link">Pages</Link>
            </div>
          </div>

          {/* Right Side Navigation */}
          <div className="nav-right">
            <Link to="/our-menu" className="nav-link special-link">Our Menu</Link>
            <button 
              className="cart-icon-btn"
              onClick={() => setShowCart(true)}
            >
              <span className="cart-icon">🛒</span>
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Floating Button */}
      <button 
        className="cart-floating-btn"
        onClick={() => setShowCart(true)}
      >
        🛒 {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
        {cartSubtotal > 0 && <span className="cart-amount">Rs. {cartSubtotal}</span>}
      </button>

      {/* Hero Section */}
      <div className="restaurant-hero">
        <div className="hero-background">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="hero-image"
            loading="eager"
          />
          <div className="hero-overlay"></div>
        </div>
        
        {/* Hero Content */}
        <div className="hero-content">
          <div className="restaurant-info">
            <div className="restaurant-badge">
              {restaurant.category}
            </div>
            <h1 className="restaurant-title">{restaurant.name}</h1>
            <div className="restaurant-meta">
              <div className="rating-badge">
                <span className="rating-star">⭐</span>
                <span className="rating-value">{restaurant.rating}</span>
              </div>
              <span className="price-indicator">{restaurant.price}</span>
              <span className="location">📍 {restaurant.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="restaurant-container">

        {/* Order Summary Bar */}
        <div className="order-summary-bar">
          <div className="summary-items">
            <div className="summary-item">
              <span className="summary-label">Mode:</span>
              <span className="summary-value capitalize">{deliveryOption}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Time:</span>
              <span className="summary-value">{deliveryTime}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Fee:</span>
              <span className="summary-value">
                {deliveryOption === "delivery" ? `Rs. ${deliveryFee}` : "FREE"}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Min Order:</span>
              <span className="summary-value">Rs. {minOrder}</span>
            </div>
          </div>
          <button 
            className="checkout-btn"
            onClick={() => setShowCart(true)}
            disabled={cartSubtotal < minOrder}
          >
            {cartSubtotal < minOrder ? (
              `Add Rs. ${minOrder - cartSubtotal} more`
            ) : (
              <>
                Checkout · Rs. {estimatedTotal}
                <span className="checkout-arrow">→</span>
              </>
            )}
          </button>
        </div>

        {/* Featured Dishes Section - IMAGE STYLE */}
        <section className="featured-dishes-section">
          <div className="section-header">
            <h2 className="section-title">🔥 Featured Dishes</h2>
            <p className="section-subtitle">Our most popular items ordered right now</p>
          </div>

          <div className="dish-cards-container">
            {featuredDishes.map((dish) => (
              <div key={dish.id} className="dish-card">
                {/* Dish Image Container */}
                <div className="dish-image-container">
                  <img src={dish.image} alt={dish.title} className="dish-image" />
                  <div className="dish-overlay">
                    <div className="dish-price-badge">
                      ${dish.price}
                    </div>
                    {dish.popular && (
                      <div className="popular-tag">
                        🔥 Popular
                      </div>
                    )}
                  </div>
                </div>

                {/* Dish Content - Image Style */}
                <div className="dish-content-image-style">
                  {/* Title Section */}
                  <div className="dish-title-section">
                    <h3 className="dish-title-main">{dish.title}</h3>
                    {dish.subtitle && (
                      <p className="dish-subtitle">{dish.subtitle}</p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="dish-desc-image">{dish.description}</p>

                  {/* Order Button Section */}
                  <div className="dish-order-section">
                    <button 
                      className="order-now-btn-image"
                      onClick={() => addToCart({
                        name: dish.title,
                        price: dish.price,
                        category: dish.category
                      })}
                    >
                      Order now
                    </button>
                    <div className="price-display-image">
                      <span className="price-currency">$</span>
                      <span className="price-number">{dish.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="info-section">
          <div className="info-grid">
            <div className="info-card">
              <h3>📍 Location</h3>
              <p>{restaurant.location}</p>
            </div>

            <div className="info-card">
              <h3>💰 Price Range</h3>
              <p>{restaurant.price}</p>
            </div>

            <div className="info-card">
              <h3>🍽️ Category</h3>
              <p>{restaurant.category}</p>
            </div>

            <div className="info-card">
              <h3>⭐ Rating</h3>
              <p>{restaurant.rating} out of 5</p>
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="comments-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="comments-icon">💬</span>
              Customer Reviews
            </h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">See what our customers are saying about {restaurant.name}</p>
          </div>

          <Comments restaurantId={restaurant.id} />
        </section>
      </div>

      {/* Cart Component */}
      <Cart 
        cart={cart}
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        onUpdateCart={updateCart}
        deliveryOption={deliveryOption}
        deliveryTime={deliveryTime}
        deliveryFee={deliveryFee}
        minOrder={minOrder}
      />

      <style jsx>{`
        /* Global Restaurant Page Styles */
        .restaurant-page {
          position: relative;
          min-height: 100vh;
          background: #f8f9fa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        /* Top Navigation Bar - Image Style */
        .top-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          z-index: 1000;
          padding: 0 30px;
          height: 70px;
          display: flex;
          align-items: center;
        }

        .nav-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 50px;
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .logo-text {
          font-size: 1.8rem;
          font-weight: 900;
          color: #333;
          letter-spacing: -0.5px;
        }

        .nav-links {
          display: flex;
          gap: 35px;
        }

        .nav-link {
          text-decoration: none;
          color: #666;
          font-size: 1rem;
          font-weight: 500;
          transition: color 0.3s ease;
          position: relative;
          padding: 8px 0;
        }

        .nav-link:hover {
          color: #333;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #667eea;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .special-link {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white !important;
          padding: 10px 20px !important;
          border-radius: 8px;
          font-weight: 600 !important;
        }

        .special-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
        }

        .cart-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          position: relative;
          padding: 8px;
          border-radius: 50%;
          transition: background-color 0.3s ease;
        }

        .cart-icon-btn:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .cart-icon {
          font-size: 1.5rem;
        }

        .cart-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background: #ff4757;
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
        }

        /* Cart Floating Button */
        .cart-floating-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
          border: none;
          border-radius: 50%;
          color: white;
          font-size: 1.8rem;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          flex-direction: column;
          gap: 5px;
        }

        .cart-floating-btn:hover {
          transform: scale(1.15) rotate(10deg);
          box-shadow: 0 15px 40px rgba(255, 107, 107, 0.6);
        }

        .cart-count {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ff4757;
          color: white;
          font-size: 0.9rem;
          font-weight: 700;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          animation: pulse 2s infinite;
          font-family: monospace;
        }

        .cart-amount {
          position: absolute;
          bottom: -30px;
          background: #ff4757;
          color: white;
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 0.85rem;
          font-weight: 700;
          white-space: nowrap;
          border: 2px solid white;
        }

        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.7); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(255, 71, 87, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 71, 87, 0); }
        }

        /* Hero Section */
        .restaurant-hero {
          position: relative;
          height: 300px;
          overflow: hidden;
          border-radius: 0 0 30px 30px;
          margin-top: 70px; /* Offset for fixed navbar */
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.9);
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.3) 50%,
            transparent 100%
          );
        }

        .hero-content {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 30px;
          height: 100%;
          display: flex;
          align-items: flex-end;
          color: white;
        }

        .restaurant-info {
          width: 100%;
        }

        .restaurant-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.3);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }

        .restaurant-title {
          font-size: 2.8rem;
          font-weight: 800;
          margin-bottom: 15px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          line-height: 1.2;
        }

        .restaurant-meta {
          display: flex;
          gap: 15px;
          align-items: center;
          flex-wrap: wrap;
        }

        .rating-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #ff9800, #ff5722);
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);
        }

        .rating-star {
          font-size: 1.1rem;
        }

        .rating-value {
          font-size: 1rem;
        }

        .price-indicator {
          background: linear-gradient(135deg, #4CAF50, #2E7D32);
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        }

        .location {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(52, 58, 64, 0.9);
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }

        /* Main Container */
        .restaurant-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 30px 80px;
        }

        /* Order Summary Bar */
        .order-summary-bar {
          background: white;
          border-radius: 15px;
          padding: 20px;
          margin-bottom: 40px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          border: 1px solid #e1e5e9;
        }

        .summary-items {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 100px;
        }

        .summary-label {
          font-size: 0.85rem;
          color: #7f8c8d;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .summary-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: #2c3e50;
        }

        .summary-value.capitalize {
          text-transform: capitalize;
        }

        .checkout-btn {
          padding: 14px 35px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
          white-space: nowrap;
        }

        .checkout-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .checkout-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          background: linear-gradient(135deg, #95a5a6, #7f8c8d);
        }

        .checkout-arrow {
          font-size: 1.1rem;
          transition: transform 0.3s ease;
        }

        .checkout-btn:hover:not(:disabled) .checkout-arrow {
          transform: translateX(5px);
        }

        /* Featured Dishes Section - IMAGE STYLE */
        .featured-dishes-section {
          margin-bottom: 80px;
        }

        .section-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .section-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .section-subtitle {
          color: #666;
          font-size: 1.1rem;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 400;
        }

        .dish-cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 25px;
        }

        /* Dish Card - IMAGE STYLE */
        .dish-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid #eaeaea;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .dish-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
        }

        .dish-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .dish-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .dish-card:hover .dish-image {
          transform: scale(1.05);
        }

        .dish-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 15px;
        }

        .dish-price-badge {
          background: rgba(255, 255, 255, 0.95);
          color: #333;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 1.2rem;
          font-weight: 800;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .popular-tag {
          background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
          color: white;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
        }

        /* Dish Content - IMAGE STYLE */
        .dish-content-image-style {
          padding: 25px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .dish-title-section {
          margin-bottom: 15px;
        }

        .dish-title-main {
          font-size: 1.6rem;
          font-weight: 800;
          color: #2d3436;
          margin: 0 0 8px 0;
          line-height: 1.2;
        }

        .dish-subtitle {
          color: #666;
          font-size: 1rem;
          margin: 0;
          font-weight: 500;
          line-height: 1.4;
        }

        .dish-desc-image {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 20px;
          flex-grow: 1;
          font-weight: 400;
        }

        /* Order Button Section - IMAGE STYLE */
        .dish-order-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 15px;
          border-top: 1px solid #eaeaea;
        }

        .order-now-btn-image {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .order-now-btn-image:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .price-display-image {
          display: flex;
          align-items: baseline;
          gap: 2px;
        }

        .price-currency {
          font-size: 1rem;
          font-weight: 700;
          color: #2d3436;
        }

        .price-number {
          font-size: 2.2rem;
          font-weight: 900;
          color: #2d3436;
          line-height: 1;
        }

        /* Info Section */
        .info-section {
          margin-bottom: 80px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
        }

        .info-card {
          background: white;
          padding: 30px 25px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid #e1e5e9;
        }

        .info-card h3 {
          font-size: 1.3rem;
          font-weight: 700;
          color: #2d3436;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .info-card p {
          color: #495057;
          font-size: 1.1rem;
          line-height: 1.6;
          font-weight: 500;
        }

        /* Comments Section */
        .comments-section {
          background: white;
          border-radius: 25px;
          padding: 40px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid #e1e5e9;
        }

        .comments-icon {
          font-size: 2.2rem;
        }

        .section-divider {
          height: 4px;
          width: 100px;
          background: linear-gradient(90deg, #ff6b6b, #667eea);
          border-radius: 2px;
          margin: 15px auto 20px;
        }

        /* Error Page */
        .restaurant-not-found {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 30px;
        }

        .error-container {
          text-align: center;
          max-width: 600px;
          padding: 60px 40px;
          background: white;
          border-radius: 30px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
        }

        .error-container h2 {
          font-size: 3rem;
          color: #2d3436;
          margin-bottom: 20px;
        }

        .error-container p {
          color: #666;
          font-size: 1.2rem;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .back-home-btn {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          padding: 15px 35px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .back-home-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 992px) {
          .restaurant-container {
            padding: 0 25px 60px;
          }
          
          .dish-cards-container {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .section-title {
            font-size: 2rem;
          }
        }

        @media (max-width: 768px) {
          .top-navbar {
            padding: 0 20px;
            height: 60px;
          }
          
          .nav-left {
            gap: 20px;
          }
          
          .nav-links {
            gap: 15px;
          }
          
          .nav-link {
            font-size: 0.9rem;
          }
          
          .special-link {
            padding: 8px 15px !important;
            font-size: 0.9rem !important;
          }
          
          .restaurant-hero {
            height: 250px;
            margin-top: 60px;
          }
          
          .hero-content {
            padding: 30px 25px;
          }
          
          .restaurant-title {
            font-size: 2.2rem;
          }
          
          .dish-cards-container {
            grid-template-columns: 1fr;
          }
          
          .dish-title-main {
            font-size: 1.4rem;
          }
          
          .dish-subtitle {
            font-size: 0.95rem;
          }
          
          .price-number {
            font-size: 1.8rem;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .comments-section {
            padding: 30px 25px;
          }
        }

        @media (max-width: 576px) {
          .restaurant-container {
            padding: 0 20px 50px;
          }
          
          .nav-links {
            display: none;
          }
          
          .nav-right .special-link {
            display: none;
          }
          
          .dish-order-section {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }
          
          .price-display-image {
            justify-content: center;
          }
          
          .info-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
          .restaurant-page {
            background: #121212;
          }
          
          .top-navbar {
            background: rgba(30, 30, 30, 0.95);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .logo-text {
            color: #ffffff;
          }
          
          .nav-link {
            color: #b0b0b0;
          }
          
          .nav-link:hover {
            color: #ffffff;
          }
          
          .cart-icon-btn:hover {
            background: rgba(255, 255, 255, 0.1);
          }
          
          .dish-card,
          .info-card,
          .comments-section,
          .order-summary-bar {
            background: #1e1e1e;
            border-color: #333;
          }
          
          .dish-title-main,
          .price-number,
          .price-currency,
          .info-card h3,
          .section-title,
          .summary-value {
            color: #ffffff;
          }
          
          .dish-subtitle,
          .dish-desc-image,
          .dish-category,
          .section-subtitle,
          .info-card p {
            color: #b0b0b0;
          }
          
          .dish-order-section {
            border-top-color: #333;
          }
          
          .dish-card:hover {
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
          }
        }
      `}</style>
    </div>
  );
};

export default RestaurantPage;