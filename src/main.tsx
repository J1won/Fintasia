import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import LoginPage from './LoginPage.tsx'
import SavePage from './SavePage.tsx'
import StartPage from './StartPage.tsx'
import LandingPage from './LandingPage.tsx'
import VersionOnePage from './VersionOnePage.tsx'

const pages = {
  '/': LoginPage,
  '/save': SavePage,
  '/invest': StartPage,
  '/landing': LandingPage,
  '/versionOne': VersionOnePage,
}

const Page = pages[window.location.pathname as keyof typeof pages] ?? LoginPage
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Page />
    </BrowserRouter>
  </StrictMode>,
)
