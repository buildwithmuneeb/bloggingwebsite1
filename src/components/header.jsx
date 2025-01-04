"use client"
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-black text-white py-4">
      <header>
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
          {/* Logo */}
          <img 
            src="https://esoftwave.com/wp-content/uploads/2024/12/cropped-ESoftWave.png" 
            alt="ESoftWave Logo" 
            className="w-32 md:w-40 mb-4 md:mb-0"
          />

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8">
            <a href="/" className="hover:text-red-500 transition-colors">Home</a>
            <a href="#services" className="hover:text-red-500 transition-colors">Services</a>
            <a href="/blogs" className="hover:text-red-500 transition-colors">Blogs</a>
            <a href="#about" className="hover:text-red-500 transition-colors">About</a>
            <a href="#contact" className="hover:text-red-500 transition-colors">Contact</a>
            <a href="/login" className="hover:text-red-500 transition-colors">Admin</a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white text-2xl" 
            aria-label="Toggle Navigation" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Get Started Button */}
          <a 
            href="#get-started" 
            className="hidden md:inline-block bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-500 transition-colors"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`fixed top-0 left-0 h-full w-full bg-black text-white transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}
        >
          <div className="p-4 space-y-4">
            <button 
              className="text-white text-2xl" 
              aria-label="Close Navigation" 
              onClick={toggleMenu}
            >
              <FaTimes />
            </button>
            <a href="/" className="block hover:text-red-500 transition-colors">Home</a>
            <a href="#services" className="block hover:text-red-500 transition-colors">Services</a>
            <a href="#portfolio" className="block hover:text-red-500 transition-colors">Portfolio</a>
            <a href="#about" className="block hover:text-red-500 transition-colors">About</a>
            <a href="#contact" className="block hover:text-red-500 transition-colors">Contact</a>
            <a href="/admin" className="block hover:text-red-500 transition-colors">Login</a>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
