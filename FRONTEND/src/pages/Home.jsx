// src/components/Home.js
import React from 'react';
import Navbar from './Navbar';
import ImageSlider from './ImageSlider';
import ProductList from './ProductList';
import './Home.css'; // Ensure to import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <ImageSlider />
      <ProductList />
    </div>
  );
};

export default Home;
