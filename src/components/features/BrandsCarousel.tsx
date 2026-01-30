'use client'

import { KeyboardEvent } from 'react'
import { Text, Button } from '@/components/ui'
import { useCarouselScroll } from '@/hooks/useCarouselScroll'
import { getInfiniteBrands } from '@/data/brands'
import { BrandCard } from './BrandCard'

const infiniteBrands = getInfiniteBrands(2)

export const BrandsCarousel = () => {
  const { scrollRef, canScrollLeft, canScrollRight, scroll, handleScroll } = useCarouselScroll(380)

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scroll('left')
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      scroll('right')
    }
  }

  return (
    <div id="aliados" className="border-t border-gray-200 dark:border-gray-700 pt-16 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div className="text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            <span className="text-dark dark:text-white">Aliados </span>
            <span className="text-tomato">Destacados</span>
          </h3>
          <Text.Regular size="base" color="gray" as="p">
            Marcas que celebran contigo con ofertas exclusivas
          </Text.Regular>
        </div>

        {/* Navigation buttons - desktop only */}
        <nav className="hidden md:flex gap-2" aria-label="Navegación del carrusel">
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Ver ofertas anteriores"
            className="rounded-full w-10 h-10 p-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Ver más ofertas"
            className="rounded-full w-10 h-10 p-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Button>
        </nav>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 focus:outline-none focus:ring-2 focus:ring-tomato focus:ring-offset-2 rounded-lg"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        role="region"
        aria-label="Carrusel de aliados destacados. Usa las flechas izquierda y derecha para navegar."
        tabIndex={0}
      >
        {infiniteBrands.map((brand, index) => (
          <BrandCard
            key={`${brand.brandName}-${brand.benefit}-${index}`}
            brand={brand}
            index={index}
          />
        ))}
      </div>

      {/* Mobile scroll indicator */}
      <div className="flex justify-center gap-1.5 mt-4 md:hidden" aria-hidden="true">
        {infiniteBrands.slice(0, 8).map((_, index) => (
          <div key={index} className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
        ))}
      </div>
    </div>
  )
}
