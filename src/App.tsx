import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis'; // Import the library
import WW2Tech from './pages/home/WW2Tech';

function App() {
  return (
    // Wrap the entire app. 'root' makes it apply to the main html body.
    <ReactLenis root>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/ww2Tech" replace />} />
          <Route path="/ww2Tech" element={<WW2Tech />} />
          <Route path="*" element={<Navigate to="/ww2Tech" replace />} />
        </Routes>
      </Router>
    </ReactLenis>
  );
}

export default App;