import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import WW2Tech from './pages/home/WW2Tech';
//import FoodHealth from './pages/home/FoodHealth';

// Import a Layout if you have a Navbar you want on every page
// import Navbar from './components/Navbar';

function App() {
  return (
    // We use HashRouter for GitHub Pages compatibility
    // It creates URLs like nimittsharma.online/#/home
    <Router>
      
      {/* <Navbar />  <-- Your Navbar would go here so it stays on every page */}

      <Routes>
        <Route path="/Technology-and-WW2" element={<WW2Tech />} />
        {/* 404 Fallback - If they type a random URL */}
        <Route path="*" element={<div className="text-white p-10">404: Page Not Found</div>} />

      </Routes>
    </Router>
  );
}

export default App;