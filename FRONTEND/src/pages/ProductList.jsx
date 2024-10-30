// ProductList.js
import React, { useEffect, useState } from 'react';
import { getProducts, addToCart } from '../api';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard'; // Import the new ProductCard component
import './ProductList.css';

const categories = ['Pants', 'Shoes', 'Shirts'];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Shirts');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(selectedCategory);
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products: ' + (err.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleAddToCart = async (productId, quantity) => {
    try {
      const response = await addToCart(productId, quantity); // Pass quantity here
      if (response.success) {
        alert('Product added to cart successfully!');
      } else {
        alert('Failed to add product to cart: ' + (response.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('An error occurred while adding to the cart: ' + (error.message || 'Unknown error'));
    }
  };

  if (loading) return <p className="loading">Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="product-list">
      <h2 className="page-title">Products</h2>
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
        <button onClick={() => setSelectedCategory('')} className={`category-button ${selectedCategory === '' ? 'active' : ''}`}>
          All Products
        </button>
      </div>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard 
            key={product._id} 
            product={product} 
            onAddToCart={handleAddToCart} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
