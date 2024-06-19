import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Recipepage } from './Pages/Recipepage'
import { Homepage } from './Pages/Homepage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/recipes" element={<Homepage />} />
        <Route path="/recipes/:id" element={<Recipepage />} />
      </Routes>
    </Router>
  )
}

export default App
