import Switch from "./Switch/Switch"
import { useState } from "react"

function CategoryFilter({ categories, scale, activeCategory, onFilterChange }) {

  const scaleFilters = categories.filter(c => c.type === 'scale')
  const thematicFilters = categories.filter(c => c.type === 'thematic')

  const btn = (isActive) =>
    `px-3 py-1 typo-ui rounded-full transition-colors ${isActive
      ? 'bg-accent text-white'
      : 'bg-button-secondary text-text-secondary hover:bg-surface-raised'
    }`

  return (
    <div className="flex flex-row gap-3 mb-xl">

      {/* Scale row */}
      <Switch
        isOn={scale === 'project'}
        handleToggle={() => onFilterChange('scale', scale === 'project' ? 'all' : 'project')}
        iconOff={scaleFilters[0]?.icon}
        iconOn={scaleFilters[1]?.icon}
      />

      {/* Thematic row */}
      <div className="flex flex-wrap gap-sm">
        <button
          onClick={() => onFilterChange('category', null)}
          className={btn(activeCategory === null)}
        >
          All
        </button>
        {thematicFilters.map((c) => (
          <button
            key={c.slug}
            onClick={() => onFilterChange('category', c.slug)}
            className={btn(activeCategory === c.slug)}
          >
            {c.title}
          </button>
        ))}
      </div>

    </div >
  )
}

export default CategoryFilter
