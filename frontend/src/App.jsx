import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import StockDetail from './pages/StockDetail'
import Portfolio from './pages/Portfolio'

function App() {
  return (
    <BrowserRouter>
      <h1>Trading Terminal</h1>
      <nav><Link to="/">Dashboard</Link> | <Link to="/portfolio">Portfolio</Link></nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/stocks/:symbol" element={<StockDetail />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App