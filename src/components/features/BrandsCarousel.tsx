'use client'

import { KeyboardEvent } from 'react'
import { Text, Button } from '@/components/ui'
import { useCarouselScroll } from '@/hooks/useCarouselScroll'
import { featuredBrands } from '@/data/brands'
import { BrandCard } from './BrandCard'
import { BrandDetailPopUp } from './BrandDetailPopUp'

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
            <span className="text-dark dark:text-white">Beneficios </span>
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
            className="rounded-full w-10 h-10 p-0 border-naples text-naples hover:bg-naples hover:text-dark disabled:border-gray-300 disabled:text-gray-300 dark:border-naples dark:text-naples dark:hover:bg-naples dark:hover:text-dark dark:disabled:border-gray-600 dark:disabled:text-gray-600"
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
            className="rounded-full w-10 h-10 p-0 border-naples text-naples hover:bg-naples hover:text-dark disabled:border-gray-300 disabled:text-gray-300 dark:border-naples dark:text-naples dark:hover:bg-naples dark:hover:text-dark dark:disabled:border-gray-600 dark:disabled:text-gray-600"
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
        className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 outline-none focus-visible:ring-2 focus-visible:ring-tomato focus-visible:ring-offset-2 rounded-lg cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        role="region"
        aria-label="Carrusel de beneficios destacados. Usa las flechas izquierda y derecha para navegar."
        tabIndex={0}
      >
        {featuredBrands.map((brand, index) => (
          <BrandCard
            key={brand.id}
            brand={brand}
            index={index}
          />
        ))}

        {/* End of scroll indicator */}
        <div className="flex-shrink-0 w-[200px] md:w-[240px] snap-start flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-12 h-12 rounded-full bg-naples/20 dark:bg-naples/10 flex items-center justify-center mx-auto mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-naples"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <Text.SemiBold size="sm" color="dark" as="p" className="dark:text-white">
              {featuredBrands.length} beneficios
            </Text.SemiBold>
            <Text.Regular size="xs" color="gray" as="p" className="mt-1">
              Pronto más marcas
            </Text.Regular>
          </div>
        </div>
      </div>

      <BrandDetailPopUp />
    </div>
  )
}
