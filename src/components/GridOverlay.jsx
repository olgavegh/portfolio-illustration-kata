function GridOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-9999">
      <div className="w-full max-w-350 mx-auto h-full px-md md:px-2xl">
        <div className="h-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-md">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`h-full bg-accent/10 border-x border-accent/30 ${i >= 4 ? 'hidden lg:block' : i >= 2 ? 'hidden md:block' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GridOverlay
