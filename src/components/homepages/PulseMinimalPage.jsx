import React, { useState, useEffect } from 'react';
import { Motion, Sun, Moon } from 'lucide-react';

const Homepage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const words = ['Create', 'Innovate', 'Transform'];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-700 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
      style={{
        background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${
          50 + mousePosition.y * 20
        }%, ${isDark ? '#2d3748 0%, #1a202c' : '#f7fafc 0%, #edf2f7'} 100%)`
      }}
    >
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full transition-colors duration-300"
        >
          {isDark ? (
            <Sun className="w-6 h-6 text-gray-200" />
          ) : (
            <Moon className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      <div className="relative">
        <Motion className={`w-12 h-12 mb-8 ${isDark ? 'text-gray-200' : 'text-gray-800'}`} />
        <h1 
          className={`text-6xl font-bold mb-4 tracking-tight transition-colors duration-700 ${
            isDark ? 'text-gray-200' : 'text-gray-800'
          }`}
        >
          {words[activeIndex]}
        </h1>
      </div>

      <div 
        className="grid grid-cols-3 gap-4 mt-12"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${
            mousePosition.x * 5
          }deg)`
        }}
      >
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className={`w-16 h-16 rounded-lg transition-all duration-300 transform hover:scale-110 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}
            style={{
              boxShadow: `${mousePosition.x * 10}px ${
                mousePosition.y * 10
              }px 20px rgba(0,0,0,0.1)`,
              transform: `translateZ(${
                Math.sin((index / 9) * Math.PI * 2) * 20
              }px)`
            }}
          />
        ))}
      </div>

      <div 
        className={`absolute bottom-8 text-sm transition-colors duration-700 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        Explore the possibilities
      </div>
    </div>
  );
};

export default Homepage;