import React from 'react'
import { Link } from 'react-router-dom'


function InstrumentList({ instruments }) {
  return (
    <ul>
      {instruments.map(stock => (
        <li key={stock.symbol}>
          <Link to={`/stocks/${stock.symbol}`}>
            {stock.symbol} - {stock.name} - ₹{stock.price}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default InstrumentList