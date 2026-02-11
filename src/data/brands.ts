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
    category: 'Cuidado Personal y Belleza',
    image: '/categories/beauty.jpg'
  },
  {
    benefit: 'Descuento 25% en toda la tienda',
    brandName: 'Urban Threads',
    category: 'Ropa y accesorios',
    image: '/categories/retail.jpg'
  },
  {
    benefit: 'Decoración especial gratis para tu celebración',
    brandName: 'Home Decor Plus',
    category: 'Hogar',
    image: '/categories/home.jpg'
  },
  {
    benefit: '2x1 en todas las películas del mes',
    brandName: 'Cinema Plus',
    category: 'Entretenimiento y Experiencias',
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
    category: 'Cuidado Personal y Belleza',
    image: '/categories/beauty.jpg'
  },
  {
    benefit: 'Compra una prenda, lleva otra gratis',
    brandName: 'Style Haven',
    category: 'Ropa y accesorios',
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
  'Ropa y accesorios': [
    { name: 'Urban Threads', benefits: ['Descuento 25% en toda la tienda', 'Compra una prenda, lleva dos'] },
    { name: 'Style Haven', benefits: ['Accesorios gratis con compra', '20% descuento extra en rebajas'] },
    { name: 'Sports Central', benefits: ['Equipo deportivo 30% descuento', 'Delivery gratis'] },
  ],
  'Cuidado Personal y Belleza': [
    { name: 'Glow Studio', benefits: ['Spa completo gratis', 'Tratamiento facial premium 50% descuento'] },
    { name: 'Bloom Botanicals', benefits: ['Arreglo floral especial gratis', 'Consulta estilismo gratis'] },
    { name: 'Luxe Nails', benefits: ['Manicura y pedicura 25% descuento'] },
    { name: 'Hair Haven', benefits: ['Corte y tratamiento especial gratis'] },
    { name: 'Skin Radiance', benefits: ['Facial de diamante 40% descuento'] },
    { name: 'Beauty Bar', benefits: ['2 servicios por el precio de 1'] },
    { name: 'The Wellness Spa', benefits: ['Masaje relajante gratis 1 hora'] },
  ],
  'Entretenimiento y Experiencias': [
    { name: 'Cinema Plus', benefits: ['2x1 todas las películas', 'Combo snacks con descuento'] },
    { name: 'Viajes Aventura', benefits: ['Descuento 25% en paquetes turísticos', 'Transferencias incluidas'] },
    { name: 'Escape Room Co', benefits: ['Juego gratis para grupo'] },
    { name: 'Game Zone', benefits: ['50 fichas gratis'] },
    { name: 'Concert Hall', benefits: ['Entrada preferencial a conciertos'] },
    { name: 'Museum Pass', benefits: ['Entrada gratis', 'Guía turístico gratis'] },
    { name: 'Parque de Aventuras', benefits: ['Entrada general con 1 actividad gratis'] },
  ],
  'Hogar': [
    { name: 'Home Decor Plus', benefits: ['2x1 en artículos seleccionados', 'Asesoría decoración gratis'] },
    { name: 'Casa & Jardín', benefits: ['Plantas decorativas gratis', 'Descuento 20% en todo'] },
    { name: 'Muebles Express', benefits: ['Envío gratis en compras', 'Armado sin costo'] },
    { name: 'Textil Hogar', benefits: ['Juego de sábanas gratis', '30% descuento en cortinas'] },
    { name: 'Cocina Gourmet', benefits: ['Set de utensilios 40% descuento', 'Libro recetas gratis'] },
    { name: 'Electro Hogar', benefits: ['15% descuento en electrodomésticos', 'Garantía extendida gratis'] },
    { name: 'Baño & Spa', benefits: ['Kit toallas premium gratis', 'Accesorios con descuento'] },
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
