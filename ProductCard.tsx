import React, { useState } from "react";
import "./product.css";

// Defining the ProductCard component
const ProductCard: React.FC = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  // Function to show popup
  const handleAddToCart = () => {
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 3000); // Hide popup after 3 seconds
  };

  return (
    <div className="product-card">
      <img
        src="https://images.unsplash.com/photo-1739961097716-064cb40a941e?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your product image URL
        alt="Product"
        className="product-image"
      />
      <h3 className="product-title">Product Name</h3>
      <p className="product-description">This is a great product.</p>
      <span className="product-price">$20.00</span>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>

      {/* Popup message */}
      {isPopupVisible && (
        <div className="popup">
          <p>Item added to cart!</p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
