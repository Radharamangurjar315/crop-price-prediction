import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PredictionPage from "./components/PredictionPage";
import DashboardPage from "./components/DashboardPage";
// import ReqPrediction from "./components/ReqPrediction";
import ChatComponent from "./components/ChatComponent";
import './components/PredictionPage.css';
import './components/ChatComponent.css';
import "./components/Home.css";
import Analysis from "./components/Analysis";
import Recommendation from "./components/Recommendation";

function App() {
  return (
    <Router>
      <div className="app">
        
        <Navbar />
        <div id="google_translate_element"></div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/DashboardPage" element={<DashboardPage />} />
            <Route path="/Chat" element={<ChatComponent />} />
            <Route path="/Analysis" element={<Analysis />} />
            <Route path="/Recommendation" element={<Recommendation/>} />
            <Route path="/PredictionPage" element={
              <>
                <div className="prediction-container">
                  <PredictionPage />
                  {/* <ReqPrediction /> */}
                </div>
              </>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;