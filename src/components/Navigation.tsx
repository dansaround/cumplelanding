'use client'

import { useState, useEffect } from 'react'
import { atom, useAtom } from 'jotai'

// Dark mode atom - exported so other components can use it
export const darkModeAtom = atom(false)

type NavItem = {
  id: string
  href: string
  label: string
  icon: JSX.Element
}

const navItems: NavItem[] = [
  {
    id: 'header',
    href: '#header',
    label: 'Inicio',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'features',
    href: '#features',
    label: 'Cómo Funciona',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'aliados',
    href: '#aliados',
    label: 'Beneficios',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
  },
  {
    id: 'b2b',
    href: '#b2b',
    label: 'Empresas',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
]

const topNavLinks = [
  { href: '#features', label: 'Cómo Funciona' },
  { href: '#aliados', label: 'Beneficios' },
  { href: '#b2b', label: 'Para Empresas' },
]

// Threshold for switching between navs (in pixels)
const SCROLL_THRESHOLD = 100

export const Navigation = () => {
  const [isDark, setIsDark] = useAtom(darkModeAtom)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('header')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Initialize dark mode from localStorage and system preference
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('darkMode')
    if (stored !== null) {
      setIsDark(stored === 'true')
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [setIsDark])

  // Apply dark mode class to html element
  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', isDark)
      localStorage.setItem('darkMode', String(isDark))
    }
  }, [isDark, mounted])

  // Track scroll position and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      // Toggle between top nav and bottom nav
      setIsScrolled(scrollY > SCROLL_THRESHOLD)

      // Track active section
      const sections = ['header', 'features', 'aliados', 'b2b']
      const scrollPosition = scrollY + 200

      let currentSection = 'header'
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = sectionId
          }
        }
      }
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev)
  }

  const DarkModeButton = ({ className = '' }: { className?: string }) => (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-lg transition-colors ${className}`}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
    >
      {mounted && (
        isDark ? (
          <svg className="w-5 h-5 text-naples" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-dark dark:text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )
      )}
    </button>
  )

  return (
    <>
      {/* Top Navigation - Traditional Header Style */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm transition-all duration-500 ${
          isScrolled ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
        role="navigation"
        aria-label="Navegación superior"
        aria-hidden={isScrolled}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#header" className="flex items-center gap-1">
              <span className="text-2xl">🎁</span>
              <span className="text-xl font-bold">
                <span className="text-tomato">Cumple</span>
                <span className="text-naples">Plan</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {topNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-dark dark:text-white hover:text-tomato transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <DarkModeButton className="hover:bg-gray-100 dark:hover:bg-gray-800" />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <DarkModeButton className="hover:bg-gray-100 dark:hover:bg-gray-800" />
              <button
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <svg
                  className="w-6 h-6 text-dark dark:text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex flex-col gap-4">
                {topNavLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-dark dark:text-white hover:text-tomato transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Navigation - App Style */}
      <nav
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
        }`}
        role="navigation"
        aria-label="Navegación principal"
        aria-hidden={!isScrolled}
      >
        <div className="flex items-center gap-1 sm:gap-2 bg-dark/95 dark:bg-gray-800/95 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 rounded-full shadow-2xl border border-gray-700/50">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.id}
                href={item.href}
                className={`group relative p-2 sm:p-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-naples text-dark scale-110'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.icon}
                {/* Tooltip on hover */}
                <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-lg border border-gray-700">
                  {item.label}
                  {/* Tooltip arrow */}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                </span>
              </a>
            )
          })}

          {/* Divider */}
          <div className="w-px h-6 sm:h-8 bg-gray-600 mx-1" aria-hidden="true" />

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="group relative p-2 sm:p-3 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {mounted && (
              isDark ? (
                <svg className="w-6 h-6 text-naples" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )
            )}
            {/* Tooltip */}
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-lg border border-gray-700">
              {isDark ? 'Modo claro' : 'Modo oscuro'}
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
            </span>
          </button>
        </div>
      </nav>
    </>
  )
}
