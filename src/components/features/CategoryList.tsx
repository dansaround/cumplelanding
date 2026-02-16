'use client'

import Image from 'next/image'
import { useSetAtom } from 'jotai'
import { Text } from '@/components/ui'
import { categories, allBrands, selectedBrandAtom, type CategoryKey } from '@/data/brands'
import { CategoryIcon } from './CategoryIcon'

type CategoryListProps = {
  category: CategoryKey
}

export const CategoryList = ({ category }: CategoryListProps) => {
  const categoryConfig = categories[category]
  const brands = allBrands[category]
  const setSelectedBrand = useSetAtom(selectedBrandAtom)

  return (
    <article className="bg-cream dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
      {/* Category header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${categoryConfig.color}`}
          aria-hidden="true"
        >
          <CategoryIcon icon={categoryConfig.icon} className="w-5 h-5 text-dark" />
        </div>
        <Text.SemiBold size="base" color="dark" as="h4" className="dark:text-white">
          {category}
        </Text.SemiBold>
      </div>

      {/* Brands list */}
      <div className="space-y-4" aria-label={`Marcas de ${category}`}>
        {brands.map((brand) => (
          <div key={brand.id} className="flex items-start gap-3">
            {/* Brand thumbnail */}
            <button
              type="button"
              className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 hover:ring-2 hover:ring-tomato transition-all"
              onClick={() => setSelectedBrand(brand)}
            >
              <Image
                src={brand.image}
                alt={brand.brandName}
                fill
                className="object-cover"
                sizes="48px"
              />
            </button>

            <div className="space-y-1">
              {/* Brand name */}
              <Text.SemiBold size="sm" color="dark" as="h5" className="dark:text-white">
                {brand.brandName}
              </Text.SemiBold>

              {/* Benefit */}
              <button
                type="button"
                className="text-xs text-gray-600 dark:text-gray-400 hover:text-tomato dark:hover:text-tomato transition-colors text-left"
                onClick={() => setSelectedBrand(brand)}
              >
                • {brand.benefitSummary}
              </button>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
