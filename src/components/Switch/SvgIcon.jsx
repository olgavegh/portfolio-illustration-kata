import { useState, useEffect } from 'react'

function SvgIcon({ src, className }) {
  const [svg, setSvg] = useState('')

  useEffect(() => {
    if (!src) return
    fetch(src)
      .then(r => r.text())
      .then(setSvg)
      .catch(() => setSvg(''))
  }, [src])

  if (!svg) return null

  return (
    <span
      className={`block [&>svg]:w-full [&>svg]:h-full [&>svg]:block ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export default SvgIcon
