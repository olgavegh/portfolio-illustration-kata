import { useState, useEffect, useRef, Fragment } from 'react'
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
    <div className="px-6 py-8 mx-auto flex flex-col h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Left: label-content sub-grid */}
        <div>
          {/* Hero — spans full left column */}
          {hero && (
            <div className="mb-12">
              {hero.tagline && (
                <p className="typo-label mb-2">{hero.tagline}</p>
              )}
              <h1 className="typo-hero">{hero.name}</h1>
            </div>
          )}

          {/* Content rows: label | paragraphs */}
          {content && content.length > 0 && (
            <div className="grid grid-cols-[5rem_1fr] gap-4 mb-8">
              {content.map((section, index) => (
                <Fragment key={index}>
                  <span className="typo-label pt-1">{section.label}</span>
                  <div className="typo-body space-y-3">
                    {section.paragraphs.map((text, i) => (
                      <p key={i}>{text}</p>
                    ))}
                  </div>
                </Fragment>
              ))}
            </div>
          )}

          {/* Details rows: label | values */}
          {details && details.map((item, index) => (
            <div key={index} className="grid grid-cols-[5rem_1fr] gap-4 mb-4">
              <span className="typo-label pt-1">{item.label}</span>
              <span className="typo-body">
                {item.link ? (
                  <a href={item.link} className="hover:text-accent transition-colors">{item.value}</a>
                ) : (
                  item.value
                )}
              </span>
            </div>
          ))}
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


    </div>
  )
}

export default AboutPage
