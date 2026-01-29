import { useState, useEffect } from 'react'
import ViewProjectButton from './buttons/ViewProjectButton'

function ArtworkCardOverlay({ artwork, containerSize }) {
  const subtitle = artwork.project_slug || artwork.year || null
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  const subtitleHeight = 40 // h-10 = 2.5rem = 40px
  const horizontalMargin = 80 // mx-10 = 2.5rem * 2 = 80px

  // Available space for image
  const availableWidth = containerSize.width - horizontalMargin
  const availableHeight = containerSize.height - subtitleHeight
  console.log("width", containerSize.width, "height", containerSize.height)

  // Load image natural dimensions
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight })
    }
    img.src = artwork.image
  }, [artwork.image])

  // Calculate display dimensions (object-contain logic)
  let displayWidth = 0
  let displayHeight = 0

  if (imageSize.width > 0 && imageSize.height > 0 && availableWidth > 0 && availableHeight > 0) {
    const imageRatio = imageSize.width / imageSize.height
    const containerRatio = availableWidth / availableHeight

    // Peek effect: reduce width for landscape images in landscape container
    const peekPercent = 0.15
    let adjustedWidth = availableWidth

    if (imageRatio > containerRatio && imageRatio > 1) {
      // Landscape image would fill width - apply peek reduction
      adjustedWidth = availableWidth * (1 - peekPercent * 2)
    }

    // If image is wider relative to container, constrain by width; otherwise by height
    if (imageRatio > containerRatio) {
      displayWidth = adjustedWidth
      displayHeight = adjustedWidth / imageRatio
    } else {
      displayHeight = availableHeight
      displayWidth = availableHeight * imageRatio
    }
  }

  return (
    <div
      className="shrink-0 h-full flex flex-col mx-10"
      style={{ width: displayWidth || 'auto' }}
    >
      {/* Image container */}
      <div className="flex-1 flex items-center">
        <img
          src={artwork.image}
          alt={artwork.title}
          style={{ width: displayWidth, height: displayHeight }}
          className="rounded-sm object-contain"
        />
      </div>
      {/* Subtitle and View Project */}
      <div className="shrink-0 mt-2 flex justify-between items-end">
        <div>
          {artwork.title && (
            <p className="font-serif text-sm">{artwork.title}</p>
          )}
          {subtitle && (
            <p className="text-xs text-gray-400">{subtitle}</p>
          )}
        </div>
        {artwork.project_slug && (
          <ViewProjectButton slug={artwork.project_slug} />
        )}
      </div>
    </div>
  )
}

export default ArtworkCardOverlay
