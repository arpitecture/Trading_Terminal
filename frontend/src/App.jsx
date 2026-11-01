import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import StockDetail from './pages/StockDetail'

function App() {
  return (
    <BrowserRouter>
      <h1>Trading Terminal</h1>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/stocks/:symbol" element={<StockDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App