import { useState, useEffect } from 'react'
import { getArtworks, getArtworksByCategory } from '../services/artworks'
import { getCategories } from '../services/categories'
import MasonryGrid from '../components/MasonryGrid'
import CategoryFilter from '../components/CategoryFilter'

function HomePage() {
  const [artworks, setArtworks] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [loading, setLoading] = useState(true)

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
    // Will open overlay in Phase 6
    console.log('Clicked artwork:', artwork.title)
  }

  return (
    <div className="px-6 py-8">
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      {loading ? (
        <p className="text-gray-500 text-center py-12">Loading...</p>
      ) : (
        <MasonryGrid
          artworks={artworks}
          onArtworkClick={handleArtworkClick}
        />
      )}
    </div>
  )
}

export default HomePage
