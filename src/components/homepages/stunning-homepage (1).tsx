import React, { useState, useEffect } from 'react';

const StunningHomepage = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollPos, setScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const calculateGradient = () => {
    const x = (mousePos.x / window.innerWidth) * 100;
    const y = (mousePos.y / window.innerHeight) * 100;
    return `radial-gradient(circle at ${x}% ${y}%, rgba(29, 78, 216, 0.15), transparent)`;
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Interactive background */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: calculateGradient(),
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Geometric patterns */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-96 h-96 border border-blue-500/20 rounded-full transform transition-transform duration-1000"
            style={{
              left: `${(Math.sin(i / 3) * 50) + 50}%`,
              top: `${(Math.cos(i / 3) * 50) + 50}%`,
              transform: `translate(-50%, -50%) scale(${1 + Math.sin(scrollPos / 1000 + i / 2) * 0.2})`,
              opacity: 0.1 + (i / 24),
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8">
        <h1 className="text-6xl font-bold tracking-wider transform transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? '0' : '2rem'})`,
            }}>
          BEYOND
        </h1>
        
        <p className="text-xl text-blue-200/80 tracking-widest transform transition-all duration-1000 delay-300"
           style={{
             opacity: isVisible ? 1 : 0,
             transform: `translateY(${isVisible ? '0' : '2rem'})`,
           }}>
          LIMITLESS IMAGINATION
        </p>

        {/* Interactive button */}
        <button
          className="mt-8 px-8 py-3 bg-transparent border border-blue-500/50 rounded-full 
                     text-blue-300 transition-all duration-300 hover:bg-blue-500/10 
                     hover:border-blue-400 transform hover:scale-105"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? '0' : '2rem'})`,
          }}
        >
          EXPLORE
        </button>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              opacity: 0.3 + (Math.random() * 0.7),
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default StunningHomepage;