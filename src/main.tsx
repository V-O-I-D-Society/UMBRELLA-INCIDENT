import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import App from './App.tsx'
import WTF from './pages/WTF.tsx'
import RedTeam from './pages/RedTeam.tsx'
import BlueTeam from './pages/BlueTeam.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/wtf" element={<WTF />} />
        <Route path="/red-team" element={<RedTeam />} />
        <Route path="/blue-team" element={<BlueTeam />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
