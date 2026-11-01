import { useState, useEffect } from 'react'

function App() {
  const [health, setHealth] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/health')
      .then(res => res.json())
      .then(data => setHealth(data))
  }, [])

  return (
    <div>
      <h1>Trading Terminal</h1>
      <p>Backend status: {health ? health.status : 'Loading...'}</p>
    </div>
  )
}

export default App