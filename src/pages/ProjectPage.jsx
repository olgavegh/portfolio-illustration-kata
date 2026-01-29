import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProjectBySlug } from '../services/projects'
import { getArtworksByProject } from '../services/artworks'
import MasonryGrid from '../components/MasonryGrid'
import ArtworkCard from '../components/ArtworkCard'

function ProjectPage() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)



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
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <div className="md:flex md:gap-8">
        {/* Left: Cover image */}
        {project.cover_image && (
          <div className="md:w-1/2 mb-6 md:mb-0">
            <img
              src={project.cover_image}
              alt={project.title}
              className="w-full max-h-96 object-contain rounded-sm"
            />
          </div>
        )}
        {/* Right: Text content */}
        <div className={project.cover_image ? 'md:w-1/2' : 'w-full'}>
          <h1 className="font-serif text-2xl">{project.title}</h1>
          {project.subtitle && (
            <p className="text-gray-500 mt-1">{project.subtitle}</p>
          )}
          {project.year && (
            <p className="text-xs text-gray-400 mt-1">{project.year}</p>
          )}
          {project.description && (
            <p className="mt-4">{project.description}</p>
          )}
        </div>
      </div>

      {/* Project artworks */}
      {artworks.length > 0 && (
        <div className="mt-12">
          <MasonryGrid>
            {artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                showSubtitle={false}
              />
            ))}
          </MasonryGrid>
        </div>
      )}
    </div>
  )
}

export default ProjectPage
