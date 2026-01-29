# Cumple Plan Landing Page

A Next.js 14 landing page template with TypeScript and App Router.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Bootstrap 3 CSS
- Font Awesome
- particles-bg (animated background)
- react-simple-image-viewer (gallery lightbox)
- @emailjs/browser (contact form)

## Getting Started

### Prerequisites

You will need [Node.js](https://nodejs.org/) (v18 or later) installed.

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
pnpm build
```

This generates a static export in the `/out` directory.

### Preview Production Build

```bash
pnpm start
```

## Customization

### Content

Edit `src/data/data.json` to change:
- Header title and paragraph
- About section text
- Features, Services, Testimonials
- Team members
- Contact information

### Images

Add images to `public/img/`:
- `about.jpg` - About section image
- `portfolio/` - Gallery images (01-small.jpg, 01-large.jpg, etc.)
- `team/` - Team member photos
- `testimonials/` - Testimonial avatars

### Styles

Modify CSS files in `public/css/`:
- `style.css` - Main custom styles
- `bootstrap.css` - Bootstrap framework

### Contact Form

To enable the contact form, update the EmailJS credentials in `src/components/Contact.tsx`:
```typescript
emailjs.sendForm(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  e.currentTarget,
  'YOUR_USER_ID'
)
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx    # Root layout with metadata
│   ├── page.tsx      # Main page
│   └── globals.css   # Global styles
├── components/
│   ├── Navigation.tsx
│   ├── Header.tsx
│   ├── Features.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Gallery.tsx
│   ├── Testimonials.tsx
│   ├── Team.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── data/
│   └── data.json     # Site content
└── types/
    └── index.ts      # TypeScript interfaces
```

## Credits

- Original template by [Issaaf Kattan](https://github.com/issaafalkattan/React-Landing-Page-Template)
- Design by [TemplateWire](http://www.templatewire.com)
- [Free-CSS.com](https://www.free-css.com/assets/files/free-css-templates/preview/page234/interact/)
