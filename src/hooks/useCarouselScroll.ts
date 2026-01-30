'use client'

import { useRef, useState, useCallback } from 'react'

type ScrollDirection = 'left' | 'right'

type UseCarouselScrollReturn = {
  scrollRef: React.RefObject<HTMLDivElement>
  canScrollLeft: boolean
  canScrollRight: boolean
  scroll: (direction: ScrollDirection) => void
  handleScroll: () => void
}

export const useCarouselScroll = (scrollAmount: number = 380): UseCarouselScrollReturn => {
  const scrollRef = useRef<HTMLDivElement>(null!)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }, [])

  const scroll = useCallback(
    (direction: ScrollDirection) => {
      if (scrollRef.current) {
        const amount = direction === 'left' ? -scrollAmount : scrollAmount
        scrollRef.current.scrollBy({
          left: amount,
          behavior: 'smooth',
        })
        // Actualizar inmediatamente para mejor feedback y después de la animación
        checkScroll()
        setTimeout(checkScroll, 300)
      }
    },
    [scrollAmount, checkScroll]
  )

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scroll,
    handleScroll: checkScroll,
  }
}
