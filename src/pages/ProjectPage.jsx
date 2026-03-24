import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug, getPrevProject, getNextProject, getProjectsIndex } from '../services/projects'
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
  const [projectsIndex, setProjectsIndex] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  useEffect(() => {

    async function fetchData() {
      try {
        const [projectData, artworksData, indexData] = await Promise.all([
          getProjectBySlug(slug),
          getArtworksByProject(slug),
          getProjectsIndex()
        ])
        setProject(projectData)
        setArtworks(artworksData)
        setProjectsIndex(indexData)

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
      <div className="grid grid-cols-1 min-[960px]:grid-cols-2 gap-10 min-[960px]:gap-2xl px-lg py-xl min-h-[88vh] items-stretch">

        {project.cover_image && (
          <div className="aspect-square overflow-hidden md:m-15">
            <img
              src={project.cover_image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-col justify-center gap-md">
          <h1 className="typo-title">{project.title}</h1>
          {project.subtitle && (
            <p className="typo-subtitle">{project.subtitle}</p>
          )}
          {project.description && (
            <p className="typo-body">{project.description}</p>
          )}
        </div>
      </div>

      {/* Full-width masonry grid */}
      <div className="px-lg pb-xl">
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
      <div className="px-lg py-24 grid grid-cols-3 items-center text-text-muted">

        <div>
          {prevProject && (
            <Link to={`/project/${prevProject.slug}`} className="flex flex-col gap-xs hover:text-accent transition-colors">
              <span className="typo-label">← Previous</span>
              <span className="typo-ui">{prevProject.title}</span>
            </Link>
          )}
        </div>

        {/* Dot indicators — one per project, current filled */}
        <div className="flex items-center justify-center gap-sm">
          {projectsIndex.map((p) => (
            <Link
              key={p.slug}
              to={`/project/${p.slug}`}
              className={`rounded-full transition-all ${p.slug === slug
                ? 'w-2 h-2 bg-text-primary'
                : 'w-1.5 h-1.5 bg-border hover:bg-text-muted'
                }`}
            />
          ))}
        </div>

        <div className="text-right">
          {nextProject && (
            <Link to={`/project/${nextProject.slug}`} className="flex flex-col gap-xs items-end hover:text-accent transition-colors">
              <span className="typo-label">Next →</span>
              <span className="typo-ui">{nextProject.title}</span>
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
