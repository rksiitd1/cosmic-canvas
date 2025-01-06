import React, { useState, useCallback, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Github, 
  ExternalLink,
  Info,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MinimalHomePage from './homepages/MinimalHomePage';
import StunningHomePage from './homepages/StunningHomePage';
import EtherealHomePage from './homepages/EtherealHomePage';

// Custom Button Component
const Button = ({ variant = 'default', size = 'default', className = '', children, asChild, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-gray-800 hover:bg-gray-700 text-white",
    ghost: "hover:bg-gray-800 text-gray-400 hover:text-white",
    outline: "border border-gray-700 hover:bg-gray-800 text-gray-300"
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6",
    icon: "h-9 w-9"
  };

  const Element = asChild ? 'a' : 'button';

  return (
    <Element 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Element>
  );
};

// Custom Modal Component
const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-gray-900 rounded-lg w-full max-w-md mx-4 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Badge Component
const Badge = ({ children, className = '' }) => (
  <span className={`inline-flex items-center rounded-full bg-gray-800 px-2.5 py-0.5 text-sm font-medium transition-colors hover:bg-gray-700 ${className}`}>
    {children}
  </span>
);

// Preview Frame Component
const PreviewFrame = ({ children, isLoading }) => {
  return (
    <div className="w-full h-full bg-white overflow-hidden">
      <div className="w-full h-full origin-top scale-[0.5] transform-gpu">
        <div className="w-[200%] h-[200%] transform-gpu origin-top-left scale-50">
          {children}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center bg-gray-900"
            exit={{ opacity: 0 }}
            initial={{ opacity: 1 }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" />
              <p className="text-sm text-gray-400">Loading preview...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HomepageShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const homepages = [
    {
      id: 1,
      name: "Minimal Complex",
      description: "A minimalist design that combines simplicity with sophisticated interactions. Perfect for modern SaaS applications and professional services.",
      component: MinimalHomePage,
      tech: ["React", "Tailwind CSS", "Framer Motion"],
      author: "Design Team",
      githubUrl: "#",
      demoUrl: "#",
      background: "bg-gradient-to-br from-violet-600 to-indigo-600"
    },
    {
      id: 2,
      name: "Stunning Visuals",
      description: "An immersive visual experience with smooth animations and bold design elements. Ideal for creative agencies and portfolio websites.",
      component: StunningHomePage,
      tech: ["React", "GSAP", "CSS Modules"],
      author: "Creative Lab",
      githubUrl: "#",
      demoUrl: "#",
      background: "bg-gradient-to-br from-blue-600 to-cyan-600"
    },
    {
      id: 3,
      name: "Ethereal Aesthetics",
      description: "A dreamy, modern interface with floating elements and subtle animations. Perfect for luxury brands and artistic showcases.",
      component: EtherealHomePage,
      tech: ["React", "SASS", "Three.js"],
      author: "Design Collective",
      githubUrl: "#",
      demoUrl: "#",
      background: "bg-gradient-to-br from-emerald-600 to-teal-600"
    },
  ];

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'ArrowRight') nextHomepage();
    if (e.key === 'ArrowLeft') prevHomepage();
    if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
  }, [isFullscreen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const nextHomepage = () => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev + 1) % homepages.length);
  };

  const prevHomepage = () => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev - 1 + homepages.length) % homepages.length);
  };

  const CurrentHomepage = homepages[currentIndex].component;
  const currentHomepage = homepages[currentIndex];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Homepage Gallery
            </h1>
            <nav className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                Showcase
              </Button>
              <Button variant="ghost" size="sm">
                Templates
              </Button>
              <Button variant="ghost" size="sm">
                Docs
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-24">
        {/* Preview Section */}
        <motion.div 
          className="relative w-full aspect-video max-w-6xl mx-auto my-8"
          layout
        >
          {/* Frame */}
          <motion.div 
            className={`relative rounded-xl overflow-hidden border border-gray-800 shadow-2xl
              ${isFullscreen ? 'fixed inset-0 z-50' : 'h-full'}`}
            layout
          >
            {/* Browser Chrome */}
            <div className="bg-gray-900 px-4 py-2 flex items-center gap-2 border-b border-gray-800">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
              </div>
              <div className="flex-1 ml-4">
                <div className="bg-gray-800 rounded-md px-4 py-1.5 text-sm w-full max-w-md flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gray-700" />
                  <span className="text-gray-400">homepage-gallery.design</span>
                </div>
              </div>
            </div>

            {/* Homepage Preview with Scaling */}
            <div className="relative h-[calc(100%-2.5rem)]">
              <PreviewFrame isLoading={isLoading}>
                <React.Suspense fallback={null}>
                  <CurrentHomepage onLoad={() => setIsLoading(false)} />
                </React.Suspense>
              </PreviewFrame>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="absolute -bottom-16 left-0 right-0 flex items-center justify-between px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevHomepage}
              className="rounded-full"
            >
              <ChevronLeft size={24} />
            </Button>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="rounded-full"
              >
                <Maximize2 size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowInfo(true)}
                className="rounded-full"
              >
                <Info size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="rounded-full"
              >
                <a
                  href={currentHomepage.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={20} />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="rounded-full"
              >
                <a
                  href={currentHomepage.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={20} />
                </a>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextHomepage}
              className="rounded-full"
            >
              <ChevronRight size={24} />
            </Button>
          </div>
        </motion.div>

        {/* Navigation Dots */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-2">
            {homepages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 
                  ${index === currentIndex ? 'bg-white w-8' : 'bg-gray-600 w-2'}`}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Info Modal */}
      <Modal 
        open={showInfo} 
        onClose={() => setShowInfo(false)}
        title={currentHomepage.name}
      >
        <div className="space-y-4">
          <p className="text-gray-400">{currentHomepage.description}</p>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {currentHomepage.tech.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Created by</h4>
            <p className="text-sm text-gray-400">{currentHomepage.author}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HomepageShowcase;