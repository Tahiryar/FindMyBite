// src/pages/MenuPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);

  // Menu categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'meal-plan', name: 'Meal Plan' },
    { id: 'lunch', name: 'Lunch' },
    { id: 'dinner', name: 'Dinner' },
    { id: 'juice', name: 'Juice' },
    { id: 'breakfast', name: 'Breakfast' }
  ];

  // Dummy menu data
  const menuItems = [
    {
      id: 1,
      name: 'Mediterranean Power Bowl',
      description: 'Quinoa, roasted chickpeas, cherry tomatoes, cucumber, feta cheese, olives, and tzatziki sauce',
      price: 1299,
      category: 'lunch',
      rating: 4.8,
      prepTime: '15-20 min',
      calories: '420 cal',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
      popular: true
    },
    {
      id: 2,
      name: 'Truffle Mushroom Risotto',
      description: 'Arborio rice cooked with wild mushrooms, truffle oil, parmesan, and fresh herbs',
      price: 1599,
      category: 'dinner',
      rating: 4.9,
      prepTime: '25-30 min',
      calories: '520 cal',
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop',
      popular: true
    },
    {
      id: 3,
      name: 'Protein Power Smoothie',
      description: 'Vanilla protein, banana, spinach, almond milk, chia seeds, and honey',
      price: 699,
      category: 'juice',
      rating: 4.7,
      prepTime: '5 min',
      calories: '280 cal',
      image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&h=400&fit=crop',
      popular: true
    },
    {
      id: 4,
      name: 'Avocado Toast Deluxe',
      description: 'Sourdough bread, smashed avocado, poached eggs, cherry tomatoes, and microgreens',
      price: 899,
      category: 'breakfast',
      rating: 4.6,
      prepTime: '10-15 min',
      calories: '380 cal',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop',
      popular: true
    },
    {
      id: 5,
      name: 'Weekly Wellness Plan',
      description: '7-day balanced meal plan with breakfast, lunch, dinner, and snacks',
      price: 7999,
      category: 'meal-plan',
      rating: 4.9,
      prepTime: 'Custom',
      calories: 'Custom',
      image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&h=400&fit=crop',
      popular: true
    },
    {
      id: 6,
      name: 'Grilled Salmon Platter',
      description: 'Atlantic salmon with lemon herb butter, roasted asparagus, and quinoa pilaf',
      price: 1799,
      category: 'dinner',
      rating: 4.8,
      prepTime: '20-25 min',
      calories: '480 cal',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop'
    },
    {
      id: 7,
      name: 'Green Detox Juice',
      description: 'Kale, cucumber, green apple, celery, lemon, and ginger',
      price: 549,
      category: 'juice',
      rating: 4.5,
      prepTime: '5 min',
      calories: '120 cal',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop'
    },
    {
      id: 8,
      name: 'Berry French Toast',
      description: 'Brioche French toast with mixed berries, maple syrup, and whipped cream',
      price: 1099,
      category: 'breakfast',
      rating: 4.7,
      prepTime: '15-20 min',
      calories: '450 cal',
      image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&h=400&fit=crop'
    }
  ];

  // Filter menu items
  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="menu-page">
      {/* Navigation Bar */}
      <nav className="top-navbar">
        <div className="nav-container">
          <div className="nav-left">
            <div className="logo">
              <Link to="/" className="logo-text">Wellfed</Link>
            </div>
            <div className="nav-links">
              <Link to="/menu" className="nav-link active">Our Menu</Link>
              <Link to="/story" className="nav-link">Our story</Link>
              <Link to="/how-it-works" className="nav-link">HowItWorks</Link>
              <Link to="/pages" className="nav-link">Pages</Link>
            </div>
          </div>

          <div className="nav-right">
            <Link to="/menu" className="nav-link special-link">Our Menu</Link>
            <Link to="/cart" className="cart-icon-btn">
              <span className="cart-icon">🛒</span>
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="menu-hero">
        <div className="hero-content">
          <h1 className="hero-title">Our menu</h1>
          <p className="hero-subtitle">
            Our chefs have designed a variety of nutritious, gourmet dishes for you to relish.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="menu-container">
        {/* Categories Filter */}
        <div className="categories-section">
          <div className="section-header">
            <h2 className="section-title">Shop by category</h2>
            <div className="category-tags">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-tag ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="menu-grid-section">
          <div className="menu-items-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="menu-item-card">
                {/* Item Image */}
                <div className="menu-item-image">
                  <img src={item.image} alt={item.name} />
                  {item.popular && (
                    <div className="popular-badge">
                      <span className="fire-icon">🔥</span>
                      Popular
                    </div>
                  )}
                  <div className="rating-badge">
                    <span className="star-icon">⭐</span>
                    <span className="rating-value">{item.rating}</span>
                  </div>
                </div>

                {/* Item Content */}
                <div className="menu-item-content">
                  {/* Header with category */}
                  <div className="item-header">
                    <span className="item-category">{item.category.toUpperCase()}</span>
                    <span className="prep-time">⏱️ {item.prepTime}</span>
                  </div>

                  {/* Item Name */}
                  <h3 className="item-name">{item.name}</h3>

                  {/* Description */}
                  <p className="item-description">{item.description}</p>

                  {/* Nutrition Info */}
                  <div className="nutrition-info">
                    <span className="calories">🔥 {item.calories}</span>
                    {item.category !== 'meal-plan' && (
                      <span className="serving">🍽️ Serves 1</span>
                    )}
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="item-footer">
                    <div className="price-section">
                      <span className="price">₹{item.price.toLocaleString()}</span>
                      {item.category === 'meal-plan' && (
                        <span className="price-note">/week</span>
                      )}
                    </div>
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3 className="feature-title">Free Delivery</h3>
            <p className="feature-desc">On orders above ₹999</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3 className="feature-title">30-Min Delivery</h3>
            <p className="feature-desc">Fresh meals delivered fast</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🥗</div>
            <h3 className="feature-title">Fresh Ingredients</h3>
            <p className="feature-desc">Locally sourced daily</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍🍳</div>
            <h3 className="feature-title">Chef Prepared</h3>
            <p className="feature-desc">By professional chefs</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="menu-footer">
        <div className="footer-content">
          <div className="footer-logo">Wellfed</div>
          <p className="footer-slogan">Nutritious meals, delivered with love.</p>
          <div className="footer-links">
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <Link to="/contact" className="footer-link">Contact Us</Link>
            <Link to="/faq" className="footer-link">FAQ</Link>
          </div>
          <p className="copyright">© 2024 Wellfed. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        /* Global Styles */
        .menu-page {
          min-height: 100vh;
          background: #f8f9fa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        /* Navigation Bar */
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
          text-decoration: none;
        }

        .logo-text:hover {
          color: #667eea;
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

        .nav-link.active {
          color: #333;
          font-weight: 600;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: #667eea;
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
          text-decoration: none;
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
          text-decoration: none;
          color: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
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

        /* Hero Section */
        .menu-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 120px 30px 80px;
          text-align: center;
          color: white;
          margin-top: 70px;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 20px;
          letter-spacing: -1px;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Main Container */
        .menu-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 30px 80px;
        }

        /* Categories Section */
        .categories-section {
          margin: 60px 0 40px;
        }

        .section-header {
          text-align: center;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3436;
          margin-bottom: 30px;
        }

        .category-tags {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .category-tag {
          padding: 12px 24px;
          background: white;
          border: 2px solid #e1e5e9;
          border-radius: 30px;
          color: #666;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-tag:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .category-tag.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: #667eea;
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
        }

        /* Menu Grid Section */
        .menu-grid-section {
          margin-bottom: 80px;
        }

        .menu-items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }

        /* Menu Item Card */
        .menu-item-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid #e1e5e9;
        }

        .menu-item-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .menu-item-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .menu-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .menu-item-card:hover .menu-item-image img {
          transform: scale(1.05);
        }

        .popular-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
          color: white;
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 5px;
          z-index: 2;
        }

        .fire-icon {
          font-size: 1rem;
        }

        .rating-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.95);
          padding: 8px 15px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 700;
          z-index: 2;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .star-icon {
          color: #ffc107;
        }

        .rating-value {
          color: #2d3436;
        }

        /* Menu Item Content */
        .menu-item-content {
          padding: 25px;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .item-category {
          background: #e9ecef;
          color: #495057;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .prep-time {
          color: #666;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .item-name {
          font-size: 1.6rem;
          font-weight: 800;
          color: #2d3436;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .item-description {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 20px;
          font-weight: 400;
        }

        .nutrition-info {
          display: flex;
          gap: 15px;
          margin-bottom: 25px;
          font-size: 0.9rem;
          color: #666;
          font-weight: 500;
        }

        .item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price-section {
          display: flex;
          align-items: baseline;
          gap: 5px;
        }

        .price {
          font-size: 1.8rem;
          font-weight: 900;
          color: #2d3436;
        }

        .price-note {
          font-size: 0.9rem;
          color: #666;
          font-weight: 500;
        }

        .add-to-cart-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
        }

        .add-to-cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
        }

        /* Features Section */
        .features-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .feature-card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          border: 1px solid #e1e5e9;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        .feature-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #2d3436;
          margin-bottom: 10px;
        }

        .feature-desc {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        /* Footer */
        .menu-footer {
          background: #2d3436;
          color: white;
          padding: 60px 30px 40px;
          text-align: center;
        }

        .footer-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .footer-logo {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 20px;
          letter-spacing: -1px;
        }

        .footer-slogan {
          font-size: 1.1rem;
          opacity: 0.8;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 30px;
          margin-bottom: 30px;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: white;
        }

        .copyright {
          font-size: 0.9rem;
          opacity: 0.6;
          margin-top: 20px;
        }

        /* Responsive Design */
        @media (max-width: 992px) {
          .menu-container {
            padding: 0 25px 60px;
          }
          
          .menu-items-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .hero-title {
            font-size: 3rem;
          }
          
          .features-section {
            grid-template-columns: repeat(2, 1fr);
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
          
          .menu-hero {
            padding: 100px 20px 60px;
            margin-top: 60px;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .menu-items-grid {
            grid-template-columns: 1fr;
          }
          
          .item-name {
            font-size: 1.4rem;
          }
          
          .features-section {
            grid-template-columns: 1fr;
          }
          
          .footer-links {
            gap: 20px;
          }
        }

        @media (max-width: 576px) {
          .menu-container {
            padding: 0 20px 50px;
          }
          
          .nav-links {
            display: none;
          }
          
          .nav-right .special-link {
            display: none;
          }
          
          .category-tags {
            gap: 10px;
          }
          
          .category-tag {
            padding: 10px 20px;
            font-size: 0.9rem;
          }
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
          .menu-page {
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
          
          .nav-link:hover,
          .nav-link.active {
            color: #ffffff;
          }
          
          .cart-icon-btn:hover {
            background: rgba(255, 255, 255, 0.1);
          }
          
          .menu-item-card,
          .feature-card {
            background: #1e1e1e;
            border-color: #333;
          }
          
          .category-tag {
            background: #1e1e1e;
            border-color: #444;
            color: #b0b0b0;
          }
          
          .category-tag.active {
            color: white;
          }
          
          .category-tag:hover {
            border-color: #667eea;
            color: #667eea;
          }
          
          .item-name,
          .price,
          .feature-title {
            color: #ffffff;
          }
          
          .item-description,
          .feature-desc,
          .item-description,
          .prep-time,
          .nutrition-info {
            color: #b0b0b0;
          }
          
          .rating-badge {
            background: #2d2d2d;
          }
          
          .rating-value {
            color: #ffffff;
          }
          
          .item-category {
            background: #2d2d2d;
            color: #b0b0b0;
          }
          
          .menu-footer {
            background: #1a1a1a;
          }
        }
      `}</style>
    </div>
  );
};

export default MenuPage;