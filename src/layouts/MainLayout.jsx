import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GridOverlay from '../components/GridOverlay'
import ThemeToggle from '../components/ThemeToggle'



function MainLayout({ children }) {
  const [headerHeight, setHeaderHeight] = useState(0)

  return (
    <div className="min-h-screen flex flex-col">
      {/* <GridOverlay /> */}
      <ThemeToggle />
      <Header onHeightChange={setHeaderHeight} />
      <main className="w-full max-w-350 mx-auto my-2xl flex flex-col flex-1 px-md md:px-2xl" style={{ paddingTop: headerHeight, '--header-h': `${headerHeight}px` }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
