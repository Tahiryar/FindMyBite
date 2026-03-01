import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";

export default function Navbar({ cartCount = 0, currentUser = null, onLogout }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // example: navigate to search page with query
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setOpen(false);
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        {/* Left: Logo */}
        <div style={styles.left}>
          <Link to="/home" style={styles.logoLink}>
            <span style={styles.logoSymbol}>🍽️</span>
            <span style={styles.logoText}>FindMYBite</span>
          </Link>
        </div>

        {/* Center: Desktop Links + Search */}
        <div style={styles.center}>
          <ul style={styles.links}>
            <li><Link to="/home" style={styles.link}>Home</Link></li>
            <li><Link to="/restaurants" style={styles.link}>Restaurants</Link></li>
            <li><Link to="/restaurant/dashboard" style={styles.link}>Dashboard</Link></li>
            <li><Link to="/contact" style={styles.link}>Contact</Link></li>
          </ul>

          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes, restaurants..."
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchBtn}><FaSearch /></button>
          </form>
        </div>

        {/* Right: Cart + User + Mobile Hamburger */}
        <div style={styles.right}>
          <Link to="/cart" style={styles.cartBtn} title="Cart">
            <FaShoppingCart />
            {cartCount > 0 && <span style={styles.cartCount}>{cartCount}</span>}
          </Link>

          {currentUser ? (
            <div style={styles.userBox}>
              <button style={styles.userBtn}>
                <FaUserCircle style={{ marginRight: 8 }} />
                {currentUser.name || "Profile"}
              </button>
              <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8 }}>
              <Link to="/auth/login" style={styles.authBtn}>Login</Link>
              <Link to="/auth/signup" style={styles.signupBtn}>Sign up</Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button onClick={() => setOpen(!open)} style={styles.hamburgerBtn} aria-label="Menu">
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={styles.mobileMenu}>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, padding: "8px 12px" }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              style={{ flex: 1, padding: "8px", borderRadius: 6, border: "1px solid #ddd" }}
            />
            <button type="submit" style={{ padding: "8px 10px", background: "#ff4d4d", color: "#fff", border: "none", borderRadius: 6 }}><FaSearch /></button>
          </form>

          <ul style={styles.mobileLinks}>
            <li><Link to="/home" style={styles.mobileLink} onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to="/restaurants" style={styles.mobileLink} onClick={() => setOpen(false)}>Restaurants</Link></li>
            <li><Link to="/restaurant/dashboard" style={styles.mobileLink} onClick={() => setOpen(false)}>Dashboard</Link></li>
            <li><Link to="/contact" style={styles.mobileLink} onClick={() => setOpen(false)}>Contact</Link></li>
            <li><Link to="/cart" style={styles.mobileLink} onClick={() => setOpen(false)}>Cart ({cartCount})</Link></li>
            {!currentUser && (
              <>
                <li><Link to="/auth/login" style={styles.mobileLink} onClick={() => setOpen(false)}>Login</Link></li>
                <li><Link to="/auth/signup" style={styles.mobileLink} onClick={() => setOpen(false)}>Sign Up</Link></li>
              </>
            )}
            {currentUser && (
              <>
                <li style={styles.mobileLink} onClick={() => { setOpen(false); onLogout && onLogout(); }}>Logout</li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

/* ---------- Inline Styles ---------- */
const styles = {
  nav: {
    width: "100%",
    background: "#fff",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  inner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "10px 16px",
    display: "flex",
    alignItems: "center",
    gap: 16,
    justifyContent: "space-between",
  },
  left: { display: "flex", alignItems: "center", gap: 12 },
  logoLink: { display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#111" },
  logoSymbol: { fontSize: 22 },
  logoText: { fontWeight: 800, fontSize: 20, letterSpacing: 0.4, color: "#111" },

  center: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    flex: 1,
    justifyContent: "center",
  },
  links: {
    display: "flex",
    gap: 16,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: 600,
    padding: "6px 8px",
    borderRadius: 6,
  },

  searchForm: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #eee",
    padding: "6px",
    borderRadius: 8,
    background: "#f8f8f8",
  },
  searchInput: {
    border: "none",
    outline: "none",
    padding: "6px 8px",
    width: 300,
    background: "transparent",
  },
  searchBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 6,
    color: "#666",
    fontSize: 16,
  },

  right: { display: "flex", alignItems: "center", gap: 12 },
  cartBtn: { position: "relative", textDecoration: "none", color: "#333", fontSize: 18 },
  cartCount: {
    position: "absolute",
    top: -8,
    right: -10,
    background: "#e53e3e",
    color: "#fff",
    width: 20,
    height: 20,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
  },

  userBox: { display: "flex", alignItems: "center", gap: 8 },
  userBtn: { background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontWeight: 600 },
  logoutBtn: { background: "#ff4d4d", color: "#fff", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer" },

  authBtn: { padding: "8px 12px", textDecoration: "none", background: "transparent", border: "1px solid #667eea", borderRadius: 8, color: "#667eea", fontWeight: 700 },
  signupBtn: { padding: "8px 12px", textDecoration: "none", background: "#667eea", border: "none", borderRadius: 8, color: "#fff", fontWeight: 700 },

  hamburgerBtn: { display: "none", background: "transparent", border: "none", fontSize: 20, cursor: "pointer" },

  /* Mobile menu */
  mobileMenu: {
    display: "none",
    flexDirection: "column",
    gap: 8,
    padding: 8,
    borderTop: "1px solid #eee",
  },
  mobileLinks: { listStyle: "none", padding: 12, margin: 0, display: "flex", flexDirection: "column", gap: 10 },
  mobileLink: { textDecoration: "none", color: "#333", padding: "8px 10px", borderRadius: 6, background: "#fff" },

  /* Responsive via JS-friendly values (we'll toggle display with CSS below) */
  // Note: small responsive adjustments added below globally
};

/* ---------- Simple responsive adjustments ---------- */
const mq = window.matchMedia("(max-width: 900px)");
function applyResponsive() {
  if (mq.matches) {
    styles.center.display = "none";
    styles.hamburgerBtn = { ...styles.hamburgerBtn, display: "inline-block" };
    styles.mobileMenu.display = "flex";
  } else {
    styles.center.display = "flex";
    styles.hamburgerBtn = { ...styles.hamburgerBtn, display: "none" };
    styles.mobileMenu.display = "none";
  }
}
applyResponsive();
mq.addListener(applyResponsive);
