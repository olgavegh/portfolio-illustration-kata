function MasonryGrid({ children }) {
  if (!children) {
    return (
      <p className="text-gray-500 text-center py-12">No artworks found</p>
    )
  }

  return (
    <div className="columns-1 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
      {children}
    </div>
  )
}

export default MasonryGrid
