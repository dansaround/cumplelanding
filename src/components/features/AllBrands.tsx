'use client'

import { useState } from 'react'
import { Text, Button } from '@/components/ui'
import { getCategoryKeys } from '@/data/brands'
import { CategoryList } from './CategoryList'

const categoryKeys = getCategoryKeys()

export const AllBrands = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => setIsExpanded((prev) => !prev)

  return (
    <div className="mt-12">
      {/* Toggle button */}
      <div className="text-center">
        <Button
          variant="secondary"
          size="lg"
          onClick={toggleExpanded}
          aria-expanded={isExpanded}
          aria-controls="all-brands-content"
          className="gap-2"
        >
          {isExpanded ? 'Ver Menos' : 'Ver Más Aliados'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </Button>
      </div>

      {/* Expandable content */}
      <div
        id="all-brands-content"
        className={`grid transition-all duration-500 overflow-hidden ${
          isExpanded ? 'grid-rows-[1fr] opacity-100 mt-10' : 'grid-rows-[0fr] opacity-0 mt-0'
        }`}
        aria-hidden={!isExpanded}
      >
        <div className="overflow-hidden">
          {/* Categories grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categoryKeys.map((category) => (
              <CategoryList key={category} category={category} />
            ))}
          </div>

          {/* Footer message */}
          <div className="text-center mt-10">
            <Text.Regular size="base" color="gray" as="p" className="mb-4">
              Y muchos más se suman cada mes
            </Text.Regular>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                // TODO: Implementar modal o formulario de sugerencia
                console.log('Sugerir una marca')
              }}
            >
              Sugerir una Marca
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
