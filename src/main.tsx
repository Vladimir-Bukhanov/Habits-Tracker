import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ThemeState from './context/ThemeContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeState>
      <App />
    </ThemeState>
  </StrictMode>,
)
