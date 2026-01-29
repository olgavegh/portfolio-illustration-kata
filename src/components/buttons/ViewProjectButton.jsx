import { Link } from 'react-router-dom'

function ViewProjectButton({ slug }) {
  return (
    <Link
      to={`/project/${slug}`}
      className="px-3 py-1.5 bg-gray-100 rounded-full text-xs hover:bg-accent hover:text-white transition-colors"
    >
      View Project
    </Link>
  )
}

export default ViewProjectButton
