import React from "react";

const SearchBar = () => {
  const styles = {
    wrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    },
    container: {
      width: "80%",
      maxWidth: "1100px",
      background: "#f7f8f8",
      padding: "12px 20px",
      display: "flex",
      alignItems: "center",
      borderRadius: "40px",
      border: "1px solid #e5e5e5",
      boxShadow: "0px 1px 4px rgba(0,0,0,0.05)",
    },
    icon: {
      fontSize: "20px",
      marginRight: "12px",
      color: "#555",
    },
    input: {
      width: "100%",
      fontSize: "16px",
      border: "none",
      outline: "none",
      background: "transparent",
      color: "#333",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <span style={styles.icon}>🔍</span>
        <input
          type="text"
          placeholder="Search for restaurants, cuisines, and dishes"
          style={styles.input}
        />
      </div>
    </div>
  );
};

export default SearchBar;
