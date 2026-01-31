# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CumplePlan is a B2B landing page for a birthday benefits platform targeting the Peruvian market. Built with Next.js 14 App Router, TypeScript, and Tailwind CSS v4.

## Commands

```bash
pnpm dev      # Start dev server at localhost:3000
pnpm build    # Production build
pnpm start    # Serve production build
pnpm lint     # Run Next.js linting
```

## Architecture

### Stack
- **Next.js 14** with App Router (single-page landing)
- **Tailwind CSS v4** with custom theme in `globals.css` (@theme directive)
- **Jotai** for form state management
- **Zod** for form validation
- **TypeScript** with strict mode

### Key Directories
- `src/app/` - App Router entry (layout.tsx, page.tsx, globals.css)
- `src/components/` - Page sections (Header, Features, Contact, Footer, Navigation)
- `src/components/ui/` - Reusable UI primitives (Text, Button, PopUp)
- `src/components/features/` - Feature-specific components (BrandsCarousel, CategoryList, etc.)
- `src/hooks/` - Custom hooks (useCarouselScroll)
- `src/data/` - Static data (brands.ts, data.json)
- `src/types/` - TypeScript interfaces
- `src/content/` - Content definitions (legal.ts)

### Color System
Custom brand colors defined in `globals.css` using Tailwind v4 `@theme`:
- `naples` (#F9DC5C) - Primary yellow
- `tomato` (#FE4A49) - Accent red
- `cream` (#f9f5e9) - Background
- `dark` (#0a0a0a) - Text

### UI Component Patterns
- **Text component** (`src/components/ui/Text.tsx`): Compound component with weight variants (Bold, SemiBold, Regular, Light). Use as `<Text.Bold size="lg" color="dark">`.
- **Button component**: Variants (primary/secondary/outline), sizes (sm/md/lg), loading state.
- Path alias: `@/*` maps to `./src/*`

### Form Handling Pattern
Contact form uses Jotai atoms for state + Zod for validation + Google Apps Script endpoint. See `src/components/Contact.tsx` for the B2B form pattern.

### Brands Data Structure
Featured brands in carousel and categorized brand lists defined in `src/data/brands.ts`. Categories: Comida y Bebidas, Belleza, Tiendas, Entretenimiento, Bienestar.

## Language

- UI content is in Spanish (es-PE locale)
- Code comments and variable names in English
