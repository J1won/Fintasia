import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'
import LoginPage from './LoginPage.tsx'
import ActionPage from './ActionPage.tsx'
import StartPage from './StartPage.tsx'
import VersionOnePage from './VersionOnePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/action" element={<ActionPage />} />
        <Route path="/versionOne" element={<VersionOnePage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
