import React, { useState } from "react";
import { FaTag, FaFire, FaMapMarkerAlt, FaHeart, FaShoppingCart } from "react-icons/fa";

const Recommend = () => {
  const recommended = [
    { 
      id: 1, 
      name: "Pizza Max", 
      category: "Pizza", 
      image: "https://tb-static.uber.com/prod/image-proc/processed_images/12be4272468c2a703ba312e9ed0a6e08/c9252e6c6cd289c588c3381bc77b1dfc.jpeg",
      distance: "1.2 mi",
      promotion: "20% off",
      isTrending: true,
      isFavorite: true
    },
    { 
      id: 2, 
      name: "Hardee's", 
      category: "Fast Food", 
      image: "https://edibleorigins.com/wp-content/uploads/2025/09/Hardees-Menu-and-Sign-Main.webp",
      distance: "2.5 mi",
      promotion: "Free delivery",
      isTrending: false,
      isFavorite: false
    },
    { 
      id: 3, 
      name: "Chai Wala", 
      category: "Tea & Coffee", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF2MZZneHvucXtpBi0jTAVBhCGFK3T7_7_vw&s",
      distance: "0.8 mi",
      promotion: "Buy 1 get 1 free",
      isTrending: true,
      isFavorite: true
    },
    { 
      id: 4, 
      name: "Sushi Zen", 
      category: "Japanese", 
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      distance: "3.2 mi",
      promotion: "New",
      isTrending: true,
      isFavorite: false
    },
    { 
      id: 5, 
      name: "Burger Palace", 
      category: "Burgers", 
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      distance: "1.5 mi",
      promotion: null,
      isTrending: false,
      isFavorite: true
    },
    { 
      id: 6, 
      name: "Green Leaf", 
      category: "Healthy", 
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      distance: "2.0 mi",
      promotion: "Vegetarian",
      isTrending: false,
      isFavorite: false
    },
  ];

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{
      padding: "40px 20px",
      maxWidth: "1200px",
      margin: "0 auto",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
      }}>
        <div>
          <h2 style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#111827",
            margin: 0,
            marginBottom: "8px"
          }}>
            Recommended For You
          </h2>
          <p style={{
            fontSize: "16px",
            color: "#6B7280",
            margin: 0,
            maxWidth: "600px"
          }}>
            Curated selections based on your taste preferences
          </p>
        </div>
        
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}>
          <button style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#4B5563",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "6px",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#F3F4F6";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}>
            Filter
          </button>
          
          <button style={{
            backgroundColor: "transparent",
            border: "1px solid #D1D5DB",
            color: "#4B5563",
            padding: "8px 20px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#F9FAFB";
            e.target.style.borderColor = "#9CA3AF";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.borderColor = "#D1D5DB";
          }}>
            View all
            <span style={{ fontSize: '12px' }}>→</span>
          </button>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "25px"
      }}>
        {recommended.map((item) => (
          <div 
            key={item.id} 
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 25px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
              position: "relative"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08), 0 15px 30px rgba(0, 0, 0, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 25px rgba(0, 0, 0, 0.05)";
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
            >
              <FaHeart 
                style={{ 
                  fontSize: "18px", 
                  color: item.isFavorite ? "#EF4444" : "#9CA3AF" 
                }} 
              />
            </button>
            
            {/* Promotion badge */}
            {item.promotion && (
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
                {item.promotion}
              </div>
            )}
            
            {/* Trending badge */}
            {item.isTrending && (
              <div style={{
                position: "absolute",
                top: item.promotion ? "50px" : "12px",
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
            
            {/* Image container */}
            <div style={{ 
              position: "relative", 
              height: "200px", 
              overflow: "hidden",
              backgroundColor: "#F9FAFB"
            }}>
              <img 
                src={item.image} 
                alt={item.name} 
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
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
              position: "relative"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#111827",
                margin: 0,
                marginBottom: "8px",
                lineHeight: "1.3"
              }}>
                {item.name}
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
                  {item.category}
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
                  {item.distance}
                </div>
              </div>
              
              {/* Action buttons */}
              <div style={{
                display: "flex",
                gap: "12px"
              }}>
                <button 
                  id={`order-btn-${item.id}`}
                  style={{
                    flex: 1,
                    backgroundColor: "#FF6B35", // New orange color
                    border: "none",
                    color: "white",
                    padding: "12px",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 4px 12px rgba(255, 107, 53, 0.3)"
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.target;
                    btn.style.backgroundColor = "#FF5722"; // Darker orange on hover
                    btn.style.transform = "translateY(-2px)";
                    btn.style.boxShadow = "0 6px 20px rgba(255, 107, 53, 0.4)";
                    
                    // Vibration effect
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
                  onClick={() => {
                    // Add click effect
                    const btn = document.getElementById(`order-btn-${item.id}`);
                    if (btn) {
                      btn.style.transform = "scale(0.95)";
                      setTimeout(() => {
                        btn.style.transform = "scale(1)";
                      }, 150);
                    }
                    alert(`Order placed for ${item.name}!`);
                  }}
                >
                  <FaShoppingCart className="cart-icon" style={{ 
                    fontSize: "16px", 
                    transition: "transform 0.3s ease" 
                  }} />
                  Order Now
                </button>
                
                <button style={{
                  backgroundColor: "#F3F4F6",
                  border: "none",
                  color: "#374151",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  minWidth: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#E5E7EB";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#F3F4F6";
                }}>
                  ...
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Category Tabs */}
      <div style={{
        marginTop: "50px",
        marginBottom: "30px"
      }}>
        <h3 style={{
          fontSize: "20px",
          fontWeight: "600",
          color: "#111827",
          marginBottom: "20px"
        }}>
          Explore Categories
        </h3>
        
        <div style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap"
        }}>
          {["All", "Pizza", "Fast Food", "Asian", "Healthy", "Desserts", "Coffee", "Burgers"].map((category, index) => (
            <button 
              key={index}
              style={{
                backgroundColor: index === 0 ? "#111827" : "#F3F4F6",
                border: "none",
                color: index === 0 ? "white" : "#374151",
                padding: "10px 20px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                if (index !== 0) {
                  e.target.style.backgroundColor = "#E5E7EB";
                }
              }}
              onMouseLeave={(e) => {
                if (index !== 0) {
                  e.target.style.backgroundColor = "#F3F4F6";
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

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
          
          @keyframes pulse {
            0% { box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3); }
            50% { box-shadow: 0 4px 20px rgba(255, 107, 53, 0.6); }
            100% { box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3); }
          }
        `}
      </style>
    </div>
  );
};

export default Recommend;