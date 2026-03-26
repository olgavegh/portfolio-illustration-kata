function MasonryGrid({ children }) {
  if (!children) {
    return (
      <p className="text-text-muted text-center py-2xl">No artworks found</p>
    )
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xxl:columns-5 gap-sm">
      {children.map((child, i) => (
        <div key={i} className="mb-md break-inside-avoid">{child}</div>
      ))
      }
    </div>
  )
}

export default MasonryGrid
