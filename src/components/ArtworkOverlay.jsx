import { useState, useEffect, useRef } from 'react'
import CloseButton from './buttons/CloseButton'
import NavArrowButton from './buttons/NavArrowButton'
import ArtworkCardOverlay from './ArtworkCardOverlay'

function ArtworkOverlay({ artwork, artworks, onClose, onNavigate }) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [translateX, setTranslateX] = useState(0)

  // Current focused image index
  const currentIndex = artworks.findIndex((a) => a.id === artwork.id)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < artworks.length - 1

  // Calculate translateX to center current card
  useEffect(() => {
    const calculatePosition = () => {
      if (!trackRef.current || containerSize.width === 0) return

      const cards = trackRef.current.children
      if (cards.length === 0 || currentIndex < 0) return

      // Get the current card
      const currentCard = cards[currentIndex]
      if (!currentCard) return

      // Calculate position to center the card
      const cardLeft = currentCard.offsetLeft
      const cardWidth = currentCard.offsetWidth
      const cardCenter = cardLeft + cardWidth / 2
      const containerCenter = containerSize.width / 2

      setTranslateX(containerCenter - cardCenter)
    }

    // Calculate immediately
    calculatePosition()

    // Recalculate after images load (small delay for DOM update)
    const timeout = setTimeout(calculatePosition, 100)
    return () => clearTimeout(timeout)
  }, [currentIndex, containerSize.width])

  // Navigation functions
  const goToPrev = () => {
    if (hasPrev) {
      onNavigate(artworks[currentIndex - 1])
    }
  }

  const goToNext = () => {
    if (hasNext) {
      onNavigate(artworks[currentIndex + 1])
    }
  }



  // swiper container padding for calculating
  // py-10 = 2.5rem * 2 = 80px total vertical padding
  const verticalPadding = 80

  // Get container dimensions on mount and resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight - verticalPadding,
        })
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-5">
      {/* Blurred dark backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Overlay canvas */}
      <div className="relative bg-white rounded-sm w-full h-full max-w-5xl">
        <CloseButton onClick={onClose} />
        {hasPrev && <NavArrowButton direction="left" onClick={goToPrev} />}
        {hasNext && <NavArrowButton direction="right" onClick={goToNext} />}

        {/* Swiper container */}
        <div
          ref={containerRef}
          className="h-full overflow-hidden"
          style={{ paddingTop: verticalPadding / 2, paddingBottom: verticalPadding / 2 }}
        >
          {/* Swiper track */}
          <div
            ref={trackRef}
            className="h-full flex transition-transform duration-300"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {artworks.map((art) => (
              <ArtworkCardOverlay key={art.id} artwork={art} containerSize={containerSize} />
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtworkOverlay
