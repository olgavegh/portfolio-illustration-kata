function NavArrowButton({ direction, onClick }) {
  const isLeft = direction === 'left'

  return (
    <button
      onClick={onClick}
      className={`hidden md:block absolute top-1/2 -translate-y-1/2 z-10 p-2 hover:text-accent transition-colors ${
        isLeft ? 'left-4' : 'right-4'
      }`}
      aria-label={isLeft ? 'Previous' : 'Next'}
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d={isLeft ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
        />
      </svg>
    </button>
  )
}

export default NavArrowButton
