import React, { useState, useEffect } from 'react';
import { Camera, Code, Globe, Moon, Sun } from 'lucide-react';

const HomePage = () => {
  const [isDark, setIsDark] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1
    });
  };

  const bgClass = isDark ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = isDark ? 'text-gray-50' : 'text-gray-900';

  return (
    <div 
      className={`min-h-screen w-full ${bgClass} transition-colors duration-500`}
      onMouseMove={handleMouseMove}
    >
      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50">
        <div className="text-2xl font-bold tracking-tighter">
          <span className={`${textClass}`}>NOVA</span>
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2 rounded-full ${textClass} hover:bg-opacity-10 hover:bg-gray-500 transition-all`}
        >
          {isDark ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </nav>

      {/* Main Content */}
      <main className="relative flex items-center justify-center min-h-screen">
        {/* Background Grid */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-4 p-4 opacity-5">
          {Array.from({ length: 72 }).map((_, i) => (
            <div
              key={i}
              className="border border-current"
              style={{
                transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            />
          ))}
        </div>

        {/* Central Content */}
        <div 
          className={`relative z-10 text-center ${textClass}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h1 className="text-6xl font-bold mb-6 tracking-tight">
            Create
            <span className="inline-block ml-4 transform hover:scale-110 transition-transform">
              Future
            </span>
          </h1>
          
          {/* Floating Icons */}
          <div className="flex justify-center gap-12 mt-12">
            {[Camera, Code, Globe].map((Icon, index) => (
              <div
                key={index}
                className="relative group"
                style={{
                  transform: `translateY(${Math.sin((currentTime.getTime() / 1000) + index) * 10}px)`,
                  transition: 'transform 0.5s ease-out',
                }}
              >
                <Icon
                  size={32}
                  className={`${textClass} transform group-hover:scale-125 transition-all duration-300`}
                />
                <div className="absolute -bottom-2 left-1/2 w-1 h-1 bg-current rounded-full transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`fixed bottom-0 w-full p-6 ${textClass} text-sm opacity-50`}>
        <div className="flex justify-between items-center">
          <span>{currentTime.toLocaleTimeString()}</span>
          <span className="tracking-widest">EXPLORE → INNOVATE → CREATE</span>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;