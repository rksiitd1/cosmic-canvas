import React, { useState, useEffect } from 'react';
import { Move } from 'lucide-react';

const Homepage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
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

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Dynamic background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900"
        style={{
          transform: `rotate(${mousePosition.x * 5}deg) scale(1.1)`
        }}
      />

      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 5}s infinite linear`,
          }}
        />
      ))}

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Interactive title */}
        <div
          className="group relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h1 className="text-6xl font-bold text-white tracking-wider mb-8 transition-all duration-500 transform hover:scale-110">
            ETHEREAL
          </h1>
          
          {/* Floating elements */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-white rounded-full mix-blend-screen"
                style={{
                  left: `${50 + Math.cos(i / 3 * Math.PI) * 100}%`,
                  top: `${50 + Math.sin(i / 3 * Math.PI) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: `orbit ${3 + i}s infinite linear`
                }}
              />
            ))}
          </div>
        </div>

        {/* Subtle interactive subtitle */}
        <p 
          className="text-gray-400 text-xl tracking-widest transform transition-all duration-500"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        >
          beyond imagination
        </p>

        {/* Animated icon */}
        <div className="mt-12 animate-pulse">
          <Move className="text-white w-12 h-12" />
        </div>
      </div>

      {/* Style definitions */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(50px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};

export default Homepage;