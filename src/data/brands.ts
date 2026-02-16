import { atom } from 'jotai'

export type CategoryKey =
  | 'Comida y Bebidas'
  | 'Ropa y accesorios'
  | 'Cuidado Personal y Belleza'
  | 'Entretenimiento y Experiencias'
  | 'Hogar'

export type CategoryConfig = {
  color: string
  icon: string
  image: string
}

export type Brand = {
  id: string
  brandName: string
  category: CategoryKey
  coverage: string
  stores: string
  benefitSummary: string
  benefitFull: string
  requirements: string
  ages: string
  clientType: string
  detailCard: string
  image: string
  status: 'validado' | 'pendiente'
}

export const categories: Record<CategoryKey, CategoryConfig> = {
  'Comida y Bebidas': {
    color: 'bg-naples',
    icon: 'utensils',
    image: '/categories/food.jpg'
  },
  'Ropa y accesorios': {
    color: 'bg-naples/80',
    icon: 'shopping-bag',
    image: '/categories/retail.jpg'
  },
  'Cuidado Personal y Belleza': {
    color: 'bg-tomato',
    icon: 'sparkles',
    image: '/categories/beauty.jpg'
  },
  'Entretenimiento y Experiencias': {
    color: 'bg-tomato/70',
    icon: 'music',
    image: '/categories/entertainment.jpg'
  },
  'Hogar': {
    color: 'bg-green-100 dark:bg-green-900/30',
    icon: 'home',
    image: '/categories/home.jpg'
  },
}

