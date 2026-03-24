import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSettings } from '../services/settings'
import ThemeToggle from "./ThemeToggle"

function Footer() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await getSettings()
        setSettings(data)
      } catch (error) {
        console.error('Error fetching settings:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  if (loading) return null

  return (
    <footer className="px-lg py-2xl border-t border-border">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-xl mb-xl">
        {/* Explore */}
        <div>
          <p className="typo-label mb-3">Explore</p>
          <nav className="flex flex-col gap-sm">
            <Link to="/" className="typo-ui text-text-muted hover:text-accent transition-colors">Work</Link>
            <Link to="/about" className="typo-ui text-text-muted hover:text-accent transition-colors">About</Link>
          </nav>
        </div>

        {/* Follow */}
        <div>
          <p className="typo-label mb-3">Follow</p>
          <nav className="flex flex-col gap-sm">
            {settings.instagram_url && (
              <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="typo-ui text-text-muted hover:text-accent transition-colors">Instagram</a>
            )}
            {settings.behance_url && (
              <a href={settings.behance_url} target="_blank" rel="noopener noreferrer" className="typo-ui text-text-muted hover:text-accent transition-colors">Behance</a>
            )}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <p className="typo-label mb-3">Contact</p>
          <div className="flex flex-col gap-sm">
            {settings.contact_email && (
              <a href={`mailto:${settings.contact_email}`} className="typo-ui text-text-muted hover:text-accent transition-colors">{settings.contact_email}</a>
            )}
          </div>
        </div>

        {/* Location */}
        {settings.location && (
          <div>
            <p className="typo-label mb-3">Based in</p>
            <p className="typo-ui text-text-muted">{settings.location}</p>
          </div>
        )}
      </div>

      {/* Bottom credits */}
      <p className="typo-caption text-gray-300">
        {new Date().getFullYear()} Kataco
      </p>
      <ThemeToggle />
    </footer>
  )
}

export default Footer
