'use client'

import dynamic from 'next/dynamic'
import { atom, useAtom } from 'jotai'
import { z } from 'zod'
import type { FormEvent } from 'react'

const ParticlesBg = dynamic(() => import('particles-bg'), {
  ssr: false,
})

// Zod schema for form validation
const formSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  cumpleanos: z.string().min(1, 'La fecha de cumpleaños es requerida'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  telefono: z.string().min(1, 'El teléfono es requerido'),
  dni: z.string().min(1, 'El DNI es requerido'),
})

type FormData = z.infer<typeof formSchema>
type FormErrors = Partial<Record<keyof FormData, string>>

// Jotai atoms for state management
const formDataAtom = atom<FormData>({
  nombre: '',
  cumpleanos: '',
  email: '',
  telefono: '',
  dni: '',
})

const formErrorsAtom = atom<FormErrors>({})
const isLoadingAtom = atom(false)
const submitMessageAtom = atom<{ type: 'success' | 'error'; text: string } | null>(null)

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyNoVhmjqHCc4CmnOxhK2vjGujln0WDomPX_Kawo6YuVnwsPO-bOUk3OoU1gDciUC-u-Q/exec'

export const Header = () => {
  const [formData, setFormData] = useAtom(formDataAtom)
  const [formErrors, setFormErrors] = useAtom(formErrorsAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const [submitMessage, setSubmitMessage] = useAtom(submitMessageAtom)

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field when user types
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitMessage(null)

    // Validate with Zod
    const result = formSchema.safeParse(formData)

    if (!result.success) {
      const errors: FormErrors = {}
      const issues = result.error.issues
      issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData
        errors[field] = issue.message
      })
      setFormErrors(errors)
      return
    }

    setFormErrors({})
    setIsLoading(true)

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.data),
      })

      // Since we're using no-cors, we can't read the response
      // We assume success if no error is thrown
      setSubmitMessage({
        type: 'success',
        text: '¡Registro exitoso! Revisa tu correo para ver tus ofertas de cumpleaños.',
      })

      // Clear form
      setFormData({
        nombre: '',
        cumpleanos: '',
        email: '',
        telefono: '',
        dni: '',
      })
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Hubo un error al enviar el formulario. Por favor intenta de nuevo.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <header id='header'>
      <style jsx>{`
        .header-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #fdf8f5 0%, #fff9f5 100%);
          position: relative;
          display: flex;
          align-items: center;
          padding: 40px 20px;
        }

        .header-content {
          display: flex;
          flex-wrap: wrap;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          gap: 40px;
          position: relative;
          z-index: 10;
        }

        .left-section {
          flex: 1;
          min-width: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-right: 20px;
        }

        .right-section {
          flex: 1;
          min-width: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 180, 150, 0.3);
          color: #C84A31;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 24px;
          width: fit-content;
        }

        .badge-icon {
          font-size: 16px;
        }

        .main-title {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 24px;
        }

        .main-title .highlight {
          color: #C84A31;
        }

        .main-title .dark {
          color: #1a1a1a;
        }

        .description {
          font-size: 18px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .features-list {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          color: #333;
          font-weight: 500;
        }

        .feature-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .dot-green {
          background: #22c55e;
        }

        .dot-red {
          background: #ef4444;
        }

        .dot-orange {
          background: #f97316;
        }

        .form-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          padding: 32px;
          width: 100%;
          max-width: 420px;
        }

        .form-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .form-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #ffb396 0%, #C84A31 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-size: 24px;
          color: white;
        }

        .form-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .form-subtitle {
          font-size: 14px;
          color: #666;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          margin-bottom: 6px;
        }

        .form-label .required {
          color: #C84A31;
        }

        .form-label .optional {
          color: #999;
          font-weight: 400;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #e5e5e5;
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.2s ease;
          outline: none;
          box-sizing: border-box;
        }

        .form-input:hover {
          border-color: #ccc;
        }

        .form-input:focus {
          border-color: #C84A31;
          box-shadow: 0 0 0 3px rgba(200, 74, 49, 0.1);
        }

        .form-input.error {
          border-color: #ef4444;
        }

        .error-message {
          color: #ef4444;
          font-size: 12px;
          margin-top: 4px;
        }

        .submit-button {
          width: 100%;
          padding: 14px 24px;
          background: #C84A31;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 8px;
        }

        .submit-button:hover:not(:disabled) {
          background: #b54129;
          transform: translateY(-1px);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .legal-text {
          font-size: 11px;
          color: #999;
          text-align: center;
          margin-top: 16px;
          line-height: 1.5;
        }

        .legal-text a {
          color: #C84A31;
          text-decoration: none;
        }

        .legal-text a:hover {
          text-decoration: underline;
        }

        .submit-message {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 14px;
          text-align: center;
        }

        .submit-message.success {
          background: #dcfce7;
          color: #166534;
        }

        .submit-message.error {
          background: #fef2f2;
          color: #dc2626;
        }

        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s ease-in-out infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 32px;
          }

          .left-section {
            padding-right: 0;
            text-align: center;
          }

          .main-title {
            font-size: 32px;
          }

          .features-list {
            justify-content: center;
          }

          .form-card {
            max-width: 100%;
          }
        }
      `}</style>

      <div className='header-container'>
        <ParticlesBg
          type='circle'
          bg={{ zIndex: 0, position: 'absolute', top: 0 }}
          color='#ffb39666'
          num={6}
        />

        <div className='header-content'>
          <div className='left-section'>
            <div className='badge'>
              <span className='badge-icon'>🎁</span>
              <span>Tu cumple, tus recompensas</span>
            </div>

            <h1 className='main-title'>
              <span className='dark'>Celebra con</span>
              <br />
              <span className='highlight'>beneficios exclusivos</span>
            </h1>

            <p className='description'>
              Descubre ofertas de cumpleaños de las mejores marcas. Beneficios reales,
              seleccionados para tu día especial — porque mereces ser celebrado.
            </p>

            <div className='features-list'>
              <div className='feature-item'>
                <span className='feature-dot dot-green'></span>
                <span>+100 Marcas Aliadas</span>
              </div>
              <div className='feature-item'>
                <span className='feature-dot dot-red'></span>
                <span>Ofertas Personalizadas</span>
              </div>
              <div className='feature-item'>
                <span className='feature-dot dot-orange'></span>
                <span>Registro Gratis</span>
              </div>
            </div>
          </div>

          <div className='right-section'>
            <div className='form-card'>
              <div className='form-header'>
                <div className='form-icon'>🎁</div>
                <h2 className='form-title'>Descubre Tus Ofertas</h2>
                <p className='form-subtitle'>Ingresa tu fecha de cumpleaños para comenzar</p>
              </div>

              {submitMessage && (
                <div className={`submit-message ${submitMessage.type}`}>
                  {submitMessage.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label className='form-label'>
                    Nombre <span className='required'>*</span>
                  </label>
                  <input
                    type='text'
                    className={`form-input ${formErrors.nombre ? 'error' : ''}`}
                    value={formData.nombre}
                    onChange={(e) => updateField('nombre', e.target.value)}
                    disabled={isLoading}
                  />
                  {formErrors.nombre && (
                    <div className='error-message'>{formErrors.nombre}</div>
                  )}
                </div>

                <div className='form-group'>
                  <label className='form-label'>
                    Tu Cumpleaños <span className='required'>*</span>
                  </label>
                  <input
                    type='date'
                    className={`form-input ${formErrors.cumpleanos ? 'error' : ''}`}
                    value={formData.cumpleanos}
                    onChange={(e) => updateField('cumpleanos', e.target.value)}
                    disabled={isLoading}
                  />
                  {formErrors.cumpleanos && (
                    <div className='error-message'>{formErrors.cumpleanos}</div>
                  )}
                </div>

                <div className='form-group'>
                  <label className='form-label'>
                    Correo electrónico <span className='optional'>(opcional)</span>
                  </label>
                  <input
                    type='email'
                    className={`form-input ${formErrors.email ? 'error' : ''}`}
                    placeholder='tu@ejemplo.com'
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    disabled={isLoading}
                  />
                  {formErrors.email && (
                    <div className='error-message'>{formErrors.email}</div>
                  )}
                </div>

                <div className='form-group'>
                  <label className='form-label'>
                    Teléfono <span className='required'>*</span>
                  </label>
                  <input
                    type='tel'
                    className={`form-input ${formErrors.telefono ? 'error' : ''}`}
                    value={formData.telefono}
                    onChange={(e) => updateField('telefono', e.target.value)}
                    disabled={isLoading}
                  />
                  {formErrors.telefono && (
                    <div className='error-message'>{formErrors.telefono}</div>
                  )}
                </div>

                <div className='form-group'>
                  <label className='form-label'>
                    DNI <span className='required'>*</span>
                  </label>
                  <input
                    type='text'
                    className={`form-input ${formErrors.dni ? 'error' : ''}`}
                    value={formData.dni}
                    onChange={(e) => updateField('dni', e.target.value)}
                    disabled={isLoading}
                  />
                  {formErrors.dni && (
                    <div className='error-message'>{formErrors.dni}</div>
                  )}
                </div>

                <button type='submit' className='submit-button' disabled={isLoading}>
                  {isLoading && <span className='loading-spinner'></span>}
                  {isLoading ? 'Enviando...' : 'Ver Mis Ofertas de Cumpleaños'}
                </button>
              </form>

              <p className='legal-text'>
                Al continuar, aceptas nuestros{' '}
                <a href='#'>Términos de Servicio</a> y{' '}
                <a href='#'>Política de Privacidad</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
