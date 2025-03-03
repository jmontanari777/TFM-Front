import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "./components/organisms/Navbar/Navbar.jsx";
import TradingDashboard from "./Components/Tradingdashboard/TradingDashboard"
import PortfolioList from "./Components/portfolio/PortfolioList"
import "./App.css"; 

const App = () => (
  <BrowserRouter>
   <Navbar />
    <Routes>
      <Route path="/" element={<TradingDashboard />} />
      <Route path="/portfolios/:userId" element={<PortfolioList  />} />
    
      <Route
        path="*"
        element={
          <div className="text-center mt-10 text-lg font-medium">
            Página no encontrada
          </div>
        }
      />
    </Routes>
  </BrowserRouter>
)

export default App
