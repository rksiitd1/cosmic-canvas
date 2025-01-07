import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <div 
      className="min-h-screen bg-black text-white overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900 to-black opacity-50"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }}
      />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-16 h-16 bg-white/5 rounded-full backdrop-blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 2 + 0.5})`,
              animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          ETHEREAL
        </motion.h1>

        {/* Interactive line */}
        <motion.div
          className="w-64 h-px bg-gradient-to-r from-transparent via-white to-transparent my-8"
          animate={{
            scaleX: isHovered ? 1.5 : 1,
            opacity: isHovered ? 1 : 0.5
          }}
          transition={{ duration: 0.3 }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-center max-w-md px-4"
        >
          Beyond imagination
        </motion.p>
      </div>

      {/* Interactive particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
              transform: `translate(${(mousePosition.x - window.innerWidth/2) * 0.05}px, ${(mousePosition.y - window.innerHeight/2) * 0.05}px)`
            }}
          />
        ))}
      </div>

      {/* Scroll-triggered elements */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          opacity: scrollPosition > 100 ? 0 : 1,
          y: scrollPosition > 100 ? 20 : 0
        }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/30 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;