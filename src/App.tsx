import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WW2Tech from './pages/home/WW2Tech';

function App() {
  return (
    <Router>
      <Routes>
        {/* If they go to the homepage, send them to /ww2Tech */}
        <Route path="/" element={<Navigate to="/ww2Tech" replace />} />
        
        {/* The Main Page */}
        <Route path="/ww2Tech" element={<WW2Tech />} />
        
        {/* If they type a random URL, send them to /ww2Tech */}
        <Route path="*" element={<Navigate to="/ww2Tech" replace />} />
      </Routes>
    </Router>
  );
}

export default App;