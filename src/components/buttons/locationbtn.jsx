import React, { useState } from "react";

export default function StickyRecommendBtn({ location, setLocation, price, setPrice }) {
  const [open, setOpen] = useState(false);
  const [locationInput, setLocationInput] = useState(location);
  const [priceInput, setPriceInput] = useState(price);

  const styles = {
    btn: { position: "fixed", bottom: "25px", right: "25px", backgroundColor: "#cc0000", color: "white", padding: "14px 22px", borderRadius: "50px", border: "none", cursor: "pointer", fontSize: "16px", boxShadow: "0 4px 10px rgba(0,0,0,0.3)", zIndex: 9999 },
    overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.4)", display: open ? "flex" : "none", justifyContent: "center", alignItems: "center", zIndex: 9998 },
    formBox: { width: "350px", background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", gap: "15px" },
    input: { padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" },
    button: { padding: "12px", borderRadius: "8px", border: "none", backgroundColor: "#cc0000", color: "white", fontSize: "16px", cursor: "pointer" },
  };

  const handleSubmit = () => {
    setLocation(locationInput);
    setPrice(priceInput);
    setOpen(false);
  };

  return (
    <>
      <button style={styles.btn} onClick={() => setOpen(true)}>🔍 Add Location & Price</button>

      <div style={styles.overlay}>
        <div style={styles.formBox}>
          <h3 style={{ textAlign: "center" }}>Enter Your Details</h3>

          <input
            type="text"
            placeholder="Enter Location"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            style={styles.input}
          />

          <select
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
            style={styles.input}
          >
            <option value="">Select Price Range</option>
            <option value="$">$ (Cheap)</option>
            <option value="$$">$$ (Medium)</option>
            <option value="$$$">$$$ (Expensive)</option>
          </select>

          <button style={styles.button} onClick={handleSubmit}>✔ Submit</button>
          <button style={{ ...styles.button, backgroundColor: "gray" }} onClick={() => setOpen(false)}>✖ Close</button>
        </div>
      </div>
    </>
  );
}
