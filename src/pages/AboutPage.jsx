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

  const { meta, hero, content, details } = page.content

  return (
    <div className="px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

        {/* Left column: video + details */}
        <div className="md:col-span-1">
          <div
            className="cursor-pointer mb-6"
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

          {/* Details list */}
          {details && (
            <dl className="space-y-3 text-sm">
              {details.map((item, index) => (
                <div key={index}>
                  <dt className="typo-label">{item.label}</dt>
                  <dd className="text-gray-600 mt-0.5">
                    {item.link ? (
                      <a href={item.link} className="hover:text-accent transition-colors">{item.value}</a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* Right column: hero + content */}
        <div className="md:col-span-2">
          {hero && (
            <div className="mb-10">
              <h1 className="typo-hero mb-3">{hero.name}</h1>
              <p className="typo-tagline">{hero.tagline}</p>
            </div>
          )}

          {meta && (
            <p className="typo-label mb-8">{meta.label}</p>
          )}

          {content && (
            <div className="typo-body space-y-4 max-w-xl">
              {content.intro && <p>{content.intro}</p>}
              {content.approach && <p>{content.approach}</p>}
              {content.closing && <p className="typo-body-emphasis">{content.closing}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AboutPage
