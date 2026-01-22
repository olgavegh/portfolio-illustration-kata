import ArtworkCard from './ArtworkCard'

function MasonryGrid({ artworks, onArtworkClick }) {
  if (!artworks || artworks.length === 0) {
    return (
      <p className="text-gray-500 text-center py-12">No artworks found</p>
    )
  }

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          onClick={() => onArtworkClick?.(artwork)}
        />
      ))}
    </div>
  )
}

export default MasonryGrid
