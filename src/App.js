import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomepageShowcase from './components/HomepageShowcase';
import MinimalHomePage from './components/homepages/MinimalHomePage';
import StunningHomePage from './components/homepages/StunningHomePage';
import EtherealHomePage from './components/homepages/EtherealHomePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomepageShowcase />} />
        <Route path="/minimal" element={<MinimalHomePage />} />
        <Route path="/stunning" element={<StunningHomePage />} />
        <Route path="/ethereal" element={<EtherealHomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
