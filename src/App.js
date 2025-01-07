import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomepageShowcase from './components/HomepageShowcase';
import QuantumPage from './components/homepages/QuantumPage';
import BoundlessPage from './components/homepages/BoundlessPage';
import AuroraPage from './components/homepages/AuroraPage';
import PulseMinimalPage from './components/homepages/PulseMinimalPage';
import NovaPage from './components/homepages/NovaPage';
import CosmicPage from './components/homepages/CosmicPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomepageShowcase />} />
        <Route path="/quantum-page" element={<QuantumPage />} />
        <Route path="/boundless-page" element={<BoundlessPage />} />
        <Route path="/aurora-page" element={<AuroraPage />} />
        <Route path="/pulse-minimal-page" element={<PulseMinimalPage />} />
        <Route path="/nova-page" element={<NovaPage />} />
        <Route path="/cosmic-page" element={<CosmicPage />} />
      </Routes>
    </Router>
  );
}

export default App;
