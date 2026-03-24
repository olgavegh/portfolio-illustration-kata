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
    return <div className="px-lg py-xl"><p className="text-text-muted">Loading...</p></div>
  }

  if (!page) {
    return <div className="px-lg py-xl"><p className="text-text-muted">Page not found</p></div>
  }

  const { hero, content, details } = page.content

  return (
    <div className="px-lg mx-auto flex flex-col h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2xl">

        {/* Left: label-content sub-grid */}
        <div>
          {/* Hero — spans full left column */}
          {hero && (
            <div className="mb-2xl">
              {hero.tagline && (
                <p className="typo-label mb-sm">{hero.tagline}</p>
              )}
              <h1 className="typo-title">{hero.name}</h1>
            </div>
          )}

          {/* Content rows: label | paragraphs */}
          {content && content.length > 0 && (
            <div className="grid grid-cols-[5rem_1fr] gap-md mb-xl">
              {content.map((section, index) => (
                <Fragment key={index}>
                  <span className="typo-label pt-xs">{section.label}</span>
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
            <div key={index} className="grid grid-cols-[5rem_1fr] gap-md mb-md">
              <span className="typo-label pt-xs">{item.label}</span>
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
