import { ReactNode, ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-naples text-dark hover:bg-naples/90 border-transparent',
  secondary: 'bg-tomato text-white hover:bg-tomato/90 border-transparent',
  outline: 'bg-transparent text-tomato border-tomato hover:bg-tomato hover:text-white',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        font-semibold rounded-xl border-2 transition-all duration-200
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Enviando...
        </span>
      ) : (
        children
      )}
    </button>
  )
}
