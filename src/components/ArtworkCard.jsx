function ArtworkCard({ artwork, onClick }) {
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
      {(artwork.title || subtitle) && (
        <div className="mt-2">
          {artwork.title && (
            <p className="font-serif text-sm">{artwork.title}</p>
          )}
          {subtitle && (
            <p className="text-xs text-gray-400">{subtitle}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default ArtworkCard
