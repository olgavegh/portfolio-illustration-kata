import { useState, useEffect } from 'react'
import { getArtworks, getArtworksByCategory } from '../services/artworks'
import { getCategories } from '../services/categories'
import { getPageBySlug } from '../services/pages'
import MasonryGrid from '../components/MasonryGrid'
import ArtworkCard from '../components/ArtworkCard'
import SnippetCard from '../components/SnippetCard'
import CategoryFilter from '../components/CategoryFilter'
import ArtworkOverlay from '../components/ArtworkOverlay'

function HomePage() {
  const [pageContent, setPageContent] = useState({})
  const [artworks, setArtworks] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedArtwork, setSelectedArtwork] = useState(null)

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

  useEffect(() => {
    async function fetchArtworks() {
      setLoading(true)
      try {
        const data = activeCategory
          ? await getArtworksByCategory(activeCategory)
          : await getArtworks()
        setArtworks(data)
      } catch (error) {
        console.error('Error fetching artworks:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArtworks()
  }, [activeCategory])

  // Merge artworks + snippets, sorted by order_index
  // Snippets hidden when a category filter is active
  const snippets = !activeCategory && pageContent.snippets ? pageContent.snippets : []
  const gridItems = [
    ...artworks.map(a => ({ ...a, _type: 'artwork' })),
    ...snippets.map(s => ({ ...s, _type: 'snippet' })),
  ].sort((a, b) => a.order_index - b.order_index)

  return (
    <div className="px-6 py-8">

      {pageContent.hero?.headline && (
        <div className="mb-20 max-w-2xl">
          <h1 className="typo-page-title">{pageContent.hero.headline}</h1>
        </div>
      )}

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {loading ? (
        <p className="text-gray-500 text-center py-12">Loading...</p>
      ) : (
        <MasonryGrid>
          {gridItems.map((item) =>
            item._type === 'snippet' ? (
              <SnippetCard key={item.id} snippet={item} />
            ) : (
              <ArtworkCard
                key={item.id}
                artwork={item}
                onClick={() => setSelectedArtwork(item)}
              />
            )
          )}
        </MasonryGrid>
      )}

      {selectedArtwork && (
        <ArtworkOverlay
          artwork={selectedArtwork}
          artworks={artworks}
          onClose={() => setSelectedArtwork(null)}
          onNavigate={setSelectedArtwork}
        />
      )}

    </div>
  )
}

export default HomePage
