import { Text, Accordion } from '@/components/ui'

const faqs = [
  {
    title: '¿Qué es CUMPLEPLAN?',
    content:
      'CUMPLEPLAN es una plataforma que reúne beneficios exclusivos de cumpleaños de distintas marcas, como regalos, descuentos, productos gratis y experiencias especiales para que celebres tu día.',
  },
  {
    title: '¿Cómo puedo acceder a los beneficios?',
    content:
      'Primero debes registrarte en CUMPLEPLAN para conocer los beneficios de cumpleaños disponibles en distintos establecimientos. Luego, solo debes revisar los requisitos de cada beneficio y cumplir con las condiciones indicadas por la marca para poder acceder a él.',
  },
  {
    title: '¿Los beneficios son gratis?',
    content:
      '¡Sí! Muchas marcas ofrecen regalos completamente gratis por tu cumpleaños, como bebidas, postres o productos. Además, también puedes encontrar descuentos exclusivos y beneficios especiales para que celebres a lo grande.',
  },
  {
    title: '¿Los beneficios son válidos solo el día de mi cumpleaños?',
    content:
      'Depende de la marca. Algunos beneficios son válidos únicamente el día de tu cumpleaños, mientras que otros se pueden usar durante todo el mes.',
  },
  {
    title: '¿Necesito registrarme en CUMPLEPLAN para usar los beneficios?',
    content:
      'Sí, es obligatorio registrarte en CUMPLEPLAN para acceder a los beneficios. Esto te permitirá descubrir regalos, descuentos y sorpresas especiales por tu cumpleaños, además de participar en sorteos, experiencias y otras actividades exclusivas que tenemos preparadas para hacer tu día aún más especial.',
  },
  {
    title: '¿Los beneficios están disponibles en todo el Perú?',
    content:
      'Muchos beneficios están disponibles a nivel nacional, aunque algunos pueden variar según la ciudad o la tienda. Puedes revisar la cobertura en el detalle de cada beneficio.',
  },
  {
    title: '¿CUMPLEPLAN tiene algún costo?',
    content:
      'No. Registrarte y usar CUMPLEPLAN es completamente gratis, para que puedas conocer y acceder a los beneficios de cumpleaños sin ningún costo.',
  },
]

export const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-dark dark:text-white">Preguntas </span>
            <span className="text-tomato">Frecuentes</span>
          </h2>
          <Text.Regular
            size="base"
            color="gray"
            as="p"
            className="max-w-xl mx-auto"
          >
            Resolvemos las dudas más comunes sobre CUMPLEPLAN
          </Text.Regular>
        </div>

        {/* FAQ Accordion */}
        <Accordion items={faqs} defaultOpenIndex={0} />
      </div>
    </section>
  )
}
