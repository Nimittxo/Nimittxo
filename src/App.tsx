import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import WW2Tech from './pages/home/WW2Tech';
import LondonScrolly from './components/LondonScrolly';
//import FoodHealth from './pages/home/FoodHealth';

// Import a Layout if you have a Navbar you want on every page
// import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <WW2Tech />
    </>
  );
}

export default App;