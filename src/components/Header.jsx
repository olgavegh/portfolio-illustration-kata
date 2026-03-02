import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSettings } from '../services/settings'
import { LuAtSign, LuInstagram } from 'react-icons/lu'

function Header() {
  const [settings, setSettings] = useState({})

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await getSettings()
        setSettings(data)
      } catch (error) {
        console.error('Error fetching settings:', error)
      }
    }
    fetchSettings()
  }, [])

  return (
    <header className="px-6 py-4 grid grid-cols-3 items-center">
      <Link to="/" className="font-serif text-xl">
        Kataco
      </Link>
      <nav className="text-center">
        <Link to="/about" className="typo-ui hover:text-accent transition-colors">
          About
        </Link>
      </nav>
      <div className="flex items-center justify-end gap-3 text-gray-500">
        {settings.instagram_url && (
          <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" title="Instagram">
            <LuInstagram size={20} />
          </a>
        )}
        {settings.contact_email && (
          <a href={`mailto:${settings.contact_email}`} className="hover:text-accent transition-colors" title={settings.contact_email}>
            <LuAtSign size={20} />
          </a>
        )}

      </div>
    </header>
  )
}

export default Header
