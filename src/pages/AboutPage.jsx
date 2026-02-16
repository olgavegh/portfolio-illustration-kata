import { useState, useEffect, useRef } from 'react'
import { getPageBySlug } from '../services/pages'

function AboutPage() {
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const videoRef = useRef(null)

  useEffect(() => {
    async function fetchPage() {
      try {
        const data = await getPageBySlug('about')
        setPage(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPage()
  }, [])

  const handleVideoPlay = () => {
    videoRef.current?.play()
  }

  const handleVideoPause = () => {
    videoRef.current?.pause()
  }

  if (loading) {
    return <div className="px-6 py-8"><p className="text-gray-400">Loading...</p></div>
  }

  if (!page) {
    return <div className="px-6 py-8"><p className="text-gray-400">Page not found</p></div>
  }

  const { hero, content, details } = page.content

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto flex flex-col h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: text content */}
        <div>
          {hero && (
            <div className="mb-8">
              <h1 className="typo-hero mb-4">{hero.name}</h1>
              <p className="typo-tagline">{hero.tagline}</p>
            </div>
          )}

          {content && (
            <div className="typo-body mb-8">
              {content.intro && <p>{content.intro}</p>}
              {content.approach && <p>{content.approach}</p>}
            </div>
          )
          }

          {details && (
            <div className="grid grid-cols-2 gap-6">
              {details.map((item, index) => (
                <div key={index}>
                  <dt className="typo-label mb-1">{item.label}</dt>
                  <dd className="typo-body">
                    {item.link ? (
                      <a href={item.link} className="hover:text-accent transition-colors">{item.value}</a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: media */}
        {hero?.video && (
          <div
            className="cursor-pointer"
            onMouseEnter={handleVideoPlay}
            onMouseLeave={handleVideoPause}
            onTouchStart={handleVideoPlay}
            onTouchEnd={handleVideoPause}
          >
            <video
              ref={videoRef}
              src={hero.video}
              muted
              loop
              playsInline
              className="w-full rounded-sm"
            />
          </div>
        )}
      </div>
      {/* Closing — fills remaining space to footer */}
      {content && content.closing && (
        <div className="flex-1 flex items-center justify-center my-16 md:my-20">
          <p className="typo-body-emphasis text-center">{content.closing}</p>
        </div>
      )}
    </div>
  )
}

export default AboutPage
