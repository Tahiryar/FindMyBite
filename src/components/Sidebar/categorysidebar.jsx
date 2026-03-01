import React, { useState, useEffect } from "react";

const CategorySidebar = ({ selectedCategories = [], setSelectedCategories }) => {
  const categories = [
    "American", "BBQ", "Beverages", "Biryani", "Broast", 
    "Burgers", "Cakes & Bakery", "Chinese", "Continental"
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredCategories = categories.filter(cat =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryToggle = (category) => {
    if (!setSelectedCategories) return;
    
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isSidebarOpen) {
        const sidebar = document.querySelector('.category-sidebar');
        if (sidebar && !sidebar.contains(event.target)) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isSidebarOpen]);

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 999,
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)'
          }}
        >
          <span>☰</span>
          Categories
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000
        }} />
      )}

      <div className={`category-sidebar ${isMobile && !isSidebarOpen ? 'mobile-hidden' : ''}`}
        style={{
          width: isMobile ? '280px' : '280px',
          background: '#ffffff',
          borderRight: isMobile ? 'none' : '1px solid #e8ecef',
          height: isMobile ? '100vh' : '100vh',
          position: isMobile ? 'fixed' : 'sticky',
          top: 0,
          left: 0,
          zIndex: 1001,
          overflowY: 'auto',
          boxShadow: isMobile ? '2px 0 20px rgba(0, 0, 0, 0.15)' : '2px 0 15px rgba(0, 0, 0, 0.05)',
          transform: isMobile && !isSidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 0.3s ease'
        }}
      >
        <div style={{
          padding: '24px 20px 16px',
          borderBottom: '1px solid #e8ecef',
          position: 'sticky',
          top: 0,
          background: '#ffffff',
          zIndex: 2
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#2c3e50',
              margin: 0
            }}>
              Categories
            </h3>
            {isMobile && (
              <button
                onClick={() => setIsSidebarOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f5f5f5';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div style={{
          position: 'relative',
          padding: '20px',
          borderBottom: '1px solid #e8ecef',
          background: '#ffffff',
          position: 'sticky',
          top: '65px',
          zIndex: 2
        }}>
          <input
            type="text"
            placeholder="Search for cuisine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 40px',
              border: '2px solid #e8ecef',
              borderRadius: '12px',
              fontSize: '14px',
              background: '#f8f9fa',
              transition: 'all 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.outline = 'none';
              e.target.style.borderColor = '#e74c3c';
              e.target.style.background = '#ffffff';
              e.target.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e8ecef';
              e.target.style.background = '#f8f9fa';
              e.target.style.boxShadow = 'none';
            }}
          />
          <span style={{
            position: 'absolute',
            left: '32px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#666'
          }}>
            🔍
          </span>
        </div>

        <div style={{
          padding: '16px 0',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {filteredCategories.map((category) => (
            <label
              key={category}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                borderLeft: '3px solid transparent',
                backgroundColor: selectedCategories.includes(category) ? 
                  'linear-gradient(90deg, rgba(231, 76, 60, 0.1), transparent)' : 'transparent',
                background: selectedCategories.includes(category) ? 
                  'linear-gradient(90deg, rgba(231, 76, 60, 0.1), rgba(231, 76, 60, 0.05))' : 'transparent',
                borderLeftColor: selectedCategories.includes(category) ? '#e74c3c' : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (!selectedCategories.includes(category)) {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                  e.currentTarget.style.borderLeftColor = '#e74c3c';
                }
              }}
              onMouseLeave={(e) => {
                if (!selectedCategories.includes(category)) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderLeftColor = 'transparent';
                }
              }}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                style={{
                  position: 'absolute',
                  opacity: 0,
                  cursor: 'pointer'
                }}
              />
              <span style={{
                width: '20px',
                height: '20px',
                border: `2px solid ${selectedCategories.includes(category) ? '#e74c3c' : '#ddd'}`,
                borderRadius: '4px',
                marginRight: '12px',
                position: 'relative',
                transition: 'all 0.3s ease',
                flexShrink: 0,
                backgroundColor: selectedCategories.includes(category) ? '#e74c3c' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {selectedCategories.includes(category) && (
                  <span style={{
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    ✓
                  </span>
                )}
              </span>
              <span style={{
                fontSize: '14px',
                fontWeight: selectedCategories.includes(category) ? 600 : 500,
                color: selectedCategories.includes(category) ? '#e74c3c' : '#2c3e50',
                transition: 'color 0.3s ease'
              }}>
                {category}
              </span>
            </label>
          ))}
          
          {filteredCategories.length === 0 && (
            <div style={{
              padding: '20px',
              textAlign: 'center',
              color: '#7f8c8d',
              fontStyle: 'italic'
            }}>
              No categories found
            </div>
          )}
        </div>

        {/* Scrollbar Styling */}
        <style jsx>{`
          .category-sidebar::-webkit-scrollbar {
            width: 6px;
          }
          .category-sidebar::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          .category-sidebar::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 3px;
          }
          .category-sidebar::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
          }
          
          @media (max-width: 768px) {
            .category-sidebar {
              width: 280px !important;
            }
            
            .mobile-hidden {
              display: none;
            }
          }
          
          @media (max-width: 480px) {
            .category-sidebar {
              width: 260px !important;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default CategorySidebar;