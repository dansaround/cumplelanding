import { ReactNode } from 'react'

type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
type TextColor = 'dark' | 'naples' | 'tomato' | 'whitesmoke' | 'whitesmoke-dark' | 'white' | 'gray'

interface TextProps {
  children: ReactNode
  size?: TextSize
  color?: TextColor
  className?: string
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label'
}

const sizeClasses: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
}

const colorClasses: Record<TextColor, string> = {
  dark: 'text-dark',
  naples: 'text-naples',
  tomato: 'text-tomato',
  whitesmoke: 'text-whitesmoke',
  'whitesmoke-dark': 'text-whitesmoke-dark',
  white: 'text-white',
  gray: 'text-gray-600',
}

const Bold = ({
  children,
  size = 'base',
  color = 'dark',
  className = '',
  as: Component = 'span',
}: TextProps) => {
  return (
    <Component
      className={`font-bold ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    >
      {children}
    </Component>
  )
}

const SemiBold = ({
  children,
  size = 'base',
  color = 'dark',
  className = '',
  as: Component = 'span',
}: TextProps) => {
  return (
    <Component
      className={`font-semibold ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    >
      {children}
    </Component>
  )
}

const Regular = ({
  children,
  size = 'base',
  color = 'dark',
  className = '',
  as: Component = 'span',
}: TextProps) => {
  return (
    <Component
      className={`font-normal ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    >
      {children}
    </Component>
  )
}

const Light = ({
  children,
  size = 'base',
  color = 'dark',
  className = '',
  as: Component = 'span',
}: TextProps) => {
  return (
    <Component
      className={`font-light ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    >
      {children}
    </Component>
  )
}

export const Text = {
  Bold,
  SemiBold,
  Regular,
  Light,
}
