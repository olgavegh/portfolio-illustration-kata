import { useState, useEffect } from 'react'
import { getPageBySlug } from '../services/pages'
import EmblaCarousel from '../components/EmblaCarousel'

// Single grid — 4 / 6 / 9 cols across all breakpoints
const GRID = 'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3'
const OPTIONS = { dragFree: true, loop: true }

// Grid: gap = 0.75rem (gap-3), padding: 1rem mobile / 1.5rem md+
// Slide spans 2 of 4 cols (mobile), 2 of 6 (tablet), 3 of 9 (desktop)
function getSlideSize() {
  // const w = window.innerWidth
  // if (w >= 1024) return 'calc((100vw - 3rem - 8 * 0.75rem) / 9 * 3 + 2 * 0.75rem)'
  // if (w >= 768) return 'calc((100vw - 3rem - 5 * 0.75rem) / 6 * 2 + 0.75rem)'
  // return 'calc((100vw - 2rem - 3 * 0.75rem) / 4 * 2 + 0.75rem)'
  return '65%'
}

function useSlideSize() {
  const [slideSize, setSlideSize] = useState(getSlideSize)
  useEffect(() => {
    const handler = () => setSlideSize(getSlideSize())
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return slideSize
}

const PLACEHOLDER_SLIDES = [
  { type: 'image', src: '', alt: '' },
  { type: 'video', src: '', poster: '' },
  { type: 'image', src: '', alt: '' },
]



function AboutPage() {
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const slideSize = useSlideSize()

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

  const { hero, textcontent = [], gallery = [] } = page.content
  const aboutSection = textcontent.find(s => s.label === 'About')
  const journeySection = textcontent.find(s => s.label === 'Journey')

  return (
    <div className="flex flex-col gap-3xl py-xl">

      {/* ── Hero ── */}
      <section className={GRID}>
        <div className="col-span-4 lg:col-span-6 col-start-1 flex flex-col gap-sm">
          {hero?.tagline && <p className="typo-label">{hero.tagline}</p>}
          {hero?.title && <h1 className="typo-display">{hero.title}</h1>}
        </div>
      </section>

      {/* ── About ── */}
      {aboutSection && (
        <section className={GRID}>
          <div className="col-span-4 sm:col-span-1">
            <span className="typo-label">{aboutSection.label}</span>
          </div>
          <div className="col-span-4 flex flex-col gap-md">
            {aboutSection.paragraphs.map((text, i) => (
              <p key={i} className="typo-body">{text}</p>
            ))}
          </div>
        </section>
      )}

      {/* ── Gallery ── */}
      <section className={GRID}>
        <div className="col-span-4 sm:col-span-1">
          <svg
            viewBox="0 0 60 52"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-14 text-text-muted"
          >
            {/* Body */}
            <rect x="10" y="22" width="30" height="18" rx="9" />
            {/* Head */}
            <circle cx="44" cy="18" r="10" />
            {/* Snout */}
            <ellipse cx="51" cy="22" rx="5" ry="3.5" />
            {/* Nose */}
            <circle cx="53" cy="21" r="1.5" fill="currentColor" stroke="none" />
            {/* Eye */}
            <circle cx="46" cy="15" r="1.5" fill="currentColor" stroke="none" />
            {/* Floppy ear */}
            <path d="M39 10 C36 3 30 4 32 12" />
            {/* Legs */}
            <line x1="18" y1="40" x2="18" y2="51" />
            <line x1="26" y1="40" x2="26" y2="51" />
            <line x1="32" y1="40" x2="32" y2="51" />
            <line x1="38" y1="40" x2="38" y2="51" />
            {/* Tail — wags */}
            <g style={{ animation: 'wag 0.8s ease-in-out infinite', transformOrigin: '10px 28px' }}>
              <path d="M10 28 C4 22 2 14 6 8" />
            </g>
          </svg>
        </div>
        <div className="col-span-4 md:col-span-5 lg:col-span-8">
          <EmblaCarousel slides={gallery.length > 0 ? gallery : PLACEHOLDER_SLIDES} options={OPTIONS} slideSize={slideSize} slideHeight='40svh' />
        </div>
      </section>

      {/* ── Services (placeholder — schema pending) ── */}
      <section className={GRID}>
        <div className="col-span-4 md:col-span-6 lg:col-span-9 mb-sm">
          <span className="typo-label">Services</span>
        </div>
        {['Editorial Illustration', 'Book & Cover Design', 'Educational Illustration'].map((name, i) => (
          <div key={i} className="col-span-2 md:col-span-2 lg:col-span-3 bg-surface p-md flex flex-col gap-sm rounded-sm">
            <p className="typo-eyebrow">{name}</p>
            <p className="typo-body text-text-muted">Placeholder — content coming from CMS.</p>
          </div>
        ))}
      </section>

      {/* ── Journey ── */}
      {journeySection && (
        <section className={GRID}>
          <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col gap-xs">
            <span className="typo-label">{journeySection.label}</span>
            {journeySection.title && <p className="typo-subtitle">{journeySection.title}</p>}
          </div>
          <div className="col-span-3 md:col-span-5 lg:col-span-7 flex flex-col gap-md">
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
