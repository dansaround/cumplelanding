'use client'

import { useState } from 'react'
import { Text, PopUp } from '@/components/ui'
import { termsOfService, privacyPolicy } from '@/content/legal'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('**') && paragraph.includes('**')) {
        const title = paragraph.match(/\*\*(.*?)\*\*/)?.[1] || ''
        const rest = paragraph.replace(/\*\*.*?\*\*/, '').trim()
        return (
          <div key={index} className="mb-4">
            <Text.SemiBold size="base" color="dark" as="h4" className="mb-1 dark:text-white">
              {title}
            </Text.SemiBold>
            {rest && (
              <Text.Regular size="sm" color="gray" as="p" className="leading-relaxed">
                {rest}
              </Text.Regular>
            )}
          </div>
        )
      }
      return (
        <Text.Regular key={index} size="sm" color="gray" as="p" className="mb-4 leading-relaxed">
          {paragraph}
        </Text.Regular>
      )
    })
  }

  return (
    <>
      <footer className="py-8 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-1">
              <span className="text-xl">🎁</span>
              <span className="text-lg font-bold">
                <span className="text-tomato">Cumple</span>
                <span className="text-naples">Plan</span>
              </span>
            </div>

            {/* Copyright */}
            <Text.Regular size="sm" color="cream-dark" as="p">
              &copy; {currentYear} CumplePlan. Todos los derechos reservados.
            </Text.Regular>

            {/* Links */}
            <div className="flex gap-6">
              <button
                onClick={() => setShowTerms(true)}
                className="text-cream-dark hover:text-naples transition-colors text-sm"
              >
                Términos
              </button>
              <button
                onClick={() => setShowPrivacy(true)}
                className="text-cream-dark hover:text-naples transition-colors text-sm"
              >
                Privacidad
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* PopUps */}
      <PopUp
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        title={termsOfService.title}
      >
        {formatContent(termsOfService.content)}
      </PopUp>

      <PopUp
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title={privacyPolicy.title}
      >
        {formatContent(privacyPolicy.content)}
      </PopUp>
    </>
  )
}
