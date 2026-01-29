# Architecture Overview

This document explains how the Next.js landing page works.

## How Next.js App Router Works

Next.js uses a file-based routing system. The `src/app/` directory defines routes:

```
src/app/
├── layout.tsx    → Wraps all pages (like a template)
├── page.tsx      → The "/" route (homepage)
└── globals.css   → Global styles imported in layout
```

### layout.tsx - The Shell

This is the root layout that wraps every page. It:

1. **Defines HTML structure** - The `<html>` and `<body>` tags
2. **Sets metadata** - Title, description, author (used for SEO)
3. **Loads external resources**:
   - Bootstrap CSS for grid system and components
   - Font Awesome for icons
   - Custom styles from `style.css`
   - Google Fonts (Open Sans, Lato, Raleway)

```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* CSS links here */}
      </head>
      <body>
        {children}  {/* page.tsx renders here */}
      </body>
    </html>
  )
}
```

### page.tsx - The Homepage

This is the main page component. It:

1. **Imports all section components** (Navigation, Header, etc.)
2. **Loads data** from `data.json`
3. **Passes data as props** to each component

```tsx
import JsonData from '@/data/data.json'

export default function Home() {
  const data = JsonData as SiteData

  return (
    <div>
      <Navigation />
      <Header data={data.Header} />
      <Features data={data.Features} />
      {/* ...more sections */}
    </div>
  )
}
```

## Server vs Client Components

Next.js has two types of components:

### Server Components (default)

- Render on the server
- Cannot use React hooks (useState, useEffect)
- Cannot access browser APIs (window, document)
- Better for SEO and initial load

**Server components in this project:**
- Features.tsx
- About.tsx
- Services.tsx
- Testimonials.tsx
- Team.tsx
- Footer.tsx

### Client Components

- Render in the browser
- Can use hooks and browser APIs
- Must have `'use client'` at the top

**Client components in this project:**

| Component | Why Client? |
|-----------|-------------|
| Navigation.tsx | Could use scroll detection in future |
| Header.tsx | particles-bg needs browser APIs |
| Gallery.tsx | useState for image viewer modal |
| Contact.tsx | useState for form fields, emailjs |

## Component Breakdown

### Navigation.tsx

A fixed navbar that stays at the top. Links use anchor hrefs (`#about`, `#services`) for smooth scrolling (enabled by `scroll-behavior: smooth` in CSS).

```tsx
<nav className='navbar navbar-fixed-top'>
  <a href='#about'>About</a>
  <a href='#services'>Services</a>
  {/* ... */}
</nav>
```

### Header.tsx

The hero section with animated particle background.

```tsx
const ParticlesBg = dynamic(() => import('particles-bg'), { ssr: false })
```

`dynamic()` with `ssr: false` means:
- Don't try to render particles-bg on the server
- Only load it in the browser
- This prevents "window is not defined" errors

### Features.tsx

Maps over feature data to render cards with icons:

```tsx
{data.map((d, i) => (
  <div key={i} className='col-xs-6 col-md-3'>
    <i className={d.icon}></i>  {/* Font Awesome icon */}
    <h3>{d.title}</h3>
    <p>{d.text}</p>
  </div>
))}
```

### About.tsx

Static content section with two lists (Why/Why2 from data.json).

### Services.tsx

Similar to Features - maps over service items with icons.

### Gallery.tsx

Uses `react-simple-image-viewer` for a lightbox effect:

```tsx
const [currentImage, setCurrentImage] = useState(0)
const [isViewerOpen, setIsViewerOpen] = useState(false)

const openImageViewer = (index: number) => {
  setCurrentImage(index)
  setIsViewerOpen(true)
}
```

When you click a thumbnail, it opens a full-screen viewer.

### Testimonials.tsx

Displays customer quotes with their photos.

### Team.tsx

Shows team member cards with photos, names, and job titles.

### Contact.tsx

A form that uses EmailJS to send emails without a backend:

```tsx
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  emailjs.sendForm(
    'service_id',    // Your EmailJS service
    'template_id',   // Your email template
    e.currentTarget, // The form element
    'user_id'        // Your public key
  )
}
```

The form fields use `useState` for controlled inputs:

```tsx
const [name, setName] = useState('')
<input value={name} onChange={(e) => setName(e.target.value)} />
```

### Footer.tsx

Simple copyright notice.

## Data Flow

```
data.json
    │
    ▼
page.tsx (imports JSON, passes as props)
    │
    ├──► Header     receives data.Header
    ├──► Features   receives data.Features[]
    ├──► About      receives data.About
    ├──► Services   receives data.Services[]
    ├──► Gallery    (has its own hardcoded data)
    ├──► Testimonials receives data.Testimonials[]
    ├──► Team       receives data.Team[]
    └──► Contact    receives data.Contact
```

## TypeScript Types

Types are defined in `src/types/index.ts`:

```typescript
interface FeatureItem {
  icon: string;   // e.g., "fa fa-wordpress"
  title: string;  // e.g., "Lorem ipsum"
  text: string;   // Description
}

interface SiteData {
  Header: HeaderData;
  About: AboutData;
  Features: FeatureItem[];
  // ...etc
}
```

This provides:
- **Autocomplete** when accessing data properties
- **Error checking** if you misspell a property
- **Documentation** of what data is expected

## CSS Architecture

Styles come from multiple sources:

1. **Bootstrap 3** (`/public/css/bootstrap.css`)
   - Grid system (col-md-4, row, container)
   - Components (navbar, btn, form-control)

2. **Font Awesome** (`/public/fonts/font-awesome/`)
   - Icon classes (fa fa-check, fa fa-facebook)

3. **Custom styles** (`/public/css/style.css`)
   - Section styling (#about, #services)
   - Colors, fonts, spacing
   - Responsive adjustments

4. **globals.css** (`/src/app/globals.css`)
   - Enables smooth scrolling

## Build Output

Running `pnpm build` creates a static export in `/out`:

```
out/
├── index.html      (the rendered page)
├── _next/          (JavaScript bundles)
├── css/            (copied from public)
├── fonts/          (copied from public)
└── img/            (copied from public)
```

This can be deployed to any static hosting (GitHub Pages, Netlify, Vercel, etc.).

## Key Patterns

### The `@/` Import Alias

```tsx
import { Header } from '@/components/Header'
```

`@/` is configured in `tsconfig.json` to point to `src/`:

```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

This avoids relative path hell like `../../../components/Header`.

### Conditional Rendering

Components handle missing data gracefully:

```tsx
{data?.title ?? 'Loading'}
```

This means: if `data.title` exists, show it; otherwise show "Loading".

### Key Props in Lists

When mapping arrays, each item needs a unique `key`:

```tsx
{data.map((item, index) => (
  <div key={`${item.name}-${index}`}>
```

React uses keys to efficiently update the DOM when items change.
