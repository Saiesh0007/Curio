import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LearnerProvider } from './context/LearnerContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LearnerProvider>
      <App />
    </LearnerProvider>
  </StrictMode>,
)
