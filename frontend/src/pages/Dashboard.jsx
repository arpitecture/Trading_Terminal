import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import InstrumentList from '../components/InstrumentList'

function Dashboard() {
  const [instruments, setInstruments] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
  const load = () =>
    fetch('http://localhost:3000/api/instruments')
      .then(res => res.json())
      .then(data => setInstruments(data))

        load()
        const id = setInterval(load, 1000)
        return () => clearInterval(id)
    }, [])

  const filtered = instruments.filter(stock =>
    stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
    stock.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <SearchBar search={search} setSearch={setSearch} />
      <InstrumentList instruments={filtered} />
    </div>
  )
}

export default Dashboard