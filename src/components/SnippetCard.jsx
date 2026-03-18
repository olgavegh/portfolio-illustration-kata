import { Link } from 'react-router-dom'


function SnippetCard({ snippet }) {
  const { label, body, link, image } = snippet

  const inner = (
    <div className="h-full py-6">
      <div className="flex flex-col gap-4">
        <p className="typo-label">{label}</p>

        <div className={`flex flex-row ${image.src && "gap-3"}`}>
          <img src={image.src} alt={image.alt} className="max-w-1/4 aspect-square object-center object-cover rounded-xs" />
          <h3 className="text-lg">{body}</h3>
        </div>

        {link && (
          <span className="typo-label text-accent">{link.label} →</span>
        )}
      </div>
    </div>
  )

  if (!link) return <div>{inner}</div>

  const isExternal = link.href.startsWith('http') || link.href.startsWith('mailto')

  if (isExternal) return <a href={link.href}>{inner}</a>

  return <Link to={link.href}>{inner}</Link>
}

export default SnippetCard
