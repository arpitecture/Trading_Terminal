import React from 'react'

function InstrumentList({ instruments }) {
  return (
    <ul>
      {instruments.map(stock => (
        <li key={stock.symbol}>
          {stock.symbol} - {stock.name} - ₹{stock.price}
        </li>
      ))}
    </ul>
  )
}

export default InstrumentList