export const featuredBrands: Brand[] = [
  // ── Comida y Bebidas (4) ──
  {
    id: 'starbucks-bebida',
    brandName: 'Starbucks',
    category: 'Comida y Bebidas',
    coverage: 'Lima y Provincias',
    stores: 'Tiendas físicas, App Starbucks Rewards y web www.starbucks.pe',
    benefitSummary: 'Bebida gratis durante tu mes de cumpleaños',
    benefitFull: 'Bebida tamaño Alta gratis durante tu mes de cumpleaños',
    requirements: 'Starbucks Rewards member, +18, cuenta registrada, activo con compra en últimos 3 meses',
    ages: '+18',
    clientType: 'Clientes',
    detailCard: '1. Nombre de Beneficio: Bebida gratis durante tu mes de cumpleaños\n2. Requisitos: Starbucks Rewards member, +18, cuenta registrada, activo con compra en últimos 3 meses\n3. Cobertura: Lima y Provincias\n4. Tiendas: Tiendas físicas, App Starbucks Rewards y web www.starbucks.pe',
    image: '/assets/benefits/starbucks.png',
    status: 'validado',
  },
  {
    id: 'chilis-helado',
    brandName: "Chili's",
    category: 'Comida y Bebidas',
    coverage: 'Lima y Provincias',
    stores: 'Locales Chili\'s a nivel nacional',
    benefitSummary: 'Helado gratis el día de tu cumpleaños',
    benefitFull: 'Helado gratis el día de tu cumpleaños',
    requirements: 'Consumir en local y acreditar cumpleaños',
    ages: 'Sin restricción',
    clientType: 'Clientes / No Clientes',
    detailCard: '1. Nombre de Beneficio: Helado gratis el día de tu cumpleaños\n2. Requisitos: Consumir en local y acreditar cumpleaños\n3. Cobertura: Lima y Provincias\n4. Tiendas: Locales Chili\'s a nivel nacional',
    image: '/assets/benefits/chilis.png',
    status: 'validado',
  },
  {
    id: 'mcdonalds-mcflurry',
    brandName: "McDonald's",
    category: 'Comida y Bebidas',
    coverage: 'Lima y Provincias',
    stores: 'Tiendas físicas McDonald\'s',
    benefitSummary: 'McFlurry Oreo gratis el día de tu cumpleaños',
    benefitFull: 'McFlurry Oreo gratis el día de tu cumpleaños',
    requirements: 'Registro en app McDonald\'s, cuenta activa, fecha de nacimiento registrada',
    ages: 'Sin restricción',
    clientType: 'Clientes',
    detailCard: '1. Nombre de Beneficio: McFlurry Oreo gratis el día de tu cumpleaños\n2. Requisitos: Registro en app McDonald\'s, cuenta activa, fecha de nacimiento registrada\n3. Cobertura: Lima y Provincias\n4. Tiendas: Tiendas físicas McDonald\'s',
    image: '/assets/benefits/mcdonalds.png',
    status: 'validado',
  },
  {
    id: 'pizzahut-copa',
    brandName: 'Pizza Hut',
    category: 'Comida y Bebidas',
    coverage: 'Lima',
    stores: 'Tiendas físicas Pizza Hut a nivel nacional',
    benefitSummary: 'Copa Hut gratis el día de tu cumpleaños',
    benefitFull: 'Copa Hut gratis el día de tu cumpleaños',
    requirements: 'Consumo obligatorio en restaurante',
    ages: 'Sin restricción',
    clientType: 'Clientes / No Clientes',
    detailCard: '1. Nombre de Beneficio: Copa Hut gratis el día de tu cumpleaños\n2. Requisitos: Consumo obligatorio en restaurante\n3. Cobertura: Lima\n4. Tiendas: Tiendas físicas Pizza Hut a nivel nacional',
    image: '/assets/benefits/pizza-hut.png',
    status: 'validado',
  },

  // ── Ropa y accesorios (5) ──
  {
    id: 'bata-club',
    brandName: 'Bata',
    category: 'Ropa y accesorios',
    coverage: 'Lima y Provincias',
    stores: 'Tiendas físicas BATA',
    benefitSummary: 'Beneficios y puntos extra durante tu mes de cumpleaños',
    benefitFull: 'Programa Bata Club: acumulación de puntos (3%), canje, descuentos en mes de cumpleaños',
    requirements: 'Afiliación gratuita al programa Bata Club',
    ages: '+18',
    clientType: 'Clientes',
    detailCard: '1. Nombre de Beneficio: Beneficios y puntos extra durante tu mes de cumpleaños\n2. Requisitos: Afiliación gratuita al programa Bata Club\n3. Cobertura: Lima y Provincias\n4. Tiendas: Tiendas físicas BATA',
    image: '/assets/benefits/bata.png',
    status: 'validado',
  },
  {
    id: 'topitop-descuento',
    brandName: 'Topitop',
    category: 'Ropa y accesorios',
    coverage: 'Lima y Provincias',
    stores: 'Tiendas físicas Topitop',
    benefitSummary: '50% de descuento durante tu mes de cumpleaños',
    benefitFull: '50% de descuento durante tu mes de cumpleaños',
    requirements: 'Cliente registrado, cupón por correo, presentar DNI',
    ages: '+18',
    clientType: 'Clientes',
    detailCard: '1. Nombre de Beneficio: 50% de descuento durante tu mes de cumpleaños\n2. Requisitos: Cliente registrado, cupón por correo, presentar DNI\n3. Cobertura: Lima y Provincias\n4. Tiendas: Tiendas físicas Topitop',
    image: '/assets/benefits/topitop.png',
    status: 'validado',
  },
  {
    id: 'adidas-descuento',
    brandName: 'Adidas',
    category: 'Ropa y accesorios',
    coverage: 'Lima y Provincias',
    stores: 'Web adidas.pe, adidas app y tiendas concepto adidas',
    benefitSummary: '20% de descuento durante tu mes de cumpleaños',
    benefitFull: '20% de descuento durante tu mes de cumpleaños',
    requirements: 'Miembro adiClub, +18, cuenta con fecha de nacimiento registrada',
    ages: '+18',
    clientType: 'Clientes',
    detailCard: '1. Nombre de Beneficio: 20% de descuento durante tu mes de cumpleaños\n2. Requisitos: Miembro adiClub, +18, cuenta con fecha de nacimiento registrada\n3. Cobertura: Lima y Provincias\n4. Tiendas: Web adidas.pe, adidas app y tiendas concepto adidas',
    image: '/assets/benefits/adidas.png',
    status: 'validado',
  },
  {
    id: 'sifrah-descuento',
    brandName: 'Sifrah',
    category: 'Ropa y accesorios',
    coverage: 'Lima y Provincias',
    stores: 'Tiendas físicas Sifrah y tienda online Sifrah.com',
    benefitSummary: '20% de descuento durante tu mes de cumpleaños',
    benefitFull: '20% de descuento durante tu mes de cumpleaños',
    requirements: 'Cliente registrado en programa de fidelidad',
    ages: '+18',
    clientType: 'Clientes',
    detailCard: '1. Nombre de Beneficio: 20% de descuento durante tu mes de cumpleaños\n2. Requisitos: Cliente registrado en programa de fidelidad\n3. Cobertura: Lima y Provincias\n4. Tiendas: Tiendas físicas Sifrah y tienda online Sifrah.com',
    image: '/assets/benefits/sifrah.png',
    status: 'validado',
  },
  {
    id: 'isadora-puntos',
    brandName: 'ISADORA',
    category: 'Ropa y accesorios',
    coverage: 'Lima y Provincias',
    stores: 'Tiendas físicas Isadora y pe.isadoraonline.com',
    benefitSummary: 'Puntos extra por tu cumpleaños',
    benefitFull: 'Puntos extra por tu cumpleaños',
    requirements: 'Registrado en ISACLUB, 30 días de anticipación',
    ages: '+18',
    clientType: 'Clientes',
    detailCard: '1. Nombre de Beneficio: Puntos extra por tu cumpleaños\n2. Requisitos: Registrado en ISACLUB, 30 días de anticipación\n3. Cobertura: Lima y Provincias\n4. Tiendas: Tiendas físicas Isadora y pe.isadoraonline.com',
    image: '/assets/benefits/isadora.png',
    status: 'validado',
  },

  // ── Cuidado Personal y Belleza (4) ──
  {
    id: 'aruma-descuento',
    brandName: 'Aruma',
    category: 'Cuidado Personal y Belleza',
    coverage: 'Lima y Provincias',
    stores: 'Tiendas físicas ARUMA y tienda online www.aruma.pe',
    benefitSummary: '20% de descuento durante tu mes de cumpleaños',
    benefitFull: '20% de descuento por cumpleaños (exclusivo para clientes Magenta Top) + Descuentos mensuales',
    requirements: 'Ser miembro MAGENTA POINTS, +18, registro previo con DNI/email',
    ages: '+18',
    clientType: 'Clientes',
    detailCard: '1. Nombre de Beneficio: 20% de descuento durante tu mes de cumpleaños\n2. Requisitos: Ser miembro MAGENTA POINTS, +18, registro previo con DNI/email\n3. Cobertura: Lima y Provincias\n4. Tiendas: Tiendas físicas ARUMA y tienda online www.aruma.pe',
    image: '/assets/benefits/aruma.png',
    status: 'validado',
  },
  {
    id: 'aruma-puntos',
    brandName: 'Aruma',
    category: 'Cuidado Personal y Belleza',
    coverage: 'Lima y Provincias',
    stores: 'Tiendas físicas ARUMA y tienda online www.aruma.pe',
    benefitSummary: 'Puntos dobles en tus compras por tu cumpleaños',
    benefitFull: 'Puntos dobles durante el mes de cumpleaños (Magenta Top)',
    requirements: 'Ser miembro MAGENTA POINTS, +18, registro previo con DNI/email',
    ages: '+18',
    clientType: 'Clientes',
    detailCard: '1. Nombre de Beneficio: Puntos dobles en tus compras por tu cumpleaños\n2. Requisitos: Ser miembro MAGENTA POINTS, +18, registro previo con DNI/email\n3. Cobertura: Lima y Provincias\n4. Tiendas: Tiendas físicas ARUMA y tienda online www.aruma.pe',
    image: '/assets/benefits/aruma.png',
    status: 'validado',
  },
  {
    id: 'natura-descuento',
    brandName: 'Natura',
    category: 'Cuidado Personal y Belleza',
    coverage: 'Lima y Provincias',
    stores: 'Tiendas físicas Natura y canal online',
    benefitSummary: '30% de descuento y regalo por tu cumpleaños',
    benefitFull: '30% de descuento y regalo por tu cumpleaños',
    requirements: 'Cliente registrado, cupón CUMPLE30',
    ages: '+18',
    clientType: 'Clientes',
    detailCard: '1. Nombre de Beneficio: 30% de descuento y regalo por tu cumpleaños\n2. Requisitos: Cliente registrado, cupón CUMPLE30\n3. Cobertura: Lima y Provincias\n4. Tiendas: Tiendas físicas Natura y canal online',
    image: '/assets/benefits/natura.png',
    status: 'validado',
  },
  {
    id: 'sentua-puntos',
    brandName: 'Sentua',
    category: 'Cuidado Personal y Belleza',
    coverage: 'Lima y Provincias',
    stores: 'Tiendas Sentua y web www.sentua.com',
    benefitSummary: 'Puntos de regalo por tu cumpleaños',
    benefitFull: 'Puntos de regalo por tu cumpleaños',
    requirements: 'Registrado en web, programa de fidelidad',
    ages: '+18',
    clientType: 'Clientes',
    detailCard: '1. Nombre de Beneficio: Puntos de regalo por tu cumpleaños\n2. Requisitos: Registrado en web, programa de fidelidad\n3. Cobertura: Lima y Provincias\n4. Tiendas: Tiendas Sentua y web www.sentua.com',
    image: '/assets/benefits/sentua.png',
    status: 'validado',
  },

  // ── Entretenimiento y Experiencias (2) ──
  {
    id: 'lego-minifigura',
    brandName: 'Lego',
    category: 'Entretenimiento y Experiencias',
    coverage: 'Lima Metropolitana y Arequipa',
    stores: 'Tiendas físicas LEGO STORE en Lima: CC Jockey Plaza, CC Plaza San Miguel, CC Real Plaza Salaverry, CC Plaza Norte o en Arequipa: CC Mall Aventura Porongoche',
    benefitSummary: 'Minifigura personalizada gratis por tu cumpleaños',
    benefitFull: 'Minifigura personalizada que consta de 5 piezas: cabeza, torso, piernas, gorro o cabello y 1 accesorio + postal cumpleañera de regalo por cumpleaños',
    requirements: 'Compra realizada el mismo día del cumpleaños, presentación de DNI físico y presencia de la persona que cumple años',
    ages: '+3',
    clientType: 'Clientes',
    detailCard: '1. Nombre de Beneficio: Minifigura personalizada gratis por tu cumpleaños\n2. Requisitos: Compra realizada el mismo día del cumpleaños, presentación de DNI físico y presencia de la persona que cumple años\n3. Cobertura: Lima Metropolitana y Arequipa\n4. Tiendas: Tiendas físicas LEGO STORE en Lima: CC Jockey Plaza, CC Plaza San Miguel, CC Real Plaza Salaverry, CC Plaza Norte o en Arequipa: CC Mall Aventura Porongoche',
    image: '/assets/benefits/lego.png',
    status: 'validado',
  },
  {
    id: 'cineplanet-entrada',
    brandName: 'Cineplanet',
    category: 'Entretenimiento y Experiencias',
    coverage: 'Lima y Provincias',
    stores: 'Cines físicos Cineplanet a nivel nacional',
    benefitSummary: 'Entrada 2D gratis por tu cumpleaños',
    benefitFull: 'Entrada 2D gratis para cualquier película',
    requirements: 'Socio Cineplanet, afiliado online, primera compra digital si nuevo',
    ages: 'Sin restricción',
    clientType: 'Clientes',
    detailCard: '1. Nombre de Beneficio: Entrada 2D gratis por tu cumpleaños\n2. Requisitos: Socio Cineplanet, afiliado online, primera compra digital si nuevo\n3. Cobertura: Lima y Provincias\n4. Tiendas: Cines físicos Cineplanet a nivel nacional',
    image: '/assets/benefits/cineplanet.png',
    status: 'validado',
  },

  // ── Hogar (1) ──
  {
    id: 'casaideas-descuento',
    brandName: 'Casa Ideas',
    category: 'Hogar',
    coverage: 'Lima y Provincias',
    stores: 'Tiendas físicas Casaideas a nivel nacional',
    benefitSummary: 'Descuento exclusivo durante tu mes de cumpleaños',
    benefitFull: 'Descuento exclusivo durante tu mes de cumpleaños',
    requirements: 'Inscrito en Programa Cliente Casaideas',
    ages: '+18',
    clientType: 'Clientes',
    detailCard: '1. Nombre de Beneficio: Descuento exclusivo durante tu mes de cumpleaños\n2. Requisitos: Inscrito en Programa Cliente Casaideas\n3. Cobertura: Lima y Provincias\n4. Tiendas: Tiendas físicas Casaideas a nivel nacional',
    image: '/assets/benefits/casa-ideas.png',
    status: 'validado',
  },
]

// Derive allBrands by category from featuredBrands (no duplicated data)
export const allBrands: Record<CategoryKey, Brand[]> = {
  'Comida y Bebidas': featuredBrands.filter(b => b.category === 'Comida y Bebidas'),
  'Ropa y accesorios': featuredBrands.filter(b => b.category === 'Ropa y accesorios'),
  'Cuidado Personal y Belleza': featuredBrands.filter(b => b.category === 'Cuidado Personal y Belleza'),
  'Entretenimiento y Experiencias': featuredBrands.filter(b => b.category === 'Entretenimiento y Experiencias'),
  'Hogar': featuredBrands.filter(b => b.category === 'Hogar'),
}

// Jotai atom for brand detail popup
export const selectedBrandAtom = atom<Brand | null>(null)

// Helper to get all category keys
export const getCategoryKeys = (): CategoryKey[] => {
  return Object.keys(categories) as CategoryKey[]
}
