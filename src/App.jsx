import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import IncidentDetail from './pages/IncidentDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/incidents/:id" element={<IncidentDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App