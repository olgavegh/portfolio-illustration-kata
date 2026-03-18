function MasonryGrid({ children }) {
  if (!children) {
    return (
      <p className="text-gray-500 text-center py-12">No artworks found</p>
    )
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xxl:columns-5 gap-4">
      {children.map((child, i) => (
        <div key={i} className="mb-4 break-inside-avoid">{child}</div>
      ))
      }
    </div>
  )
}

export default MasonryGrid
