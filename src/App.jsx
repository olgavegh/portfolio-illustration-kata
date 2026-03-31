import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectPage from './pages/ProjectPage'
import SplashScreen from './components/SplashScreen'

const SPLASH_DURATION = 2500 // ms

function App() {
  const [splash, setSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setSplash(false), SPLASH_DURATION)
    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <SplashScreen visible={splash} />
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/project/:slug" element={<ProjectPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
