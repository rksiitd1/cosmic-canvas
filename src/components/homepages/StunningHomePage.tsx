import React, { useState, useEffect } from 'react';
import { Sparkles, Moon, Sun, Circle } from 'lucide-react';

const StunningHomepage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`min-h-screen w-full relative overflow-hidden transition-colors duration-1000 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Splash Screen */}
      <div className={`absolute inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-1000 ${showSplash ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Sparkles className="w-16 h-16 text-white animate-spin" />
      </div>

      {/* Interactive Background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 0%, transparent 15%)`
        }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <Circle
            key={i}
            className={`absolute animate-pulse text-blue-500 opacity-20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `scale(${Math.random() * 2 + 0.5})`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h1 className={`text-6xl font-bold mb-8 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Boundless
        </h1>
        
        <p className={`text-xl mb-12 max-w-md ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Where imagination meets infinity
        </p>

        <button 
          className={`px-8 py-3 rounded-full text-white font-medium transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-black hover:bg-gray-800'}`}
        >
          Explore
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="fixed top-8 right-8 p-2 rounded-full transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isDark ? (
            <Sun className="w-6 h-6 text-white" />
          ) : (
            <Moon className="w-6 h-6 text-gray-900" />
          )}
        </button>
      </div>
    </div>
  );
};

export default StunningHomepage;