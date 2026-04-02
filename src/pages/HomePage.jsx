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
    <div className="min-h-screen">

      {pageContent.hero?.headline && (
        <div className="pb-2xl lg:pb-3xl">
          <h1 className="typo-display lg:max-w-2/3">{pageContent.hero.headline}</h1>
        </div>
      )}

      <CategoryFilter
        categories={categories}
        scale={scale}
        activeCategory={category}
        onFilterChange={setFilter}
      />


      <MasonryGrid>
        {gridItems.map((item, index) =>
          item._type === 'snippet' ? (
            <SnippetCard key={item.id} snippet={item} />
          ) : (
            <ArtworkCard
              key={item.id}
              artwork={item}
              index={index}
              onClick={() => navigate(`/project/${item.project_slug}`)}
              showSubtitle={scale === 'project'}
            />
          )
        )}
      </MasonryGrid>

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
