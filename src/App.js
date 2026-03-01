// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import RestaurantPage from "./pages/Restaurant";
import Login from "./auth/Login/Login";
import Signup from "./auth/Signup/Signup";

// Restaurant Owner Pages
import DashboardLayout from "./restaurant/Dashboard/Dashboard";
import AddDish from "./restaurant/pages/AddDish";
import Orders from "./restaurant/pages/Orders";
import MenuPage from "./restaurant/pages/MenuPage";
import PendingOrders from "./restaurant/pages/PendingOrders";
import NotificationPage from "./restaurant/pages/NotificationPage";

// Admin Pages
import AdminDashboard from "./admin/Dashboard/Dashboard.jsx";
import AllRestaurants from './admin/pages/AllRestaurants.jsx';
import RestaurentRequests from './admin/pages/RestaurantRequests.jsx';
import BlockedRestaurants from "./admin/pages/BlockedRestaurants.jsx";
import Payments from "./admin/pages/AllPayments.jsx";
import UserProfile from "./admin/pages/UserProfile.jsx";

import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";

// Just Eat Style Home Page
import Main from "./pages/Main.jsx";

// PUBLIC MENU PAGE - نیا page
import PublicMenuPage from "./pages/PublicMenuPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Main />} /> {/* Just Eat Style Home Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} /> {/* Original Home Page */}
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
        
        {/* NEW PUBLIC MENU PAGE */}
        <Route path="/menu" element={<PublicMenuPage />} /> {/* Public menu page */}

        {/* ---------------------
              ADMIN ROUTES
           --------------------- */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/restaurants"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AllRestaurants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/restaurant-requests"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <RestaurentRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/blocked-restaurants"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <BlockedRestaurants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Payments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* ---------------------
              RESTAURANT OWNER ROUTES
           --------------------- */}
        <Route
          path="/restaurant/dashboard"
          element={
            <ProtectedRoute allowedRoles={["restaurantOwner"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant/add-dish"
          element={
            <ProtectedRoute allowedRoles={["restaurantOwner"]}>
              <AddDish />
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant/orders"
          element={
            <ProtectedRoute allowedRoles={["restaurantOwner"]}>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* Restaurant Owner's Private Menu List */}
        <Route
          path="/restaurant/menu-list"
          element={
            <ProtectedRoute allowedRoles={["restaurantOwner"]}>
              <MenuPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant/pending-orders"
          element={
            <ProtectedRoute allowedRoles={["restaurantOwner"]}>
              <PendingOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant/notifications"
          element={
            <ProtectedRoute allowedRoles={["restaurantOwner"]}>
              <NotificationPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;