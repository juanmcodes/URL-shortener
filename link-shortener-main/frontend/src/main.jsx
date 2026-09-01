import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import Sparkles from './components/Particles/Sparkles.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Sparkles className="particles-bg"/>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
