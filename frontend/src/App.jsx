import { useState, useEffect } from 'react'

function App() {
  const [instruments, setinstruments] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/instruments')
      .then(res => res.json())
      .then(data => setinstruments(data))
  }, [])

  return (
    <div>
      <h1>Trading Terminal</h1>
      <ul>
        {instruments.map(stock=>{
          return(<li key={stock.symbol}>
            {stock.symbol} - {stock.name} - ₹{stock.price}
          </li>)
        })}
      </ul>
    </div>
  )
}

export default App