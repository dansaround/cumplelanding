'use client'

import { useRef, useState, useCallback, useEffect } from 'react'

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

  // Use refs for drag state to avoid recreating listeners
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)

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

  // Mouse drag functionality
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true
      startXRef.current = e.pageX - el.offsetLeft
      scrollLeftRef.current = el.scrollLeft
      el.style.cursor = 'grabbing'
      el.style.userSelect = 'none'
      el.style.scrollSnapType = 'none' // Disable snap while dragging
      el.style.scrollBehavior = 'auto' // Disable smooth scroll while dragging
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      const walk = (x - startXRef.current) * 2 // Multiply by 2 for faster scrolling
      el.scrollLeft = scrollLeftRef.current - walk
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
      el.style.cursor = 'grab'
      el.style.userSelect = 'auto'
      el.style.scrollSnapType = '' // Re-enable snap
      el.style.scrollBehavior = '' // Re-enable smooth scroll
    }

    const handleMouseLeave = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false
        el.style.cursor = 'grab'
        el.style.userSelect = 'auto'
        el.style.scrollSnapType = '' // Re-enable snap
        el.style.scrollBehavior = '' // Re-enable smooth scroll
      }
    }

    el.addEventListener('mousedown', handleMouseDown)
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseup', handleMouseUp)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousedown', handleMouseDown)
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseup', handleMouseUp)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, []) // Empty dependency array - only set up once

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scroll,
    handleScroll: checkScroll,
  }
}
