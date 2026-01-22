function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  const getButtonClass = (isActive) =>
    `px-3 py-1 text-sm rounded-full transition-colors ${
      isActive
        ? 'bg-accent text-white'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onCategoryChange(null)}
        className={getButtonClass(activeCategory === null)}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className={getButtonClass(activeCategory === category.slug)}
        >
          {category.title}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
