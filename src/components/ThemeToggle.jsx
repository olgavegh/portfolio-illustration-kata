import { useState, useEffect } from 'react'
import { getSetting } from '../services/settings'

function ThemeToggle() {
  const [darkTheme, setDarkTheme] = useState(
    () => document.documentElement.dataset.theme === 'dark'
  )
  const [lightIcon, setLightIcon] = useState(null)
  const [darkIcon, setDarkIcon] = useState(null)

  useEffect(() => {
    async function fetchIcons() {
      try {
        const [light, dark] = await Promise.all([
          getSetting('themelight_icon_url'),
          getSetting('themedark_icon_url'),
        ])
        setLightIcon(light)
        setDarkIcon(dark)
      } catch (error) {
        console.error('Error fetching theme icons:', error)
      }
    }
    fetchIcons()
  }, [])

  const toggle = () => {
    setDarkTheme(prev => {
      const next = !prev
      const theme = next ? 'dark' : 'light'
      document.documentElement.dataset.theme = theme
      localStorage.setItem('theme', theme)
      return next
    })
  }

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <button
        onClick={toggle}
        title={darkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
        className="w-12 h-12 transition-transform hover:scale-110 bg-accent rounded-full p-1"
      >
        {(darkTheme ? darkIcon : lightIcon)
          ? <img
            src={darkTheme ? darkIcon : lightIcon}
            alt=""
            className="w-full h-full object-contain"
            style={{ filter: darkTheme ? 'invert(0)' : 'invert(1)' }}
          />
          : <span className="block w-full h-full rounded-full" style={{ backgroundColor: darkTheme ? 'white' : '#232654' }} />
        }
      </button>
    </div>
  )
}

export default ThemeToggle
