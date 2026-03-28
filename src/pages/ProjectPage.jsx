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

      {/* Split hero — info right-aligned */}
      <div className="layout-grid pb-2xl min-h-[50vh] my-lg items-center">

        <div className="col-span-2 md:col-span-3 md:col-start-2 lg:col-span-4 lg:col-start-3 flex flex-col justify-center gap-md">
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
      <div className="sticky bottom-0 py-md px-md md:px-2xl -mx-md md:-mx-2xl grid grid-cols-3 items-center text-text-muted bg-surface-raised">

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
