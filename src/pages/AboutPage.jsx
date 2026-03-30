import { useState, useEffect } from 'react'
import { getPageBySlug } from '../services/pages'

const GRID = 'layout-grid'

function AboutPage() {
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)

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

  if (loading) return <div className="py-xl"><p className="text-text-muted">Loading...</p></div>
  if (!page) return <div className="py-xl"><p className="text-text-muted">Page not found</p></div>

  const { hero, textcontent = [], services } = page.content
  const aboutSection = textcontent.find(s => s.label === 'About')
  const journeySection = textcontent.find(s => s.label === 'Journey')

  return (
    <div className="flex flex-col gap-3xl py-xl">

      {/* ── Hero ── */}
      <section className={GRID}>
        <div className="col-span-2 md:col-span-3 lg:col-span-4 flex flex-col gap-sm">
          {hero?.tagline && <p className="typo-label">{hero.tagline}</p>}
          {hero?.title && <h1 className="typo-display">{hero.title}</h1>}
        </div>
      </section>

      {/* ── About ── */}
      {aboutSection && (
        <section className={GRID}>
          <div className="col-span-1">
            <span className="typo-label">{aboutSection.label}</span>
          </div>
          <div className="col-span-2 md:col-span-3 lg:col-span-5 flex flex-col gap-md">
            {aboutSection.paragraphs.map((text, i) => (
              <p key={i} className="typo-body">{text}</p>
            ))}
          </div>
        </section>
      )}

      {/* ── Services ── */}
      {services && (
        <section>
          <div className={GRID}>
            <div className="col-span-1 mb-sm">
              <span className="typo-label">{services.label}</span>
            </div>
            <div className="col-span-2 md:col-span-3 lg:col-span-5 flex flex-col gap-md">
              {services.desc && <p className="typo-body">{services.desc}</p>}
            </div>
          </div>
          <div className={`${GRID} my-2xl`}>
            {services.cards?.map((card, i) => (
              <div key={i} className="col-span-2 md:col-span-2 bg-surface-raised p-xl flex flex-col gap-md rounded-sm">
                {card.icon && (
                  <span style={{
                    display: 'inline-block',
                    width: '1.5rem',
                    height: '1.5rem',
                    backgroundColor: 'var(--color-accent)',
                    maskImage: `url(${card.icon})`,
                    WebkitMaskImage: `url(${card.icon})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                  }} />
                )}
                <p className="typo-card-title">{card.title}</p>
                <div>
                  <p className="typo-body">{card.desc}</p>
                  {card.details && <p className="typo-eyebrow mt-xs text-accent">{card.details}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Journey ── */}
      {journeySection && (
        <section className={GRID}>
          <div className="col-span-1 flex flex-col gap-xs">
            <span className="typo-label">{journeySection.label}</span>
            {journeySection.title && <p className="typo-subtitle">{journeySection.title}</p>}
          </div>
          <div className="col-span-2 md:col-span-3 lg:col-span-5 flex flex-col gap-md">
            {journeySection.paragraphs.map((text, i) => (
              <p key={i} className="typo-body">{text}</p>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}

export default AboutPage
