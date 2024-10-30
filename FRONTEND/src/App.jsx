// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Import Home component
import ProductDetail from './pages/ProductDetail'; // Assuming this exists
import CartPage from './pages/CartPage'; // Assuming this exists
import LoginPage from './pages/LoginPage'; // Assuming this exists
import RegisterPage from './pages/RegisterPage'; // Assuming this exists
import ErrorBoundary from './pages/ErrorBoundary';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Set Home as root */}
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
