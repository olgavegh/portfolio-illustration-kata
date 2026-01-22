function ArtworkCard({ artwork, onClick }) {
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
    </div>
  )
}

export default ArtworkCard
