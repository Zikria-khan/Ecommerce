import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../api'; 
import './ProductDetail.css'; 

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id); 
        setProduct(data.product);
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); 

  if (loading) {
    return <p className="loading">Loading...</p>; 
  }

  if (error) {
    return <p className="error">{error}</p>; 
  }

  if (!product) {
    return <p className="error">Product not found</p>; 
  }

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <img className="product-image" src={product.image} alt={product.name} />
        <div className="product-info">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: <span>${product.price}</span></p>
          <div className="button-container">
            <Link to="/products" className="back-button">Back to Products</Link>
            <Link to="/" className="back-button home-button">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 
