import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import OrderForm from '../components/OrderForm'

function StockDetail() {
  const { symbol } = useParams()
  const [stock, setStock] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
  const load = () =>
    fetch(`http://localhost:3000/api/instruments/${symbol}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then(data => setStock(data))
      .catch(() => setError('Instrument not found'))

  load()
  const id = setInterval(load, 1000)
  return () => clearInterval(id)
}, [symbol])

  if (error) return <p>{error}</p>
  if (!stock) return <p>Loading...</p>

  return (
    <div>
      <Link to="/">← Back</Link>
      <h2>{stock.symbol}</h2>
      <p>{stock.name}</p>
      <p>Price: ₹{stock.price}</p>
      <OrderForm symbol={stock.symbol} />
    </div>
  )
}

export default StockDetail