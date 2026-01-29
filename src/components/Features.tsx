import { Text } from '@/components/ui'

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
    description: 'Ingresa tu fecha de cumpleaños una sola vez y accede a descuentos exclusivos, sin registros repetidos.',
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
    description: 'Accede a experiencias ofrecidas por marcas verificadas, con información clara y beneficios genuinos.',
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
              className="bg-whitesmoke dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-shadow text-center md:text-left"
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

        {/* Aliados Destacados Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-dark dark:text-white">Aliados </span>
              <span className="text-tomato">Destacados</span>
            </h3>
            <Text.Regular size="base" color="gray" as="p" className="mb-8">
              Marcas que celebran contigo
            </Text.Regular>

            {/* Placeholder for allies */}
            <div className="bg-whitesmoke dark:bg-gray-800 rounded-2xl p-12 border-2 border-dashed border-gray-300 dark:border-gray-600">
              <Text.Regular size="lg" color="gray" as="p">
                Próximamente: Logos de marcas aliadas
              </Text.Regular>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
