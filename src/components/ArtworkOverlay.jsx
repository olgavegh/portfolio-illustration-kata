import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

function ArtworkOverlay({ artwork, artworks, onClose, onNavigate }) {
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const overlayRef = useRef(null)

  const currentIndex = artworks.findIndex((a) => a.id === artwork.id)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < artworks.length - 1

  const goToPrev = () => {
    if (hasPrev) onNavigate(artworks[currentIndex - 1])
  }

  const goToNext = () => {
    if (hasNext) onNavigate(artworks[currentIndex + 1])
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  // Prevent body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Touch handlers for swipe
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) goToNext()
    if (isRightSwipe) goToPrev()
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-white z-50 flex flex-col"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 hover:text-accent transition-colors"
        aria-label="Close"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        {/* Prev arrow - hidden on mobile */}
        <button
          onClick={goToPrev}
          disabled={!hasPrev}
          className={`hidden md:block absolute left-4 p-2 transition-colors ${
            hasPrev ? 'hover:text-accent' : 'opacity-30 cursor-not-allowed'
          }`}
          aria-label="Previous"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Image */}
        <img
          src={artwork.image}
          alt={artwork.title}
          className="max-h-full max-w-full object-contain"
        />

        {/* Next arrow - hidden on mobile */}
        <button
          onClick={goToNext}
          disabled={!hasNext}
          className={`hidden md:block absolute right-4 p-2 transition-colors ${
            hasNext ? 'hover:text-accent' : 'opacity-30 cursor-not-allowed'
          }`}
          aria-label="Next"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Bottom info */}
      <div className="px-6 pb-6 text-center">
        <p className="font-serif text-lg">{artwork.title}</p>
        {artwork.year && (
          <p className="text-sm text-gray-400 mt-1">{artwork.year}</p>
        )}
        {artwork.project_slug && (
          <Link
            to={`/project/${artwork.project_slug}`}
            className="inline-block mt-3 px-4 py-2 text-sm border border-gray-300 rounded-full hover:border-accent hover:text-accent transition-colors"
          >
            View Project
          </Link>
        )}
      </div>
    </div>
  )
}

export default ArtworkOverlay
