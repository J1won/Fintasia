import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.tsx'
import LoginPage from './LoginPage.tsx'
import InvestPage from './InvestPage.tsx'
import LandingPage from './LandingPage.tsx'

const pages = {
  '/': App,
  '/login': LoginPage,
  '/invest': InvestPage,
  '/landing': LandingPage,
}

const Page = pages[window.location.pathname as keyof typeof pages] ?? App
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Page />
    </BrowserRouter>
  </StrictMode>,
)
