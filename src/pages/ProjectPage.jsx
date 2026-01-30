import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProjectBySlug } from '../services/projects'
import { getArtworksByProject } from '../services/artworks'
import MasonryGrid from '../components/MasonryGrid'
import ArtworkCard from '../components/ArtworkCard'
import ArtworkOverlay from '../components/ArtworkOverlay'

function ProjectPage() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedArtwork, setSelectedArtwork] = useState(null)



  useEffect(() => {

    async function fetchData() {
      try {
        const [projectData, artworksData] = await Promise.all([
          getProjectBySlug(slug),
          getArtworksByProject(slug)
        ])
        setProject(projectData)
        setArtworks(artworksData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [slug])

  if (loading) {
    return <div className="px-6 py-8"><p className="text-gray-400">Loading...</p></div>
  }

  if (!project) {
    return <div className="px-6 py-8"><p className="text-gray-400">Project not found</p></div>
  }

  return (
    <div className="px-6 py-8">
      {/* Header: Title left, Description right */}
      <div className="md:flex md:justify-between md:gap-12 mb-12">
        {/* Left: Title block */}
        <div className="md:w-1/3 mb-6 md:mb-0">
          <h1 className="font-serif text-2xl">{project.title}</h1>
          {project.subtitle && (
            <p className="text-gray-500 mt-1">{project.subtitle}</p>
          )}
          {project.year && (
            <p className="text-xs text-gray-400 mt-2">{project.year}</p>
          )}
        </div>
        {/* Right: Description */}
        {project.description && (
          <div className="md:w-2/3">
            <p className="max-w-xl">{project.description}</p>
          </div>
        )}
      </div>

      {/* Project artworks */}
      {artworks.length > 0 && (
        <MasonryGrid>
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              showSubtitle={false}
              onClick={() => setSelectedArtwork(artwork)}
            />
          ))}
        </MasonryGrid>
      )}

      {selectedArtwork && (
        <ArtworkOverlay
          artwork={selectedArtwork}
          artworks={artworks}
          onClose={() => setSelectedArtwork(null)}
          onNavigate={setSelectedArtwork}
          showSubtitle={false}
        />
      )}
    </div>
  )
}

export default ProjectPage
