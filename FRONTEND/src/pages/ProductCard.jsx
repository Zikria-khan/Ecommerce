import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleAddToCart = async (event) => {
    event.stopPropagation(); // Prevent triggering card click
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to be logged in to add items to the cart. Please log in or register.');
      navigate('/login');
      return;
    }
    await onAddToCart(product._id, quantity);
  };

  const truncateDescription = (description, length) => {
    return description.length <= length ? description : `${description.substring(0, length)}...`;
  };

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  };

  const handleViewDetailsClick = (event) => {
    event.stopPropagation(); // Prevent card click from triggering
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <img className="product-image" src={product.image} alt={product.name} />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{truncateDescription(product.description, 100)}</p>
      <p className="product-price">Price: <span>${product.price}</span></p>
      <input 
        type="number" 
        min="1" 
        value={quantity} 
        onChange={(e) => setQuantity(Number(e.target.value))} 
        className="quantity-input"
      />
      <button
        className="add-to-cart-button"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
      <button
        className="view-details-button"
        onClick={handleViewDetailsClick}
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
