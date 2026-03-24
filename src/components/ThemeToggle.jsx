import { useState } from 'react'

const THEMES = ['editorial', 'nature', 'dreamy']

function ThemeToggle() {
  const [current, setCurrent] = useState(
    document.documentElement.dataset.theme ?? 'editorial'
  )

  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
    setCurrent(theme)
  }

  return (
    <div className="flex gap-2">
      {THEMES.map(theme => (
        <button
          key={theme}
          onClick={() => setTheme(theme)}
          className={`typo-ui px-3 py-1 rounded-full transition-colors ${
            current === theme
              ? 'bg-accent text-white'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          {theme}
        </button>
      ))}
    </div>
  )
}

export default ThemeToggle
