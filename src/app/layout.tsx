import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://cumpleplan.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CumplePlan - Celebra con beneficios exclusivos",
    template: "%s | CumplePlan",
  },
  description:
    "Descubre ofertas de cumpleaños de las mejores marcas. Regalos, descuentos, sorteos y experiencias seleccionadas para tu día especial.",
  keywords: [
    "cumpleaños",
    "ofertas",
    "descuentos",
    "regalos",
    "beneficios",
    "promociones",
    "celebración",
  ],
  authors: [{ name: "CumplePlan" }],
  creator: "CumplePlan",
  publisher: "CumplePlan",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: siteUrl,
    siteName: "CumplePlan",
    title: "CumplePlan - Celebra con beneficios exclusivos",
    description:
      "Descubre ofertas de cumpleaños de las mejores marcas. Regalos, descuentos, sorteos y experiencias seleccionadas para tu día especial.",
    images: [
      {
        url: "/img/og-image.png",
        width: 1200,
        height: 630,
        alt: "CumplePlan - Tu cumple, tus recompensas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CumplePlan - Celebra con beneficios exclusivos",
    description:
      "Descubre ofertas de cumpleaños de las mejores marcas. Regalos, descuentos, sorteos y experiencias.",
    images: ["/img/og-image.png"],
    creator: "@cumpleplan",
  },
  icons: {
    icon: "/assets/logo-cropped.svg",
    apple: "/img/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CumplePlan",
  url: siteUrl,
  description:
    "Plataforma de ofertas y beneficios de cumpleaños de las mejores marcas.",
  publisher: {
    "@type": "Organization",
    name: "CumplePlan",
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/img/logo.png`,
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CumplePlan",
  url: siteUrl,
  logo: `${siteUrl}/img/logo.png`,
  sameAs: [
    "https://facebook.com/cumpleplan",
    "https://instagram.com/cumpleplan",
    "https://twitter.com/cumpleplan",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hola@cumpleplan.com",
    availableLanguage: "Spanish",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/assets/logo-cropped.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="bg-cream text-dark font-poppins antialiased">
        {/* Skip Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-naples focus:text-dark focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
        >
          Ir al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
