import { Link } from 'react-router-dom'

function SnippetCard({ snippet }) {
  const { label, body, link, image } = snippet

  const isExternal = link && (link.href.startsWith('http') || link.href.startsWith('mailto'))
  const Wrapper = !link ? 'div' : isExternal ? 'a' : Link
  const wrapperProps = !link ? {} : isExternal ? { href: link.href } : { to: link.href }

  return (
    <Wrapper {...wrapperProps} className="block h-full py-lg">
      <div className="flex flex-col gap-md">
        <p className="typo-label">{label}</p>
        <div className={`flex flex-row ${image?.src ? 'gap-3' : ''}`}>
          {image?.src && (
            <img src={image.src} alt={image.alt} className="max-w-1/4 aspect-square object-center object-cover rounded-xs" />
          )}
          <h3 className="typo-body">{body}</h3>
        </div>
        {link && <span className="typo-label text-accent">{link.label} →</span>}
      </div>
    </Wrapper>
  )
}

export default SnippetCard
