import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getSettings } from '../services/settings'
import { LuAtSign, LuInstagram } from 'react-icons/lu'

function Header({ onHeightChange }) {
  const [settings, setSettings] = useState({})
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const headerRef = useRef(null)

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

  // measure header height and report to MainLayout
  useEffect(() => {
    if (!headerRef.current || !onHeightChange) return
    const observer = new ResizeObserver(() => {
      onHeightChange(headerRef.current.offsetHeight)
    })
    observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [onHeightChange])

  // scroll listener
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      setVisible(current < 10 || current < lastScrollY.current)
      lastScrollY.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 bg-background ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="w-full max-w-400 mx-auto px-md md:px-lg py-md grid grid-cols-3 items-center">

        <Link to="/">
          {settings.logo_url
            ? <span
                style={{
                  backgroundColor: 'var(--color-logo)',
                  maskImage: `url(${settings.logo_url})`,
                  WebkitMaskImage: `url(${settings.logo_url})`,
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                }}
                className="block w-auto h-8"
                aria-label={settings.site_title ?? 'Logo'}
              />
            : <span className="typo-ui">{settings.site_title ?? 'Kataco'}</span>
          }
        </Link>
        <nav className="flex flex-row justify-center gap-md">
          <Link to="/" className="typo-ui hover:text-accent transition-colors">Works</Link>
          <Link to="/about" className="typo-ui hover:text-accent transition-colors">About</Link>
        </nav>
        <div className="flex items-center justify-end gap-3 text-text-muted">
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

      </div>
    </header>
  )
}

export default Header
