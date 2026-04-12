import Switch from "./Switch/Switch"
import { useState } from "react"
import { LuSlidersHorizontal } from "react-icons/lu"

function CategoryFilter({ categories, scale, activeCategory, onFilterChange }) {
  const [open, setOpen] = useState(false)

  const scaleFilters = categories.filter(c => c.type === 'scale')
  const thematicFilters = categories.filter(c => c.type === 'thematic')

  const btn = (isActive) =>
    `p-xs sm:px-sm sm:py-xs typo-ui rounded-lg transition-colors duration-300 ${isActive
      ? 'bg-accent text-background'
      : 'bg-button-secondary text-text-primary hover:bg-surface-raised'
    }`

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-sm mb-sm">

      <div className="flex justify-between items-center">
        <Switch
          isOn={scale === 'project'}
          handleToggle={() => onFilterChange('scale', scale === 'project' ? 'all' : 'project')}
          label={scale === 'project' ? scaleFilters[1]?.title : scaleFilters[0]?.title}
        />
        <button
          onClick={() => setOpen(o => !o)}
          className={`sm:hidden hover:bg-surface-raised p-xs rounded-lg transition-all ${open ? 'text-accent' : 'text-text-muted hover:text-text-primary'}`}
          aria-label="Toggle filters"
        >
          <LuSlidersHorizontal size={18} />
        </button>
      </div>

      <div className={`${open ? 'flex ' : 'hidden'} sm:flex flex-wrap justify-between sm:gap-xs `}>
        <button onClick={() => onFilterChange('category', null)} className={btn(activeCategory === null)}>All</button>
        {thematicFilters.map((c) => (
          <button key={c.slug} onClick={() => onFilterChange('category', c.slug)} className={btn(activeCategory === c.slug)}>{c.title}</button>
        ))}
      </div>

    </div>
  )
}

export default CategoryFilter
