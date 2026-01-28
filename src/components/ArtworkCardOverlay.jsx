import { useState, useEffect } from 'react'

function ArtworkCardOverlay({ artwork, containerSize }) {
  const subtitle = artwork.project_slug || artwork.year || null
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  const subtitleHeight = 40 // h-10 = 2.5rem = 40px

  // Available space for image
  const availableWidth = containerSize.width
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

    // If image is wider relative to container, constrain by width; otherwise by height
    if (imageRatio > containerRatio) {
      displayWidth = availableWidth
      displayHeight = availableWidth / imageRatio
    } else {
      displayHeight = availableHeight
      displayWidth = availableHeight * imageRatio
    }
  }

  return (
    <div
      className="shrink-0 h-full flex flex-col"
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
      {/* Subtitle */}
      <div className="shrink-0 mt-2">
        {artwork.title && (
          <p className="font-serif text-sm">{artwork.title}</p>
        )}
        {subtitle && (
          <p className="text-xs text-gray-400">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

export default ArtworkCardOverlay
