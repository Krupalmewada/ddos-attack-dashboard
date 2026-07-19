import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import IncidentDetail from './pages/IncidentDetail'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/incidents/:id" element={<IncidentDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App