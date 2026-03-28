import React, { useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { NextButton, PrevButton, usePrevNextButtons } from './buttons/ArrowButtons'
import { DotButton, useDotButton } from './buttons/DotButton'

const TWEEN_FACTOR_BASE = 0.2

/**
 * Reusable Embla carousel with parallax effect.
 *
 * Props:
 *   slides       — array of items; shape is up to the caller via renderSlide
 *   options      — Embla options (loop, dragFree, align, etc.)
 *   renderSlide  — (item, index) => ReactNode  (defaults to img)
 *   slideSize    — CSS value for slide width  (default '80%')
 *   slideSpacing — CSS value for gap between slides (default '1rem')
 *   slideHeight  — CSS value for slide height  (default '19rem')
 *   showControls — show prev/next + dots (default true)
 */
const EmblaCarousel = ({
  slides = [],
  options = {},
  renderSlide,
  slideSize = '80%',
  slideSpacing = '1rem',
  maxSlideSize = '28rem',
  showControls = true,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef([])
  const videoRefs = useRef([])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

  const setTweenNodes = useCallback((emblaApi) => {
    tweenNodes.current = emblaApi.slideNodes().map(node =>
      node.querySelector('[data-parallax-layer]')
    )
  }, [])

  const setTweenFactor = useCallback((emblaApi) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenParallax = useCallback((emblaApi, event) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
    const slidesInView = emblaApi.slidesInView()
    const isScrollEvent = event?.type === 'scroll'

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target()
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
            }
          })
        }

        const translate = diffToTarget * (-1 * tweenFactor.current) * 100
        const tweenNode = tweenNodes.current[slideIndex]
        if (tweenNode) tweenNode.style.transform = `translateX(${translate}%)`
      })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenParallax(emblaApi)
    emblaApi
      .on('reinit', setTweenNodes)
      .on('reinit', setTweenFactor)
      .on('reinit', tweenParallax)
      .on('scroll', tweenParallax)
      .on('slidefocus', tweenParallax)
      .on('select', (api) => {
        const selected = api.selectedScrollSnap()
        videoRefs.current.forEach((el, i) => {
          if (!el) return
          i === selected ? el.play() : el.pause()
        })
      })
  }, [emblaApi, tweenParallax])

  const mediaStyle = {
    height: '100%',
    flex: `0 0 calc(115% + (${slideSpacing} * 2))`,
    maxWidth: 'none',
    backgroundColor: 'var(--color-surface)'
  }

  const defaultRender = (item, index) => {
    if (item.type === 'video')
      return (
        <video
          ref={el => { videoRefs.current[index] = el }}
          src={item.src}
          poster={item.poster}
          muted loop playsInline
          preload="none"
          className="object-cover"
          style={mediaStyle}
        />
      )
    return (
      <img
        src={item.src || `https://picsum.photos/seed/${index}/600/350`}
        alt={item.alt || ''}
        className="object-cover"
        style={mediaStyle}
      />
    )
  }

  const render = renderSlide ?? defaultRender

  return (
    <div>
      {/* Viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div
          className="flex touch-pan-y touch-pinch-zoom"
          style={{ marginLeft: `calc(${slideSpacing} * -1)` }}
        >
          {slides.map((item, index) => (
            <div
              key={index}
              className="min-w-0 shrink-0"
              style={{ flex: `0 0 ${slideSize}`, maxWidth: maxSlideSize, paddingLeft: slideSpacing }}
            >
              {/* Parallax wrapper */}
              <div className="aspect-square overflow-hidden rounded-lg">
                <div
                  data-parallax-layer
                  className="relative h-full w-full flex justify-center"
                >
                  {render(item, index)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="grid grid-cols-[auto_1fr] gap-[1.2rem] mt-[1.8rem]">
          <div className="flex gap-[0.6rem] items-center">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
          <div className="flex flex-wrap justify-end items-center">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                selected={index === selectedIndex}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default EmblaCarousel
