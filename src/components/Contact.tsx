'use client'

import { atom, useAtom } from 'jotai'
import { z } from 'zod'
import type { FormEvent } from 'react'
import { Text, Button } from '@/components/ui'

const industries = [
  'Restaurantes',
  'Retail / Tiendas',
  'Entretenimiento',
  'Salud y Belleza',
  'Tecnología',
  'Viajes y Turismo',
  'Servicios Financieros',
  'Otro',
]

// Zod schema for B2B form validation
const b2bFormSchema = z.object({
  nombreNegocio: z.string().min(1, 'El nombre del negocio es requerido'),
  correo: z.string().email('Email inválido').min(1, 'El correo es requerido'),
  industria: z.string().min(1, 'Selecciona una industria'),
})

type B2BFormData = z.infer<typeof b2bFormSchema>
type B2BFormErrors = Partial<Record<keyof B2BFormData, string>>

// Jotai atoms for B2B form state
const b2bFormDataAtom = atom<B2BFormData>({
  nombreNegocio: '',
  correo: '',
  industria: '',
})

const b2bFormErrorsAtom = atom<B2BFormErrors>({})
const b2bIsLoadingAtom = atom(false)
const b2bSubmitMessageAtom = atom<{ type: 'success' | 'error'; text: string } | null>(null)

const valueProps = [
  {
    icon: '🎯',
    title: 'Audiencia con alta intención',
    description: 'Conecta con usuarios que buscan activamente ofertas para celebrar.',
  },
  {
    icon: '❤️',
    title: 'Conexión emocional',
    description: 'El cumpleaños es un momento especial. Tu marca será parte de esa celebración.',
  },
  {
    icon: '📊',
    title: 'Resultados medibles',
    description: 'Métricas claras sobre el impacto de tu campaña y conversiones.',
  },
]

export const Contact = () => {
  const [formData, setFormData] = useAtom(b2bFormDataAtom)
  const [formErrors, setFormErrors] = useAtom(b2bFormErrorsAtom)
  const [isLoading, setIsLoading] = useAtom(b2bIsLoadingAtom)
  const [submitMessage, setSubmitMessage] = useAtom(b2bSubmitMessageAtom)

  const updateField = (field: keyof B2BFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitMessage(null)

    const result = b2bFormSchema.safeParse(formData)

    if (!result.success) {
      const errors: B2BFormErrors = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof B2BFormData
        errors[field] = issue.message
      })
      setFormErrors(errors)
      return
    }

    setFormErrors({})
    setIsLoading(true)

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitMessage({
        type: 'success',
        text: '¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.',
      })

      setFormData({
        nombreNegocio: '',
        correo: '',
        industria: '',
      })
    } catch {
      setSubmitMessage({
        type: 'error',
        text: 'Hubo un error al enviar el formulario. Por favor intenta de nuevo.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="b2b" className="py-20 bg-whitesmoke dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-dark dark:text-white">¿Quieres que tu marca </span>
            <span className="text-tomato">aparezca aquí?</span>
          </h2>
          <Text.Regular size="base" color="gray" as="p" className="max-w-xl mx-auto">
            Únete a nuestra red de aliados y conecta con miles de usuarios en su día especial.
          </Text.Regular>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left - Value Props */}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-8">
              <span className="text-dark dark:text-white">¿Por qué ser </span>
              <span className="text-naples">aliado?</span>
            </h3>

            <div className="space-y-6">
              {valueProps.map((prop) => (
                <div key={prop.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-sm">
                    {prop.icon}
                  </div>
                  <div>
                    <Text.SemiBold size="base" color="dark" as="h4" className="mb-1 dark:text-white">
                      {prop.title}
                    </Text.SemiBold>
                    <Text.Regular size="sm" color="gray" as="p">
                      {prop.description}
                    </Text.Regular>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-8 w-full max-w-md">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-naples to-tomato rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  🤝
                </div>
                <Text.Bold size="xl" color="dark" as="h3" className="mb-2 dark:text-white">
                  Únete como Aliado
                </Text.Bold>
                <Text.Regular size="sm" color="gray" as="p">
                  Completa el formulario y te contactaremos
                </Text.Regular>
              </div>

              {/* Submit Message */}
              {submitMessage && (
                <div className={`p-3 rounded-lg mb-4 text-sm text-center ${
                  submitMessage.type === 'success'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {submitMessage.text}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nombre del Negocio */}
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                    Nombre del Negocio <span className="text-tomato">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm transition-all outline-none dark:bg-gray-800 dark:text-white
                      ${formErrors.nombreNegocio ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 focus:border-tomato focus:ring-2 focus:ring-tomato/10'}`}
                    value={formData.nombreNegocio}
                    onChange={(e) => updateField('nombreNegocio', e.target.value)}
                    disabled={isLoading}
                  />
                  {formErrors.nombreNegocio && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.nombreNegocio}</p>
                  )}
                </div>

                {/* Correo */}
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                    Correo de Contacto <span className="text-tomato">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="contacto@empresa.com"
                    className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm transition-all outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400
                      ${formErrors.correo ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 focus:border-tomato focus:ring-2 focus:ring-tomato/10'}`}
                    value={formData.correo}
                    onChange={(e) => updateField('correo', e.target.value)}
                    disabled={isLoading}
                  />
                  {formErrors.correo && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.correo}</p>
                  )}
                </div>

                {/* Industria */}
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                    Industria <span className="text-tomato">*</span>
                  </label>
                  <select
                    className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm transition-all outline-none bg-white dark:bg-gray-800 dark:text-white
                      ${formErrors.industria ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 focus:border-tomato focus:ring-2 focus:ring-tomato/10'}`}
                    value={formData.industria}
                    onChange={(e) => updateField('industria', e.target.value)}
                    disabled={isLoading}
                  >
                    <option value="">Selecciona una industria</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                  {formErrors.industria && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.industria}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  isLoading={isLoading}
                  className="mt-2"
                >
                  Quiero ser Aliado
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
