import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import App3 from './pages/login/App3.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <App3 /> */}
  </StrictMode>,

)
