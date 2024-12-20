import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PredictionPage from "./components/PredictionPage";
import farmBackground from '/src/assets/farmBackground.jpg';

function App() {
  return (
    <Router>
      <div className="app" style={{ 
        backgroundImage: `url(${farmBackground})`,
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}>
        <div id="google_translate_element"></div>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/PredictionPage" element={<PredictionPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;