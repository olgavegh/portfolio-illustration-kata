import { useState, useEffect } from 'react'

function SplashScreen({ visible }) {
  const [textIn, setTextIn] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setTextIn(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="flex items-center gap-xs">

        {/* Bird — logo color, pulsing */}
        <span
          className="w-20 h-20 lg:w-40 lg:h-40 shrink-0 block animate-pulse"
          style={{
            backgroundColor: 'var(--color-logo)',
            maskImage: 'url(/bird-black.svg)',
            WebkitMaskImage: 'url(/bird-black.svg)',
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
          }}
        />

        {/* Text — slides out from behind the bird */}
        <div className="overflow-hidden flex-1">
          <span
            className={`block h-20 w-25 lg:w-50 transition-transform duration-700 ease-out ${textIn ? 'translate-x-0' : '-translate-x-full'} animate-pulse`}
            style={{
              backgroundColor: 'var(--color-logo)',
              maskImage: 'url(/logo-text-right.svg)',
              WebkitMaskImage: 'url(/logo-text-right.svg)',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'left center',
            }}
          />
        </div>

      </div>
    </div>
  )
}

export default SplashScreen
