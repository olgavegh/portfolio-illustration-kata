import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSettings } from '../services/settings'
import Logo from './Logo'

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
    <footer className=" border-t border-stroke-weak overflow-hidden">
      <div className="w-full max-w-350 mx-auto px-md md:px-2xl py-2xl">
        {/* ── Top section ── */}
        <div className="layout-grid mb-2xl">

          {/* Headline + CTA — cols 1-5 */}
          <div className="col-span-2 md:col-span-3 lg:col-span-5 lg:max-w-4/5">
            <h2 className="typo-display text-text-primary leading-tight max-w-[90%]">
              {settings.footer_message ?? 'Let\'s give your story a powerful visual language.'}
              {settings.footer_movingicon && (
                <span
                  className="inline-block w-[0.7em] h-[0.7em] align-middle animate-spin [animation-duration:4s]"
                  style={{
                    backgroundColor: 'var(--color-text-primary)',
                    maskImage: `url(${settings.footer_movingicon})`,
                    WebkitMaskImage: `url(${settings.footer_movingicon})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                  }}
                />
              )}
            </h2>

            <div className="mt-2xl">
              {settings.contact_email && (
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="typo-ui uppercase tracking-widest text-text-muted border-b border-text-muted pb-px hover:text-accent hover:border-accent transition-colors"
                >
                  Say Hello
                </a>
              )}
            </div>
          </div>

          {/* Contact details — col 6, aligned bottom */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1 flex flex-col justify-end gap-xl mt-xl lg:mt-0">
            <div>
              <p className="typo-label text-text-muted mb-xs">Contact</p>
              {settings.contact_email && (
                <a href={`mailto:${settings.contact_email}`} className="typo-ui text-text-primary hover:text-accent transition-colors block">
                  {settings.contact_email}
                </a>
              )}
            </div>
            {settings.location && (
              <div>
                <p className="typo-label text-text-muted mb-xs">Location</p>
                <p className="typo-ui text-text-primary">{settings.location}</p>
                <p className="typo-ui text-text-muted">Available worldwide</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="layout-grid pt-lg border-t border-stroke-weak items-end">

          {/* Name — cols 1-2 */}
          <div className="col-span-2 lg:col-span-4 mb-lg md:mb-0">
            <Logo url={settings.footer_logo_url} title={settings.site_title} className="w-auto h-lg md:h-xl" />

          </div>

          {/* Social links — col 3-4 */}
          <nav className="col-span-1 flex flex-col gap-xs">
            {settings.instagram_url && (
              <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="typo-ui text-text-muted hover:text-accent transition-colors">Instagram</a>
            )}
            {settings.behance_url && (
              <a href={settings.behance_url} target="_blank" rel="noopener noreferrer" className="typo-ui text-text-muted hover:text-accent transition-colors">Behance</a>
            )}
            {settings.linkedin_url && (
              <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="typo-ui text-text-muted hover:text-accent transition-colors">LinkedIn</a>
            )}
          </nav>

          {/* Copyright — last col */}
          <div className="col-span-1 flex flex-col items-end md:items-start">
            <p className="typo-caption text-text-muted">© {new Date().getFullYear()} {settings.copyright}</p>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
