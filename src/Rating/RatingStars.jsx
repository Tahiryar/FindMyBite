import React from "react";

const RatingStars = ({ rating }) => {
  const styles = {
    container: {
      display: "flex",
      color: "#fbbf24", // yellow color
      fontSize: "18px",
      margin: "5px 0",
    },
    star: {
      marginRight: "2px",
    },
  };

  return (
    <div style={styles.container}>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <span key={i} style={styles.star}>
            {i < rating ? "★" : "☆"}
          </span>
        ))}
    </div>
  );
};

export default RatingStars;
