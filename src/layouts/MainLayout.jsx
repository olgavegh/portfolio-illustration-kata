import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MainLayout({ children }) {
  const [headerHeight, setHeaderHeight] = useState(0)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-400 mx-auto flex flex-col flex-1">
        <Header onHeightChange={setHeaderHeight} />
        <main className="flex-1 px-md md:px-lg" style={{ paddingTop: headerHeight }}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
