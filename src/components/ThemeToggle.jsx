import { useState } from 'react'

const THEMES = [
  { key: 'editorial', color: 'white' },
  { key: 'dreamy', color: '#232654' },
]

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
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-xs p-xs bg-surface-raised rounded-r-md shadow-sm">
      {THEMES.map(({ key, color }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          title={key}
          style={{ backgroundColor: color }}
          className={`w-6 h-6 rounded-full transition-all ${current === key
              ? 'ring-2 ring-offset-2 ring-text-primary scale-110'
              : 'opacity-60 hover:opacity-100'
            }`}
        />
      ))}
    </div>
  )
}

export default ThemeToggle
