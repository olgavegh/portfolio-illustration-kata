import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getSettings } from '../services/settings'
import { LuAtSign, LuInstagram } from 'react-icons/lu'
import Logo from './Logo'

function Header({ onHeightChange }) {
  const [settings, setSettings] = useState({})
  const [visible, setVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0)
  const headerRef = useRef(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!dialogRef.current) return
    menuOpen ? dialogRef.current.showModal() : dialogRef.current.close()
  }, [menuOpen])

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

        <Link to="/" className="col-span-2 md:col-span-1">
          <Logo url={settings.header_logo_url} title={settings.site_title} />
        </Link>
        <nav className="hidden md:flex flex-row justify-center gap-md">
          <Link to="/" className="typo-ui text-text-muted hover:text-accent active:text-accent transition-colors">Works</Link>
          <Link to="/about" className="typo-ui text-text-muted hover:text-accent active:text-accent transition-colors">About</Link>
        </nav>
        <div className="hidden md:flex items-center justify-end gap-3 text-text-muted">
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
        <button className="z-50 md:hidden text-text-primary ml-auto" onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <g className={`transition-opacity duration-700 ${menuOpen ? 'hidden opacity-0' : 'block opacity-100'}`}>
              <line x1="4" y1="9" x2="24" y2="9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="10" y1="15" x2="24" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="4" y1="21" x2="24" y2="21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            {/* <g className={`transition-opacity duration-700 ${menuOpen ? 'block opacity-100' : 'hidden opacity-0'}`}>
              <line x1="6" y1="6" x2="22" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="22" y1="6" x2="6" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </g> */}
          </svg>
        </button>

      </div>

      {menuOpen &&
        <dialog
          ref={dialogRef}
          onClose={() => setMenuOpen(false)}
          className="m-0 w-screen h-screen max-w-none max-h-none border-0 bg-surface flex flex-col px-md pb-2xl backdrop:bg-transparent open:animate-[slideUp_0.35s_ease-out]"
        >
          <div className="flex justify-between py-md">
            <Link to="/" className="w-full">
              <Logo url={settings.header_logo_url} title={settings.site_title} />
            </Link>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-text-primary">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <line x1="6" y1="6" x2="22" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="22" y1="6" x2="6" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-xs mt-auto mb-2xl">
            <Link to="/" onClick={() => setMenuOpen(false)} className="typo-display text-text-primary leading-tight hover:opacity-60 transition-opacity">Work</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="typo-display text-text-primary leading-tight hover:opacity-60 transition-opacity">About</Link>
          </nav>

          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-xs">
              {settings.instagram_url && <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="typo-ui text-text-muted hover:text-accent transition-colors">Instagram</a>}
              {settings.linkedin_url && <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="typo-ui text-text-muted hover:text-accent transition-colors">LinkedIn</a>}
            </div>
            {settings.contact_email && (
              <a href={`mailto:${settings.contact_email}`} className="typo-ui text-text-muted hover:text-accent transition-colors">{settings.contact_email}</a>
            )}
          </div>
        </dialog>
      }
    </header>
  )
}

export default Header
