import { useState, useEffect, useRef } from "react"

function ArtworkCard({ artwork, onClick, showSubtitle = true, index = 0 }) {
  // Subtitle priority: project_slug > nothing
  const subtitle = artwork.project_slug || null
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef(null)

  // after mount, check if already complete
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  return (
    <div
      style={{ transitionDelay: `${Math.min(index, 8) * 80}ms` }}
      className={`break-inside-avoid cursor-pointer group transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClick}
    >
      <div className="overflow-hidden rounded-sm">
        <img
          ref={imgRef}
          src={artwork.image}
          alt={artwork.title}
          className="w-full transition-transform duration-500 group-hover:scale-102"
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
      </div>
      {showSubtitle && (artwork.title || subtitle) && (
        <div className="mt-sm">
          {artwork.title && (
            <p className="typo-eyebrow">{artwork.title}</p>
          )}
          {subtitle && (
            <p className="typo-caption">{subtitle}</p>
          )}
        </div>
      )}
    </div>
  )


}

export default ArtworkCard
