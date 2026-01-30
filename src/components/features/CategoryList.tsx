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
      <ul className="space-y-2" aria-label={`Marcas de ${category}`}>
        {brands.map((brand) => (
          <li key={brand.name}>
            <button
              type="button"
              className="text-left w-full text-gray-600 dark:text-gray-300 hover:text-tomato dark:hover:text-tomato transition-colors text-sm py-1 focus:outline-none focus:ring-2 focus:ring-tomato focus:ring-offset-2 rounded"
              aria-label={`Ver beneficios de ${brand.name}`}
              onClick={() => {
                // TODO: Implementar modal de detalles de marca
                console.log(`Ver detalles de ${brand.name}`)
              }}
            >
              {brand.name}
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}
