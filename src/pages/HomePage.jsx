import { useState, useEffect } from 'react'
import { getArtworks, getArtworksByCategory } from '../services/artworks'
import { getCategories } from '../services/categories'
import MasonryGrid from '../components/MasonryGrid'
import ArtworkCard from '../components/ArtworkCard'
import CategoryFilter from '../components/CategoryFilter'
import ArtworkOverlay from '../components/ArtworkOverlay'

function HomePage() {
  const [artworks, setArtworks] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  // Fetch artworks when category changes
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

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork)
  }

  const handleCloseOverlay = () => {
    setSelectedArtwork(null)
  }

  const handleNavigate = (artwork) => {
    setSelectedArtwork(artwork)
  }

  return (
    <div className="px-6 py-8">
      {/* Hero section */}
      <div className="mb-20 max-w-2xl">
        <h1 className="typo-page-title mb-3">
          Narrative imagery that sparks connection.<br />
          I'm Kata, an illustrator crafting visual solutions through collaboration.
        </h1>
      </div>

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      {loading ? (
        <p className="text-gray-500 text-center py-12">Loading...</p>
      ) : (
        <MasonryGrid>
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onClick={() => handleArtworkClick(artwork)}
            />
          ))}
        </MasonryGrid>
      )}

      {selectedArtwork && (
        <ArtworkOverlay
          artwork={selectedArtwork}
          artworks={artworks}
          onClose={handleCloseOverlay}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  )
}

export default HomePage
