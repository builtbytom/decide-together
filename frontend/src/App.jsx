import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SwipeView from './pages/SwipeView'
import ResultsView from './pages/ResultsView'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<SwipeView />} />
        <Route path="/results" element={<ResultsView />} />
      </Routes>
    </Router>
  )
}

export default App