import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "../Rating/RatingStars";
import { FaHeart, FaTag, FaMapMarkerAlt, FaFire, FaShoppingCart, FaStar } from "react-icons/fa";

const RestaurantCard = ({ restaurant, showOffer = false }) => {
  // Default data for demonstration
  const restaurantData = restaurant || {
    id: 1,
    name: "Butt Karahi",
    category: "Pakistani",
    rating: 4.7,
    price: "$$",
    image: "https://homefoodies.pk/wp-content/uploads/2022/10/80370186_171580787575757_5971652309938077696_n.jpg",
    distance: "1.2 mi",
    description: "Famous for spicy karahi & BBQ",
    promotion: "20% off",
    isTrending: true,
    isFavorite: true,
    showOffer: false,
    offerText: "Buy 1 Get 1 Free",
    deliveryTime: "25-35 min"
  };

  const [isHovered, setIsHovered] = React.useState(false);
  const [isImageHovered, setIsImageHovered] = React.useState(false);

  // Handle order button click
  const handleOrderClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // Add click effect
    const btn = e.target;
    btn.style.transform = "scale(0.95)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 150);
    alert(`Order placed for ${restaurantData.name}!`);
  };

  // Handle favorite button click
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`Toggled favorite status for ${restaurantData.name}!`);
  };

  return (
    <div 
      style={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 25px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        position: "relative",
        width: "280px",
        minHeight: "420px",
        display: "flex",
        flexDirection: "column"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Link wrapper for navigation */}
      <Link
        to={`/restaurant/${restaurantData.id}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Favorite button */}
        <button 
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "none",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 2,
            transition: "all 0.2s ease",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 1)";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
            e.target.style.transform = "scale(1)";
          }}
          onClick={handleFavoriteClick}
        >
          <FaHeart 
            style={{ 
              fontSize: "18px", 
              color: restaurantData.isFavorite ? "#EF4444" : "#9CA3AF" 
            }} 
          />
        </button>
        
        {/* Promotion badge */}
        {restaurantData.promotion && (
          <div style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            backgroundColor: "#10B981",
            color: "white",
            fontSize: "12px",
            fontWeight: "600",
            padding: "5px 12px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            zIndex: 2,
            boxShadow: "0 2px 6px rgba(16, 185, 129, 0.3)"
          }}>
            <FaTag style={{ fontSize: "10px" }} />
            {restaurantData.promotion}
          </div>
        )}
        
        {/* Trending badge */}
        {restaurantData.isTrending && (
          <div style={{
            position: "absolute",
            top: restaurantData.promotion ? "50px" : "12px",
            left: "12px",
            backgroundColor: "#EF4444",
            color: "white",
            fontSize: "12px",
            fontWeight: "600",
            padding: "5px 12px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            zIndex: 2,
            boxShadow: "0 2px 6px rgba(239, 68, 68, 0.3)"
          }}>
            <FaFire style={{ fontSize: "10px" }} />
            Trending
          </div>
        )}

        {/* Offer Badge */}
        {(restaurantData.showOffer || showOffer) && (
          <div style={{
            position: "absolute",
            top: restaurantData.isTrending ? "78px" : (restaurantData.promotion ? "50px" : "12px"),
            left: "12px",
            backgroundColor: "#667eea",
            color: "white",
            fontSize: "12px",
            fontWeight: "600",
            padding: "5px 12px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            zIndex: 2,
            boxShadow: "0 2px 6px rgba(102, 126, 234, 0.3)"
          }}>
            <FaStar style={{ fontSize: "10px" }} />
            {restaurantData.offerText || "Buy 1 Get 1 Free"}
          </div>
        )}
        
        {/* Image container */}
        <div style={{ 
          position: "relative", 
          height: "200px", 
          overflow: "hidden",
          backgroundColor: "#F9FAFB"
        }}
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}>
          <img 
            src={restaurantData.image} 
            alt={restaurantData.name} 
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s ease",
              transform: isImageHovered ? "scale(1.08)" : "scale(1)"
            }}
          />
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60px",
            background: "linear-gradient(transparent, rgba(0,0,0,0.15))"
          }} />
        </div>
        
        {/* Content */}
        <div style={{ 
          padding: "20px",
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}>
          <h3 style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#111827",
            margin: 0,
            marginBottom: "8px",
            lineHeight: "1.3"
          }}>
            {restaurantData.name}
          </h3>
          
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px"
          }}>
            <p style={{
              color: "#6B7280",
              fontSize: "15px",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}>
              <span style={{ 
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#10B981"
              }}></span>
              {restaurantData.category}
            </p>
            
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#6B7280",
              fontSize: "14px",
              fontWeight: "500"
            }}>
              <FaMapMarkerAlt style={{ fontSize: "13px", color: "#9CA3AF" }} />
              {restaurantData.distance}
            </div>
          </div>
          
          <p style={{
            color: "#4B5563",
            fontSize: "14px",
            margin: 0,
            marginBottom: "20px",
            lineHeight: "1.5",
            flex: 1
          }}>
            {restaurantData.description}
          </p>
          
          {/* Rating, Price and Delivery time row */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "16px",
            borderTop: "1px solid #F3F4F6"
          }}>
            {/* Left side - Rating */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <RatingStars rating={restaurantData.rating} />
              <span style={{
                fontSize: "14px",
                color: "#4B5563",
                fontWeight: "600"
              }}>
                {restaurantData.rating.toFixed(1)}
              </span>
            </div>
            
            {/* Middle - Delivery time */}
            <span style={{
              fontSize: "14px",
              color: "#111827",
              fontWeight: "500"
            }}>
              ⏱️ {restaurantData.deliveryTime}
            </span>
            
            {/* Right side - Price */}
            <div style={{
              fontSize: "16px",
              color: "#FF6B35",
              fontWeight: "700",
              backgroundColor: "#FFF7ED",
              padding: "6px 12px",
              borderRadius: "14px"
            }}>
              {restaurantData.price}
            </div>
          </div>
        </div>
      </Link>

      {/* Order Now Button */}
      <button 
        id={`restaurant-btn-${restaurantData.id}`}
        style={{
          backgroundColor: "#FF6B35",
          border: "none",
          color: "white",
          padding: "14px 20px",
          borderRadius: "0 0 16px 16px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          boxShadow: "0 4px 12px rgba(255, 107, 53, 0.3)",
          marginTop: "auto"
        }}
        onMouseEnter={(e) => {
          const btn = e.target;
          btn.style.backgroundColor = "#FF5722";
          btn.style.transform = "translateY(-2px)";
          btn.style.boxShadow = "0 6px 20px rgba(255, 107, 53, 0.4)";
          btn.style.animation = "vibrate 0.3s linear infinite";
          
          // Add shopping cart icon animation
          const icon = btn.querySelector('.cart-icon');
          if (icon) {
            icon.style.transform = "translateX(3px)";
          }
        }}
        onMouseLeave={(e) => {
          const btn = e.target;
          btn.style.backgroundColor = "#FF6B35";
          btn.style.transform = "translateY(0)";
          btn.style.boxShadow = "0 4px 12px rgba(255, 107, 53, 0.3)";
          btn.style.animation = "none";
          
          // Reset shopping cart icon
          const icon = btn.querySelector('.cart-icon');
          if (icon) {
            icon.style.transform = "translateX(0)";
          }
        }}
        onClick={handleOrderClick}
      >
        <FaShoppingCart className="cart-icon" style={{ 
          fontSize: "16px", 
          transition: "transform 0.3s ease" 
        }} />
        Order Now
      </button>

      {/* Vibration animation CSS */}
      <style>
        {`
          @keyframes vibrate {
            0% { transform: translateY(-2px) rotate(0deg); }
            20% { transform: translateY(-2px) rotate(0.5deg); }
            40% { transform: translateY(-2px) rotate(-0.5deg); }
            60% { transform: translateY(-2px) rotate(0.5deg); }
            80% { transform: translateY(-2px) rotate(-0.5deg); }
            100% { transform: translateY(-2px) rotate(0deg); }
          }
        `}
      </style>
    </div>
  );
};

RestaurantCard.defaultProps = {
  restaurant: null,
  showOffer: false,
};

export default RestaurantCard;