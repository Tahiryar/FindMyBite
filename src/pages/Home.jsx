// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar/UserNavbar";
import Footer from "../components/footer/Footer";
import RestaurantCard from "../cards/RestaurantCard";
import CategoryNavbar from "../components/navbar/CategoryNavbar";
import SearchBar from "../components/searchbar/searchbar";
import Favourite from "../cards/Favourite/Favourite";
import Recommend from "../cards/Recommend/Recommend";
import CategorySidebar from "../components/Sidebar/categorysidebar";
import StickyRecommendBtn from "../components/buttons/locationbtn";
import { restaurants } from "../data/restaurantData/data";
import GoogleMapComponent from "../map/GoogleMapComponent"

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [mapHeight, setMapHeight] = useState(0);
  const [currentBgImage, setCurrentBgImage] = useState(0);
  const carouselIntervalRef = useRef(null);

  // HD Full Width Images - Updated with high quality, full width images
  const backgroundImages = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=600&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=600&fit=crop",
    "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1920&h=600&fit=crop",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&h=600&fit=crop",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=600&fit=crop"
  ];

  const filteredRestaurants = restaurants.filter((rest) => {
    const matchCategory =
      selectedCategories.length === 0 || selectedCategories.includes(rest.category);

    const matchPrice = !price || rest.price === price;

    const matchLocation =
      !location || rest.location.toLowerCase().includes(location.toLowerCase());

    return matchCategory && matchPrice && matchLocation;
  });

  // Map height calculation
  useEffect(() => {
    const updateMapHeight = () => {
      if (window.innerWidth >= 1200) {
        setMapHeight(400);
      } else if (window.innerWidth >= 768) {
        setMapHeight(350);
      } else {
        setMapHeight(300);
      }
    };

    updateMapHeight();
    window.addEventListener('resize', updateMapHeight);
    return () => window.removeEventListener('resize', updateMapHeight);
  }, []);

  // Auto change background images
  useEffect(() => {
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }

    carouselIntervalRef.current = setInterval(() => {
      setCurrentBgImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
    };
  }, [backgroundImages.length]);

  // Function to manually change image
  const goToImage = (index) => {
    setCurrentBgImage(index);
    
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }
    
    carouselIntervalRef.current = setInterval(() => {
      setCurrentBgImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
  };

  return (
    <div className="home-container">
      {/* Fixed Map at Top */}
      <div className={`top-map-container ${showMap ? 'visible' : ''}`}>
        <div className="map-overlay" onClick={() => setShowMap(false)}></div>
        <div className="top-map-wrapper">
          <div className="map-header">
            <h3 className="map-title">Restaurants Near You</h3>
            <button 
              className="close-map-btn"
              onClick={() => setShowMap(false)}
            >
              ✕
            </button>
          </div>
          <div className="top-map" style={{ height: `${mapHeight}px` }}>
            <GoogleMapComponent restaurants={filteredRestaurants} />
          </div>
          <div className="map-controls">
            <div className="map-stats">
              <span className="stat">
                <strong>{filteredRestaurants.length}</strong> restaurants
              </span>
              <span className="stat">
                <strong>4.2</strong> avg rating
              </span>
              <span className="stat">
                <strong>30</strong> min avg delivery
              </span>
            </div>
            <button 
              className="close-map-full-btn"
              onClick={() => setShowMap(false)}
            >
              Close Map
            </button>
          </div>
        </div>
      </div>

      <Navbar />

      {/* Hero Section with HD Carousel */}
      <header className="home-header">
        {/* HD Background Image Carousel */}
        <div className="background-carousel">
          {backgroundImages.map((img, index) => (
            <div 
              key={index}
              className={`carousel-slide ${index === currentBgImage ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          
          {/* Gradient Overlay */}
          <div className="carousel-overlay"></div>
          
          {/* Carousel Navigation Dots */}
          <div className="carousel-dots">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentBgImage ? 'active' : ''}`}
                onClick={() => goToImage(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Previous/Next Buttons */}
          <button 
            className="carousel-btn prev-btn"
            onClick={() => goToImage(currentBgImage === 0 ? backgroundImages.length - 1 : currentBgImage - 1)}
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            className="carousel-btn next-btn"
            onClick={() => goToImage(currentBgImage === backgroundImages.length - 1 ? 0 : currentBgImage + 1)}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        {/* Header Content */}
        <div className="header-content">
          <h1 className="header-title">Find Restaurants Near You</h1>
          <p className="header-subtitle">Discover the best dining experiences in your area</p>
          <SearchBar />
        </div>
      </header>

      <CategoryNavbar
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      <div className="main-content-wrapper">
        <CategorySidebar
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <main className="main-content">
          <section className="featured-section">
            <div className="section-header">
              <h2 className="section-title">Featured Restaurants</h2>
              <p className="section-subtitle">Curated selection of top-rated places</p>
            </div>

            <div className="restaurants-grid">
              {filteredRestaurants.map((rest) => (
                <RestaurantCard key={rest.id} restaurant={rest} />
              ))}
              
              {filteredRestaurants.length === 0 && (
                <div className="no-results">
                  <h3>No restaurants found</h3>
                  <p>Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </section>

          <section className="favourites-section">
            <div className="section-header">
              <h2 className="section-title">Your Favourite Items ❤️</h2>
            </div>
            <Favourite />
          </section>

          <section className="recommend-section">
            <Recommend />
          </section>
        </main>
      </div>

      <Footer />

      {/* Sticky Buttons Container */}
      <div className="sticky-buttons-wrapper">
        <div className="sticky-map-btn-container">
          <button 
            className="sticky-map-btn"
            onClick={() => setShowMap(true)}
          >
            <svg className="map-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6V22L8 18L16 22L23 18V2L16 6L8 2L1 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 2V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 6V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="btn-text">Map</span>
          </button>
        </div>

        <div className="sticky-location-btn-container">
          <StickyRecommendBtn
            location={location}
            setLocation={setLocation}
            price={price}
            setPrice={setPrice}
          />
        </div>
      </div>

      <style jsx>{`
        .home-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f8f9fa;
          position: relative;
        }

        /* Top Map Container */
        .top-map-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 9999;
          display: none;
          animation: fadeIn 0.3s ease;
        }

        .top-map-container.visible {
          display: block;
        }

        .map-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }

        .top-map-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: white;
          z-index: 2;
          border-radius: 0 0 20px 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .map-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .map-title {
          margin: 0;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .close-map-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .close-map-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .top-map {
          width: 100%;
        }

        .map-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background: white;
          border-top: 1px solid #e1e5e9;
        }

        .map-stats {
          display: flex;
          gap: 20px;
        }

        .map-stats .stat {
          font-size: 0.9rem;
          color: #7f8c8d;
        }

        .map-stats .stat strong {
          color: #667eea;
          font-weight: 700;
        }

        .close-map-full-btn {
          padding: 10px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .close-map-full-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
        }

        /* Sticky Buttons Wrapper */
        .sticky-buttons-wrapper {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 20px;
        }

        .sticky-map-btn-container {
          order: 1;
          margin-bottom: 0;
        }

        .sticky-location-btn-container {
          order: 2;
        }

        .sticky-map-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          transition: all 0.3s ease;
          position: relative;
        }

        .sticky-map-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.5);
        }

        .map-icon {
          width: 24px;
          height: 24px;
        }

        .btn-text {
          font-size: 12px;
          font-weight: 500;
        }

        /* Hero Section with HD Carousel - FULL WIDTH */
        .home-header {
          position: relative;
          padding: 0;
          text-align: center;
          color: white;
          height: 600px; /* Increased height for better visibility */
          width: 100%;
          overflow: hidden;
        }

        .background-carousel {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
        }

        .carousel-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover !important; /* HD Full Width Cover */
          background-position: center !important;
          background-repeat: no-repeat !important;
          opacity: 0;
          transition: opacity 1s ease-in-out;
          filter: brightness(0.85);
        }

        .carousel-slide.active {
          opacity: 1;
        }

        .carousel-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.5) 50%,
            rgba(0, 0, 0, 0.3) 100%
          );
          z-index: 1;
        }

        /* Carousel Navigation */
        .carousel-dots {
          position: absolute;
          bottom: 30px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 12px;
          z-index: 2;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .dot.active {
          background: white;
          transform: scale(1.3);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }

        .dot:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: scale(1.2);
        }

        /* Navigation buttons */
        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.4);
          border: none;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 2;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .carousel-btn:hover {
          background: rgba(0, 0, 0, 0.6);
          transform: translateY(-50%) scale(1.1);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .carousel-btn.prev-btn {
          left: 30px;
        }

        .carousel-btn.next-btn {
          right: 30px;
        }

        .carousel-btn svg {
          width: 24px;
          height: 24px;
        }

        /* Header Content */
        .header-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          padding: 0 20px;
        }

        .header-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 20px;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
          animation: fadeInUp 0.8s ease;
          line-height: 1.1;
        }

        .header-subtitle {
          font-size: 1.3rem;
          margin-bottom: 40px;
          opacity: 0.9;
          font-weight: 400;
          animation: fadeInUp 1s ease;
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
          max-width: 700px;
          line-height: 1.5;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Main Content */
        .main-content-wrapper {
          display: flex;
          flex: 1;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        .main-content {
          flex: 1;
          padding: 60px 40px;
          background: #ffffff;
          margin: 0 auto;
          width: 100%;
        }

        .section-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .section-title {
          font-size: 2.8rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 12px;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: #7f8c8d;
          margin: 0;
        }

        .restaurants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .featured-section,
        .favourites-section,
        .recommend-section {
          margin-bottom: 60px;
        }

        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: #7f8c8d;
        }

        .no-results h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
          color: #2c3e50;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .home-header {
            height: 500px;
          }
          
          .header-title {
            font-size: 3rem;
          }
          
          .header-subtitle {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 1024px) {
          .main-content-wrapper {
            flex-direction: column;
          }

          .main-content {
            padding: 50px 30px;
          }

          .home-header {
            height: 450px;
          }
        }

        @media (max-width: 768px) {
          .home-header {
            height: 400px;
          }

          .header-title {
            font-size: 2.5rem;
            margin-bottom: 15px;
          }

          .header-subtitle {
            font-size: 1.1rem;
            margin-bottom: 30px;
          }

          .carousel-btn {
            width: 40px;
            height: 40px;
          }

          .carousel-btn.prev-btn {
            left: 15px;
          }

          .carousel-btn.next-btn {
            right: 15px;
          }

          .carousel-btn svg {
            width: 20px;
            height: 20px;
          }

          .carousel-dots {
            bottom: 20px;
          }

          .section-title {
            font-size: 2.2rem;
          }

          .section-subtitle {
            font-size: 1rem;
          }

          .restaurants-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
          }

          .main-content {
            padding: 40px 20px;
          }

          .map-stats {
            flex-direction: column;
            gap: 10px;
          }

          .map-controls {
            flex-direction: column;
            gap: 15px;
          }

          .sticky-buttons-wrapper {
            bottom: 20px;
            right: 20px;
            gap: 15px;
          }

          .sticky-map-btn {
            width: 55px;
            height: 55px;
            font-size: 13px;
          }

          .btn-text {
            font-size: 11px;
          }
        }

        @media (max-width: 480px) {
          .home-header {
            height: 350px;
          }

          .header-title {
            font-size: 2rem;
          }

          .header-subtitle {
            font-size: 1rem;
            margin-bottom: 25px;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .section-subtitle {
            font-size: 0.95rem;
          }

          .carousel-btn {
            width: 35px;
            height: 35px;
          }

          .carousel-btn svg {
            width: 18px;
            height: 18px;
          }

          .dot {
            width: 10px;
            height: 10px;
          }

          .restaurants-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .map-header {
            padding: 12px 15px;
          }

          .top-map-wrapper {
            border-radius: 0;
          }

          .sticky-buttons-wrapper {
            bottom: 15px;
            right: 15px;
            gap: 12px;
          }

          .sticky-map-btn {
            width: 50px;
            height: 50px;
            font-size: 12px;
          }

          .map-icon {
            width: 20px;
            height: 20px;
          }

          .btn-text {
            font-size: 10px;
          }
        }

        @media (max-width: 360px) {
          .home-header {
            height: 300px;
          }

          .header-title {
            font-size: 1.8rem;
          }

          .header-subtitle {
            font-size: 0.9rem;
          }

          .carousel-dots {
            bottom: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;