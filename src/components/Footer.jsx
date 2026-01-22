import { useState, useEffect } from 'react'
import { getSettings } from '../services/settings'

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
    <footer className="px-6 py-8 text-sm text-gray-500">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          {settings.contact_email && (
            <a
              href={`mailto:${settings.contact_email}`}
              className="hover:text-accent transition-colors"
            >
              {settings.contact_email}
            </a>
          )}
          {settings.location && (
            <span>{settings.location}</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {settings.instagram_url && (
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Instagram
            </a>
          )}
          {settings.behance_url && (
            <a
              href={settings.behance_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Behance
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
