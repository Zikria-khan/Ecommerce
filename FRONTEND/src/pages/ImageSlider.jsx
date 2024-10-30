// src/components/ImageSlider.js
import React, { useState } from 'react';
import "./ImageSlider.css";

// Update the paths to read images from the public folder directly
const images = [
  '/slide1.avif',
  '/slide2.avif',
  '/slide3.avif',
  '/slide4.avif',
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="slider">
      <div className="arrow left" onClick={prevSlide}>&#10094;</div> {/* Left arrow */}
      {images.map((image, index) => (
        <div
          key={index}
          className="slide"
          style={{
            backgroundImage: `url(${image})`,
            opacity: currentIndex === index ? 1 : 0, // Show current slide
          }}
        />
      ))}
      <div className="arrow right" onClick={nextSlide}>&#10095;</div> {/* Right arrow */}
    </div>
  );
};

export default ImageSlider;
