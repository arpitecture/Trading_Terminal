import { useState } from 'react'

function OrderForm({ symbol }) {
  const [side, setSide] = useState('BUY')
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      const res = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol, side, quantity: Number(quantity) })
      })
      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || 'Order failed')
        return
      }
      setMessage(`Order #${data.order.id} placed: ${side} ${quantity} ${symbol}`)
    } catch {
      setMessage('Could not reach the server')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Place order</h3>
      <select value={side} onChange={e => setSide(e.target.value)}>
        <option value="BUY">BUY</option>
        <option value="SELL">SELL</option>
      </select>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  )
}

export default OrderForm