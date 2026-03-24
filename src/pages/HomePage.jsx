import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getArtworks, getArtworksByCategory, getProjectCovers, getProjectCoversByCategory } from '../services/artworks'
import { getCategories } from '../services/categories'
import { getPageBySlug } from '../services/pages'
import MasonryGrid from '../components/MasonryGrid'
import ArtworkCard from '../components/ArtworkCard'
import SnippetCard from '../components/SnippetCard'
import CategoryFilter from '../components/CategoryFilter'
import ArtworkOverlay from '../components/ArtworkOverlay'

function HomePage() {
  const navigate = useNavigate()
  const [pageContent, setPageContent] = useState({})
  const [artworks, setArtworks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const scale = searchParams.get('scale') ?? 'all'
  const category = searchParams.get('category') ?? null


  const setFilter = (key, value) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      if (value && value !== 'all') next.set(key, value)
      else next.delete(key)
      return next
    })
  }

  // general homepage functions
  useEffect(() => {
    async function fetchInitial() {
      try {
        const [pageData, cats] = await Promise.all([getPageBySlug('home'), getCategories()])
        setPageContent(pageData.content ?? {})
        setCategories(cats)
      } catch (error) {
        console.error('Error fetching initial data:', error)
      }
    }
    fetchInitial()
  }, [])

  // filtering masonry grid
  useEffect(() => {
    async function fetchArtworks() {
      setLoading(true)
      try {
        let data = []
        if (scale === 'project') {
          data = category
            ? await getProjectCoversByCategory(category)
            : await getProjectCovers()
        } else {
          data = category
            ? await getArtworksByCategory(category)
            : await getArtworks()
        }
        setArtworks(data)
      } catch (error) {
        console.error('Error fetching artworks:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArtworks()
  }, [scale, category])

  // Merge artworks + snippets, sorted by order_index
  // Snippets hidden when a category filter is active
  const snippets = (scale === 'all' && !category) && pageContent.snippets ? pageContent.snippets : []
  const gridItems = [
    ...artworks.map(a => ({ ...a, _type: 'artwork' })),
    ...snippets.map(s => ({ ...s, _type: 'snippet' })),
  ].sort((a, b) => a.order_index - b.order_index)

  return (
    <div className="">

      {pageContent.hero?.headline && (
        <div className="pt-xl md:pt-2xl pb-2xl md:pb-3xl">
          <h1 className="typo-display md:max-w-1/2">{pageContent.hero.headline}</h1>
        </div>
      )}

      <CategoryFilter
        categories={categories}
        scale={scale}
        activeCategory={category}
        onFilterChange={setFilter}
      />


      {loading ? (
        <p className="text-text-muted text-center py-2xl">Loading...</p>
      ) : (
        <MasonryGrid>
          {gridItems.map((item) =>
            item._type === 'snippet' ? (
              <SnippetCard key={item.id} snippet={item} />
            ) : (
              <ArtworkCard
                key={item.id}
                artwork={item}
                onClick={() => navigate(`/project/${item.project_slug}`)}
                showSubtitle={scale === 'project'}
              />
            )
          )}
        </MasonryGrid>
      )}

      {/* {selectedArtwork && (
        <ArtworkOverlay
          artwork={selectedArtwork}
          artworks={artworks}
          onClose={() => setSelectedArtwork(null)}
          onNavigate={setSelectedArtwork}
        />
      )} */}

    </div>
  )
}

export default HomePage
