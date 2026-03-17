import Header from '../components/Header'
import Footer from '../components/Footer'

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-400 mx-auto flex flex-col flex-1">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
