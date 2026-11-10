
import { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard'
import { getBackendHealth } from './api/healthApi'
import './App.css'

function App() {
  const [apiConnected, setApiConnected] = useState(false)

  useEffect(() => {
    getBackendHealth()
      .then(health => setApiConnected(health.status === 'UP'))
      .catch(() => setApiConnected(false))
  }, [])

  return <Dashboard apiConnected={apiConnected} />
}

export default App
