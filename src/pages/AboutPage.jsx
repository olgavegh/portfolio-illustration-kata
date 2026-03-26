import { useState, useEffect } from 'react'
import { getPageBySlug } from '../services/pages'

// Primary grid — 2/3/4 cols
const GRID = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'
// Three-card grid — services exception
const GRID_3 = 'grid grid-cols-2 md:grid-cols-6 lg:grid-cols-9 gap-3'

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
  if (!page)   return <div className="py-xl"><p className="text-text-muted">Page not found</p></div>

  const { hero, textcontent = [], gallery = [] } = page.content
  const aboutSection   = textcontent.find(s => s.label === 'About')
  const journeySection = textcontent.find(s => s.label === 'Journey')

  return (
    <div className="flex flex-col gap-3xl py-xl">

      {/* ── Hero ── */}
      <section className={GRID}>
        <div className="col-span-2 md:col-span-2 lg:col-span-3 lg:col-start-2 flex flex-col gap-sm">
          {hero?.tagline && <p className="typo-label">{hero.tagline}</p>}
          {hero?.title   && <h1 className="typo-display">{hero.title}</h1>}
        </div>
      </section>

      {/* ── About ── */}
      {aboutSection && (
        <section className={GRID}>
          {/* Label col */}
          <div className="col-span-2 md:col-span-1">
            <span className="typo-label">{aboutSection.label}</span>
          </div>
          {/* Paragraphs */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3 flex flex-col gap-md">
            {aboutSection.paragraphs.map((text, i) => (
              <p key={i} className="typo-body">{text}</p>
            ))}
          </div>
        </section>
      )}

      {/* ── Gallery ── */}
      <section className={GRID}>
        {(gallery.length > 0 ? gallery : [{}, {}, {}]).map((item, i) => (
          <div key={i} className="col-span-1 aspect-square bg-surface rounded-sm overflow-hidden">
            {item.src
              ? <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
              : <div className="w-full h-full flex items-center justify-center">
                  <span className="typo-label">Image {i + 1}</span>
                </div>
            }
          </div>
        ))}
      </section>

      {/* ── Services (placeholder — schema pending) ── */}
      <section className={GRID_3}>
        <div className="col-span-2 md:col-span-6 lg:col-span-9 mb-sm">
          <span className="typo-label">Services</span>
        </div>
        {['Editorial Illustration', 'Book & Cover Design', 'Educational Illustration'].map((name, i) => (
          <div key={i} className="col-span-1 md:col-span-2 lg:col-span-3 bg-surface p-md flex flex-col gap-sm rounded-sm">
            <p className="typo-eyebrow">{name}</p>
            <p className="typo-body text-text-muted">Placeholder — content coming from CMS.</p>
          </div>
        ))}
      </section>

      {/* ── Journey ── */}
      {journeySection && (
        <section className={GRID}>
          {/* Label + optional section title */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-xs">
            <span className="typo-label">{journeySection.label}</span>
            {journeySection.title && <p className="typo-subtitle">{journeySection.title}</p>}
          </div>
          {/* Paragraphs */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3 flex flex-col gap-md">
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
