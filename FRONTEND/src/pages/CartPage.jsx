import React, { useState, useEffect } from 'react';
import { removeFromCart, getCartItems, checkout, addToCart } from '../api';
import { useNavigate } from 'react-router-dom';
import './CartPage.css'; // Import the CSS file for styling

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to be logged in to view your cart.');
        localStorage.clear(); // Clear local storage if no token found
        navigate('/login');
        return;
      }

      try {
        const data = await getCartItems();
        setCartItems(data);
      } catch (err) {
        setError('Failed to fetch cart items: ' + (err.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [navigate]);

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (err) {
      setError('Failed to remove item from cart: ' + (err.message || 'Unknown error'));
    }
  };

  const handleCheckout = async () => {
    try {
      const result = await checkout();
      if (result.success) {
        alert('Checkout successful!');
        setCartItems([]);
      } else {
        alert('Checkout failed: ' + (result.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Checkout error: ' + (err.message || 'Unknown error'));
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      await addToCart(productId, quantity);
      alert('Added to cart successfully');
    } catch (err) {
      setError('Error adding to cart: ' + (err.message || 'Unknown error'));
    }
  };

  if (loading) return <p className="loading">Loading cart items...</p>;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {error && <p className="error">{error}</p>}
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.product.image} alt={item.product.name} className="item-image" />
              <div className="item-details">
                <h3 className="item-name">{item.product.name}</h3>
                <p className="item-price">${item.product.price}</p>
                <input 
                  type="number" 
                  min="1" 
                  defaultValue="1" 
                  onChange={(e) => handleAddToCart(item.product._id, e.target.value)}
                  className="quantity-input"
                />
                <button className="remove-button" onClick={() => handleRemove(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-summary">
        <button className="checkout-button" onClick={handleCheckout} disabled={cartItems.length === 0}>
          Checkout
        </button>
        {/* Back to Home Button */}
        <button className="back-home-button" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default CartPage;
