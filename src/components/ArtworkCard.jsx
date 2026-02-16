function ArtworkCard({ artwork, onClick, showSubtitle = true }) {
  // Subtitle priority: project_slug > year > nothing
  const subtitle = artwork.project_slug || artwork.year || null

  return (
    <div
      className="mb-4 break-inside-avoid cursor-pointer group"
      onClick={onClick}
    >
      <img
        src={artwork.image}
        alt={artwork.title}
        className="w-full rounded-sm transition-opacity duration-300 group-hover:opacity-90"
        loading="lazy"
      />
      {showSubtitle && (artwork.title || subtitle) && (
        <div className="mt-2">
          {artwork.title && (
            <p className="typo-subtitle">{artwork.title}</p>
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
