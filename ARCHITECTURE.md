# Architecture Overview

This document explains how the CumplePlan Next.js landing page works.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14 | React framework with App Router |
| React | 18 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Utility-first styling |
| Jotai | 2.17 | State management |
| Zod | 4 | Schema validation |
| particles-bg | 2.5 | Animated background |
| Google Sheets | - | Form data backend |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      → Root layout with metadata & SEO
│   ├── page.tsx        → Homepage (assembles components)
│   └── globals.css     → Tailwind imports & custom styles
├── components/
│   ├── Navigation.tsx  → Fixed navbar with dark mode toggle
│   ├── Header.tsx      → Hero section with registration form
│   ├── Features.tsx    → Benefits/features grid
│   ├── Contact.tsx     → Contact form section
│   ├── Footer.tsx      → Site footer
│   └── ui/
│       ├── Button.tsx  → Reusable button component
│       ├── Text.tsx    → Typography components
│       ├── PopUp.tsx   → Modal component
│       └── index.ts    → Barrel exports
├── content/
│   └── legal.ts        → Terms of service & privacy policy
├── data/
│   └── data.json       → Static content data
└── types/
    └── index.ts        → TypeScript interfaces
```

## How Next.js App Router Works

Next.js uses a file-based routing system. The `src/app/` directory defines routes:

### layout.tsx - The Root Layout

This wraps every page and provides:

1. **HTML structure** - `<html>` and `<body>` tags with language set to Spanish
2. **SEO metadata** - Title, description, Open Graph, Twitter cards
3. **JSON-LD structured data** - Schema.org markup for search engines
4. **Google Fonts** - Poppins font family
5. **Accessibility** - Skip link for keyboard navigation

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Fonts, JSON-LD scripts */}
      </head>
      <body className="bg-cream text-dark font-poppins">
        <a href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  )
}
```

### page.tsx - The Homepage

Assembles all section components:

```tsx
export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="pt-16">
        <Header />
        <Features />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

## Server vs Client Components

### Server Components (default)
- Render on the server
- Cannot use React hooks
- Better for SEO

**Server components:** Features.tsx, Footer.tsx

### Client Components
- Must have `'use client'` directive
- Can use hooks and browser APIs

**Client components:**

| Component | Why Client? |
|-----------|-------------|
| Navigation.tsx | useState for mobile menu & dark mode |
| Header.tsx | Jotai atoms, form state, particles-bg |
| Contact.tsx | useState for form fields |
| PopUp.tsx | useState for modal state |

## Component Breakdown

### Navigation.tsx

Fixed navbar with:
- Logo and brand name
- Navigation links with smooth scroll
- Dark mode toggle (persists to localStorage)
- Mobile hamburger menu

```tsx
const [isDark, setIsDark] = useState(false)

useEffect(() => {
  document.documentElement.classList.toggle('dark', isDark)
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}, [isDark])
```

### Header.tsx

Hero section with:
- Animated particle background
- Registration form with validation
- Integration with Google Sheets backend

**Technologies used:**
- `particles-bg` with dynamic import (SSR disabled)
- `Jotai` atoms for form state
- `Zod` schema for validation

```tsx
const ParticlesBg = dynamic(() => import('particles-bg'), { ssr: false })

const formSchema = z.object({
  nombre: z.string().min(1, "Required"),
  cumpleanos: z.string().regex(dateRegex),
  email: z.string().email(),
  telefono: z.string().min(1),
  dni: z.string().optional(),
})
```

**Form submission flow:**
1. User fills form
2. Zod validates on submit
3. Data sent to Google Apps Script via POST
4. Script writes to Google Sheet
5. Success/error message displayed

### Features.tsx

Grid of benefit cards with icons. Uses the reusable `Text` component for typography consistency.

### Contact.tsx

Contact information section with:
- Location details
- Phone/email
- Social media links

### Footer.tsx

Site footer with copyright and legal links.

## UI Components

### Button.tsx

Reusable button with variants:

```tsx
<Button variant="primary" size="md" fullWidth isLoading={loading}>
  Submit
</Button>
```

Props: `variant`, `size`, `fullWidth`, `isLoading`, `disabled`

### Text.tsx

Typography system with semantic variants:

```tsx
<Text.Bold size="xl" color="dark" as="h1">Title</Text.Bold>
<Text.Regular size="sm" color="gray" as="p">Body text</Text.Regular>
<Text.SemiBold size="base" color="naples">Accent</Text.SemiBold>
```

### PopUp.tsx

Modal component for displaying content overlays:

```tsx
<PopUp isOpen={show} onClose={() => setShow(false)} title="Terms">
  {content}
</PopUp>
```

## State Management

### Jotai Atoms (Header.tsx)

```tsx
const formDataAtom = atom<FormData>({
  nombre: "",
  cumpleanos: "",
  email: "",
  telefono: "",
  dni: "",
})

const formErrorsAtom = atom<FormErrors>({})
const isLoadingAtom = atom(false)
const submitMessageAtom = atom<SubmitMessage | null>(null)
```

### Local State (useState)

Used for component-specific state like:
- Dark mode toggle
- Mobile menu open/close
- Modal visibility

## Styling Architecture

### Tailwind CSS 4

All styling uses Tailwind utility classes:

```tsx
<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
```

### Custom Colors (globals.css)

```css
@theme {
  --color-dark: #0a0a0a;
  --color-naples: #F9DC5C;
  --color-tomato: #FE4A49;
  --color-cream: #f9f5e9;
  --font-poppins: 'Poppins', sans-serif;
}
```

### Dark Mode

Implemented via Tailwind's `dark:` variant:

```tsx
className="bg-white dark:bg-gray-900 text-dark dark:text-white"
```

Toggle in Navigation adds/removes `dark` class on `<html>`.

## Data Flow

```
Google Sheet ←── Google Apps Script ←── Form Submit
                                              ↑
                                         Zod Validation
                                              ↑
                                         Jotai Atoms
                                              ↑
                                         User Input
```

## SEO & Accessibility

### Metadata (layout.tsx)

- Title template with site name
- Open Graph images for social sharing
- Twitter card configuration
- JSON-LD structured data

### Accessibility Features

- Skip link for keyboard navigation
- Semantic HTML structure
- ARIA labels on interactive elements
- Focus visible states
- Color contrast compliant

## TypeScript Types

Located in `src/types/index.ts`:

```typescript
interface FeatureItem {
  icon: string
  title: string
  description: string
}

interface ContactData {
  address: string
  phone: string
  email: string
}
```

## Build & Deployment

```bash
pnpm dev      # Development server
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

The project can be deployed to Vercel, Netlify, or any Node.js hosting platform.

## Key Patterns

### Import Alias

`@/` maps to `src/` (configured in tsconfig.json):

```tsx
import { Button } from '@/components/ui'
```

### Dynamic Imports

For client-only libraries:

```tsx
const ParticlesBg = dynamic(() => import('particles-bg'), { ssr: false })
```

### Barrel Exports

UI components exported from single index:

```tsx
// components/ui/index.ts
export { Button } from './Button'
export { Text } from './Text'
export { PopUp } from './PopUp'
```
