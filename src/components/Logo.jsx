function Logo({ url, title, className = 'w-auto h-8' }) {
  if (url) {
    return (
      <span
        style={{
          backgroundColor: 'var(--color-logo)',
          maskImage: `url(${url})`,
          WebkitMaskImage: `url(${url})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
        className={`block ${className}`}
        aria-label={title ?? 'Logo'}
      />
    )
  }
  return <span className="typo-ui">{title ?? 'Kataco'}</span>
}

export default Logo
