import React, { useCallback, useEffect, useState } from 'react'

export const useDotButton = (emblaApi) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const onDotButtonClick = useCallback((index) => {
    if (!emblaApi) return
    emblaApi.scrollTo(index)
  }, [emblaApi])

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reinit', onInit).on('reinit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return { selectedIndex, scrollSnaps, onDotButtonClick }
}

export const DotButton = ({ onClick, selected }) => (
  <button type="button" onClick={onClick}
    className="ml-sm w-(--fs-subtitle) h-(--fs-subtitle) flex items-center justify-center rounded-full relative cursor-pointer">
    <span className={`w-(--fs-body) h-(--fs-body) rounded-full border-2 transition-colors ${selected ? 'border-text-primary' : 'border-stroke-weak'}`} />
  </button>
)
