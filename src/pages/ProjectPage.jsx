import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug, getPrevProject, getNextProject } from '../services/projects'
import { getArtworksByProject } from '../services/artworks'
import MasonryGrid from '../components/MasonryGrid'
import ArtworkCard from '../components/ArtworkCard'
import ArtworkOverlay from '../components/ArtworkOverlay'

function ProjectPage() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [artworks, setArtworks] = useState([])
  const [prevProject, setPrevProject] = useState(null)
  const [nextProject, setNextProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  useEffect(() => {

    async function fetchData() {
      try {
        const [projectData, artworksData] = await Promise.all([
          getProjectBySlug(slug),
          getArtworksByProject(slug),
        ])
        setProject(projectData)
        setArtworks(artworksData)

        const [prev, next] = await Promise.all([
          getPrevProject(projectData.order_index),
          getNextProject(projectData.order_index)
        ])
        setPrevProject(prev)
        setNextProject(next)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()

  }, [slug])

  if (loading) {
    return <div className="px-lg py-xl"><p className="text-text-muted">Loading...</p></div>
  }

  if (!project) {
    return <div className="px-lg py-xl"><p className="text-text-muted">Project not found</p></div>
  }

  return (
    <div>

      {/* Split hero — image left, info right, fills ~88vh so masonry peeks below */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-sm py-xl min-h-[50vh] my-lg items-stretch">

        {/* {project.cover_image && (
          <div className="aspect-square overflow-hidden md:m-15">
            <img
              src={project.cover_image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )} */}

        <div className="col-span-1 sm:col-span-2 sm:col-start-2 lg:col-start-3 flex flex-col justify-center gap-md">
          <div>
            <h1 className="typo-title">{project.title}</h1>
            {project.subtitle && (
              <p className="typo-subtitle">{project.subtitle}</p>
            )}
          </div>
          {project.description && (
            <p className="typo-body text-balance">{project.description}</p>
          )}
        </div>
      </div>

      {/* Full-width masonry grid */}
      <div className="pb-xl">
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
      </div>

      {/* Bottom project navigation */}
      <div className="sticky bottom-0 py-md px-md md:px-lg -mx-md md:-mx-lg grid grid-cols-3 items-center text-text-muted bg-surface-raised">

        <div>
          {prevProject && (
            <Link to={`/project/${prevProject.slug}`} className="flex flex-col gap-xs hover:text-accent transition-colors">
              <span className="typo-label">← Previous</span>
              <span className="typo-caption hidden sm:inline">{prevProject.title}</span>
            </Link>
          )}
        </div>

        <div />

        <div className="text-right">
          {nextProject && (
            <Link to={`/project/${nextProject.slug}`} className="flex flex-col gap-xs items-end hover:text-accent transition-colors">
              <span className="typo-label">Next →</span>
              <span className="typo-caption hidden sm:inline">{nextProject.title}</span>
            </Link>
          )}
        </div>

      </div>

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
