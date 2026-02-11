import { Text } from '@/components/ui'
import { BrandsCarousel, AllBrands } from '@/components/features'

const benefits = [
  {
    icon: '🎁',
    title: 'Regalos',
    description: 'Encuentra regalos pensados para tu cumpleaños, reunidos en un solo lugar y listos para usar.',
    color: 'bg-naples/20',
  },
  {
    icon: '🏷️',
    title: 'Descuentos',
    description: 'Registra tu cumpleaños y accede a descuentos únicos, sin registros repetidos.',
    color: 'bg-tomato/10',
  },
  {
    icon: '🎰',
    title: 'Sorteos',
    description: 'Participa automáticamente en sorteos especiales por tu cumpleaños, con beneficios reales y verificados.',
    color: 'bg-green-100 dark:bg-green-900/30',
  },
  {
    icon: '✨',
    title: 'Experiencias',
    description: 'Accede a experiencias ofrecidas por nuestras marcas aliadas, con información clara y beneficios genuinos.',
    color: 'bg-blue-100 dark:bg-blue-900/30',
  },
]

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-dark dark:text-white">Cómo </span>
            <span className="text-tomato">Funciona</span>
          </h2>

          <div className="max-w-2xl mx-auto">
            <Text.SemiBold size="lg" color="naples" as="p" className="mb-4 uppercase tracking-wide">
              Porque en tu cumpleaños mereces lo mejor
            </Text.SemiBold>
            <Text.Regular size="base" color="gray" as="p" className="leading-relaxed">
              No queremos que pierdas tiempo buscando tus beneficios. Con tu registro,
              accedes a todo en un solo lugar, con ofertas claras y siempre actualizadas.
            </Text.Regular>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-cream dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-shadow text-center md:text-left"
            >
              <div className={`w-14 h-14 ${benefit.color} rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto md:mx-0`}>
                {benefit.icon}
              </div>
              <Text.Bold size="lg" color="dark" as="h3" className="mb-2 dark:text-white">
                {benefit.title}
              </Text.Bold>
              <Text.Regular size="sm" color="gray" as="p" className="leading-relaxed">
                {benefit.description}
              </Text.Regular>
            </div>
          ))}
        </div>

        {/* Beneficios Destacados - Carousel */}
        <BrandsCarousel />

        {/* Ver Más - All Brands */}
        <AllBrands />
      </div>
    </section>
  )
}
