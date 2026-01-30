import Image from 'next/image'
import { Text, Button } from '@/components/ui'
import { categories, type BrandBenefit, type CategoryKey } from '@/data/brands'
import { CategoryIcon } from './CategoryIcon'

type BrandCardProps = {
  brand: BrandBenefit
  index: number
}

export const BrandCard = ({ brand, index }: BrandCardProps) => {
  const categoryConfig = categories[brand.category]

  return (
    <article
      className="flex-shrink-0 w-[320px] md:w-[360px] snap-start"
      aria-label={`Oferta de ${brand.brandName}`}
    >
      <div className="rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-[420px] flex flex-col relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        {/* Image with overlay */}
        <div className="absolute inset-0">
          <Image
            src={brand.image}
            alt={brand.brandName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 320px, 360px"
            priority={index < 3}
          />
          {/* Gradient overlay: transparent to black */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
            aria-hidden="true"
          />
        </div>

        {/* Content positioned at bottom */}
        <div className="relative z-10 mt-auto p-6 flex flex-col gap-3">
          {/* Category badge */}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${categoryConfig.color}`}
              aria-hidden="true"
            >
              <CategoryIcon icon={categoryConfig.icon} className="w-4 h-4 text-dark" />
            </div>
            <Text.Regular size="sm" color="white" className="opacity-90">
              {brand.category}
            </Text.Regular>
          </div>

          {/* Brand name */}
          <Text.Bold size="xl" color="white" as="h3">
            {brand.brandName}
          </Text.Bold>

          {/* Benefit description */}
          <Text.Regular size="sm" color="white" as="p" className="opacity-90 line-clamp-2">
            {brand.benefit}
          </Text.Regular>

          {/* CTA Button */}
          <Button
            variant="primary"
            size="sm"
            className="mt-2 w-full"
            onClick={() => {
              // TODO: Implementar modal de detalles
              console.log(`Ver detalles de ${brand.brandName}`)
            }}
          >
            Ver Detalles
          </Button>
        </div>
      </div>
    </article>
  )
}
