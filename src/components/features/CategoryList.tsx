import { Text } from '@/components/ui'
import { categories, allBrands, type CategoryKey } from '@/data/brands'
import { CategoryIcon } from './CategoryIcon'

type CategoryListProps = {
  category: CategoryKey
}

export const CategoryList = ({ category }: CategoryListProps) => {
  const categoryConfig = categories[category]
  const brands = allBrands[category]

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
          <div key={brand.name} className="space-y-1.5">
            {/* Brand name */}
            <Text.SemiBold size="sm" color="dark" as="h5" className="dark:text-white">
              {brand.name}
            </Text.SemiBold>

            {/* Benefits list */}
            <ul className="space-y-1 pl-3">
              {brand.benefits.map((benefit, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-xs text-gray-600 dark:text-gray-400 hover:text-tomato dark:hover:text-tomato transition-colors inline-block"
                    onClick={(e) => {
                      e.preventDefault()
                      // TODO: Implementar modal de detalles del beneficio
                      console.log(`Ver detalles: ${brand.name} - ${benefit}`)
                    }}
                  >
                    • {benefit}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  )
}
