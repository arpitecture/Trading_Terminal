import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import InstrumentList from './components/InstrumentList'

function App() {
  const [instruments, setInstruments] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/instruments')
      .then(res => res.json())
      .then(data => setInstruments(data))
  }, [])

  const filtered = instruments.filter(stock =>
    stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
    stock.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h1>Trading Terminal</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <InstrumentList instruments={filtered} />
    </div>
  )
}

export default App  