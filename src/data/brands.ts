export type CategoryKey =
  | 'Comida y Bebidas'
  | 'Belleza'
  | 'Tiendas'
  | 'Entretenimiento'
  | 'Bienestar'

export type CategoryConfig = {
  color: string
  icon: string
  image: string
}

export type BrandBenefit = {
  benefit: string
  brandName: string
  category: CategoryKey
  image: string
}

export type BrandWithBenefits = {
  name: string
  benefits: string[]
}

export const categories: Record<CategoryKey, CategoryConfig> = {
  'Comida y Bebidas': {
    color: 'bg-naples',
    icon: 'utensils',
    image: '/categories/food.jpg'
  },
  'Belleza': {
    color: 'bg-tomato',
    icon: 'sparkles',
    image: '/categories/beauty.jpg'
  },
  'Tiendas': {
    color: 'bg-naples/80',
    icon: 'shopping-bag',
    image: '/categories/retail.jpg'
  },
  'Entretenimiento': {
    color: 'bg-tomato/70',
    icon: 'music',
    image: '/categories/entertainment.jpg'
  },
  'Bienestar': {
    color: 'bg-naples/60',
    icon: 'dumbbell',
    image: '/categories/wellness.jpg'
  },
}

export const featuredBrands: BrandBenefit[] = [
  {
    benefit: 'Descuento 20% en tu factura de cumpleaños',
    brandName: 'El Gran Bistró',
    category: 'Comida y Bebidas',
    image: '/categories/food.jpg'
  },
  {
    benefit: 'Spa completo gratis en tu día especial',
    brandName: 'Glow Studio',
    category: 'Belleza',
    image: '/categories/beauty.jpg'
  },
  {
    benefit: 'Descuento 25% en toda la tienda',
    brandName: 'Urban Threads',
    category: 'Tiendas',
    image: '/categories/retail.jpg'
  },
  {
    benefit: 'Mes de membresía gratis para celebrar',
    brandName: 'Harmony Fitness',
    category: 'Bienestar',
    image: '/categories/wellness.jpg'
  },
  {
    benefit: '2x1 en todas las películas del mes',
    brandName: 'Cinema Plus',
    category: 'Entretenimiento',
    image: '/categories/entertainment.jpg'
  },
  {
    benefit: 'Bebida premium gratis con cualquier compra',
    brandName: 'Café y Grano',
    category: 'Comida y Bebidas',
    image: '/categories/food.jpg'
  },
  {
    benefit: 'Tratamiento facial premium 50% descuento',
    brandName: 'Skin Radiance',
    category: 'Belleza',
    image: '/categories/beauty.jpg'
  },
  {
    benefit: 'Compra una prenda, lleva otra gratis',
    brandName: 'Style Haven',
    category: 'Tiendas',
    image: '/categories/retail.jpg'
  },
]

export const allBrands: Record<CategoryKey, BrandWithBenefits[]> = {
  'Comida y Bebidas': [
    { name: 'El Gran Bistró', benefits: ['Descuento 20% en la factura', 'Entrada gratis a eventos especiales'] },
    { name: 'Café y Grano', benefits: ['Bebida premium gratis', 'Pastel gratis con compra'] },
    { name: 'Dulces Celebraciones', benefits: ['Torta personalizada 30% descuento', 'Decoración gratis'] },
    { name: 'Olive Garden', benefits: ['2x1 en platos principales'] },
    { name: 'Sushi Master', benefits: ['15% descuento en compra', 'Entrada a eventos gastronómicos'] },
    { name: 'La Casa de la Pizza', benefits: ['Pizza mediana gratis con compra de grande'] },
    { name: 'Cocktail Lounge', benefits: ['Trago gratis con entrada'] },
    { name: 'Fresh & Fast', benefits: ['Combo desayuno gratis'] },
  ],
  'Belleza': [
    { name: 'Glow Studio', benefits: ['Spa completo gratis', 'Tratamiento facial premium 50% descuento'] },
    { name: 'Bloom Botanicals', benefits: ['Arreglo floral especial gratis', 'Consulta estilismo gratis'] },
    { name: 'Luxe Nails', benefits: ['Manicura y pedicura 25% descuento'] },
    { name: 'Hair Haven', benefits: ['Corte y tratamiento especial gratis'] },
    { name: 'Skin Radiance', benefits: ['Facial de diamante 40% descuento'] },
    { name: 'Beauty Bar', benefits: ['2 servicios por el precio de 1'] },
    { name: 'The Wellness Spa', benefits: ['Masaje relajante gratis 1 hora'] },
  ],
  'Tiendas': [
    { name: 'Urban Threads', benefits: ['Descuento 25% en toda la tienda', 'Compra una prenda, lleva dos'] },
    { name: 'Style Haven', benefits: ['Accesorios gratis con compra', '20% descuento extra en rebajas'] },
    { name: 'Tech World', benefits: ['Descuento 15% en todos los productos'] },
    { name: 'Home Decor Plus', benefits: ['2x1 en artículos seleccionados'] },
    { name: 'El Rincón del Libro', benefits: ['Compra 2 libros, lleva 1 gratis'] },
    { name: 'Sports Central', benefits: ['Equipo deportivo 30% descuento'] },
    { name: 'Gift Emporium', benefits: ['Envoltorio premium gratis'] },
  ],
  'Entretenimiento': [
    { name: 'Cinema Plus', benefits: ['2x1 todas las películas', 'Combo snacks con descuento'] },
    { name: 'Viajes Aventura', benefits: ['Descuento 25% en paquetes turísticos', 'Transferencias incluidas'] },
    { name: 'Escape Room Co', benefits: ['Juego gratis para grupo'] },
    { name: 'Game Zone', benefits: ['50 fichas gratis'] },
    { name: 'Concert Hall', benefits: ['Entrada preferencial a conciertos'] },
    { name: 'Museum Pass', benefits: ['Entrada gratis', 'Guía turístico gratis'] },
    { name: 'Parque de Aventuras', benefits: ['Entrada general con 1 actividad gratis'] },
  ],
  'Bienestar': [
    { name: 'Harmony Fitness', benefits: ['Mes de membresía gratis', 'Clase personal gratis'] },
    { name: 'Yoga Flow', benefits: ['3 clases gratis', 'Retiro wellness con descuento'] },
    { name: 'CrossFit Hub', benefits: ['Primer mes 50% descuento'] },
    { name: 'Centro de Meditación', benefits: ['Sesión privada gratis'] },
    { name: 'Nutrition Lab', benefits: ['Consulta nutricional gratis', 'Plan alimenticio personalizado'] },
    { name: 'Personal Training Pro', benefits: ['Sesión inicial gratis', 'Plan de entrenamiento personalizado'] },
  ],
}

// Helper para obtener las marcas repetidas para el carrusel infinito
export const getInfiniteBrands = (repeatCount: number = 3): BrandBenefit[] => {
  return Array(repeatCount).fill(featuredBrands).flat()
}

// Helper para obtener todas las categorías
export const getCategoryKeys = (): CategoryKey[] => {
  return Object.keys(categories) as CategoryKey[]
}
