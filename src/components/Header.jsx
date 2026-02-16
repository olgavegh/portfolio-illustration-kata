import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="px-6 py-4 flex justify-between items-center">
      <Link to="/" className="font-serif text-xl">
        Kataco
      </Link>
      <nav>
        <Link to="/about" className="typo-ui hover:text-accent transition-colors">
          About
        </Link>
      </nav>
    </header>
  )
}

export default Header
