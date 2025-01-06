import React, { useState } from 'react'
import MinimalHomePage from './homepages/MinimalHomePage.tsx'
import StunningHomePage from './homepages/StunningHomePage.tsx'
import EtherealHomePage from './homepages/EtherealHomePage.tsx'
import { ChevronLeft, ChevronRight, Maximize2, Github, ExternalLink } from 'lucide-react';


const HomepageShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const homepages = [
    {
      id: 1,
      name: "Minimal Complex",
      description: "A minimalist design with complex interactions",
      component: MinimalHomePage,
      tech: ["React", "Tailwind CSS", "Framer Motion"],
      background: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      id: 2,
      name: "Stunning Visuals",
      description: "A visually stunning homepage layout",
      component: StunningHomePage,
      tech: ["React", "GSAP", "CSS Modules"],
      background: "bg-gradient-to-br from-blue-500 to-teal-500"
    },
    {
      id: 3,
      name: "Ethereal Aesthetics",
      description: "A homepage with an ethereal and modern look",
      component: EtherealHomePage,
      tech: ["React", "SASS", "Three.js"],
      background: "bg-gradient-to-br from-green-500 to-yellow-500"
    },
  ];
  

  const nextHomepage = () => {
    setCurrentIndex((prev) => (prev + 1) % homepages.length);
  };

  const prevHomepage = () => {
    setCurrentIndex((prev) => (prev - 1 + homepages.length) % homepages.length);
  };

  const CurrentHomepage = homepages[currentIndex].component;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Homepage Gallery</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-24">
        {/* Preview Section */}
        <div className="relative w-full aspect-video max-w-6xl mx-auto my-8">
          {/* Frame */}
          <div className={`relative rounded-lg overflow-hidden border border-gray-700 shadow-2xl
            ${isFullscreen ? 'fixed inset-0 z-50' : 'h-full'}`}>
            
            {/* Browser Chrome */}
            <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 ml-4">
                <div className="bg-gray-700 rounded px-4 py-1 text-sm w-full max-w-md">
                  homepage-gallery.design
                </div>
              </div>
            </div>

            {/* Homepage Preview */}
            <div className="relative h-full">
              <React.Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" />
                </div>
              }>
                <CurrentHomepage />
              </React.Suspense>
            </div>
          </div>

          {/* Controls */}
          <div className="absolute -bottom-16 left-0 right-0 flex items-center justify-between px-4">
            <button
              onClick={prevHomepage}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Maximize2 size={24} />
              </button>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <ExternalLink size={24} />
              </a>
            </div>

            <button
              onClick={nextHomepage}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Homepage Info */}
        <div className="container mx-auto px-4 mt-24">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">
              {homepages[currentIndex].name}
            </h2>
            <p className="text-gray-400 mb-4">
              {homepages[currentIndex].description}
            </p>
            <div className="flex flex-wrap gap-2">
              {homepages[currentIndex].tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-gray-800 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-2">
            {homepages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 
                  ${index === currentIndex ? 'bg-white w-8' : 'bg-gray-600'}`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomepageShowcase;