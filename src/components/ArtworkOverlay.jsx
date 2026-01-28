import { useState, useEffect, useRef } from 'react'
import CloseButton from './buttons/CloseButton'
import ArtworkCardOverlay from './ArtworkCardOverlay'

function ArtworkOverlay({ artwork, artworks, onClose, onNavigate }) {
  const containerRef = useRef(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })



  // swiper container padding for calculating 
  // py-8 = 2rem * 2 = 64px total vertical padding
  const verticalPadding = 64

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

        {/* Swiper container */}
        <div
          ref={containerRef}
          className="h-full overflow-hidden"
          style={{ paddingTop: verticalPadding / 2, paddingBottom: verticalPadding / 2 }}
        >
          {/* Swiper track */}
          <div className="h-full flex gap-20">
            <ArtworkCardOverlay artwork={artworks[0]} containerSize={containerSize} />
            <ArtworkCardOverlay artwork={artworks[1]} containerSize={containerSize} />
            <ArtworkCardOverlay artwork={artworks[2]} containerSize={containerSize} />
            <ArtworkCardOverlay artwork={artworks[3]} containerSize={containerSize} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtworkOverlay
