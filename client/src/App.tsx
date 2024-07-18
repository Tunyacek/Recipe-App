import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Recipepage } from './Pages/Recipepage'
import { Homepage } from './Pages/Homepage'
import { Createpage } from './Pages/Createpage'
import { Titlepage } from './Pages/Titlepage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Titlepage />} />
        <Route path="/recipes" element={<Homepage />} />
        <Route path="/recipes/:id" element={<Recipepage />} />
        <Route path="/add-recipe" element={<Createpage />} />
      </Routes>
    </Router>
  )
}

export default App
