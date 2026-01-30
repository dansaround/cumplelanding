type CategoryIconProps = {
  icon: string
  className?: string
}

const iconPaths: Record<string, JSX.Element> = {
  utensils: (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3v18h1V3H3zm3 0v10a3 3 0 003 3h1v5h1v-5h1a3 3 0 003-3V3h-1v10a2 2 0 01-2 2h-1V3H11v12h-1a2 2 0 01-2-2V3H6z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18 3v8a2 2 0 002 2v8h1v-8a2 2 0 002-2V3h-1v8a1 1 0 01-1 1v-9h-1v9a1 1 0 01-1-1V3h-1z"
      />
    </>
  ),
  sparkles: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  ),
  'shopping-bag': (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  ),
  music: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
    />
  ),
  dumbbell: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6.5 6.5h-2a1 1 0 00-1 1v9a1 1 0 001 1h2m0-11v11m0-11h2v11h-2m11-11h2a1 1 0 011 1v9a1 1 0 01-1 1h-2m0-11v11m0-11h-2v11h2m-9-5.5h4"
    />
  ),
}

export const CategoryIcon = ({ icon, className = '' }: CategoryIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      {iconPaths[icon] || iconPaths.sparkles}
    </svg>
  )
}
