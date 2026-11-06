import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Portfolio() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const load = () =>
      fetch('http://localhost:3000/api/portfolio')
        .then(res => res.json())
        .then(setData)

    load()
    const id = setInterval(load, 1000)
    return () => clearInterval(id)
  }, [])

  if (!data) return <p>Loading...</p>

  return (
    <div>
      <Link to="/">← Back</Link>
      <h2>Portfolio</h2>
      <p>Cash: ₹{data.cash}</p>
      <p>Market value: ₹{data.totalMarketValue}</p>
      <p>Total equity: ₹{data.totalEquity}</p>
      <p>Unrealized P&L: ₹{data.totalUnrealizedPnl}</p>
      <p>Realized P&L: ₹{data.realizedPnL}</p>

      <h3>Holdings</h3>
      {data.holdings.length === 0 ? (
        <p>No holdings yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Symbol</th><th>Qty</th><th>Avg</th>
              <th>LTP</th><th>Value</th><th>P&L</th>
            </tr>
          </thead>
          <tbody>
            {data.holdings.map(h => (
              <tr key={h.symbol}>
                <td>{h.symbol}</td>
                <td>{h.quantity}</td>
                <td>{h.avgPrice}</td>
                <td>{h.currentPrice}</td>
                <td>{h.marketValue}</td>
                <td>{h.unrealizedPnl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Portfolio