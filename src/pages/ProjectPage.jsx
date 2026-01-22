import { useParams } from 'react-router-dom'

function ProjectPage() {
  const { slug } = useParams()

  return (
    <div className="px-6 py-8">
      <h1 className="font-serif text-2xl">Project: {slug}</h1>
      <p className="text-gray-500 mt-2">Project content will go here</p>
    </div>
  )
}

export default ProjectPage
