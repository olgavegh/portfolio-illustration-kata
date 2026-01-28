function CloseButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 z-10 p-2 hover:text-accent transition-colors"
      aria-label="Close"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )
}

export default CloseButton
