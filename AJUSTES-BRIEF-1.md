# Plan de Acción - Ajustes Brief #1

## Resumen de Cambios Solicitados

### 1. ✅ Agregar Checkbox de Consentimiento

**Ubicación**: Formulario de contacto
**Acción**: Agregar checkbox de consentimiento antes del botón de envío

---

### 2. ✅ Modificar Texto de Beneficios

**Ubicación**: Sección de características/beneficios
**Cambio**:

- **Texto actual**: (por determinar en código)
- **Texto nuevo**: "Accede a experiencias ofrecidas **por nuestras marcas aliadas**, con información clara y beneficios genuinos."

---

### 3. ✅ Modificar Texto de Descuentos

**Ubicación**: Sección de características/beneficios
**Cambio**:

- **Texto nuevo**: "Registra tu cumpleaños y accede a descuentos únicos, sin registros repetidos."

---

### 4. ✅ Estandarizar Categorías de Marcas

**Ubicación**: `src/data/brands.ts`
**Cambio**: Actualizar las categorías a:

1. Comida y Bebidas
2. Ropa y accesorios
3. Cuidado Personal y Belleza
4. Entretenimiento y Experiencias
5. Hogar

**Acción**: Revisar y reasignar marcas existentes según las nuevas categorías

---

### 5. ✅ Agregar Sección de Preguntas Frecuentes (FAQ)

**Ubicación**: Nueva sección antes del Footer
**Componente**: Crear `FAQ.tsx` con acordeón
**Contenido**: 7 preguntas con sus respuestas

#### Preguntas:

1. **¿Qué es CUMPLEPLAN?**
   CUMPLEPLAN es una plataforma que reúne beneficios exclusivos de cumpleaños de distintas marcas, como regalos, descuentos, productos gratis y experiencias especiales para que celebres tu día.

2. **¿Cómo puedo acceder a los beneficios?**
   Primero debes registrarte en CUMPLEPLAN para conocer los beneficios de cumpleaños disponibles en distintos establecimientos. Luego, solo debes revisar los requisitos de cada beneficio y cumplir con las condiciones indicadas por la marca para poder acceder a él.

3. **¿Los beneficios son gratis?**
   ¡Sí! Muchas marcas ofrecen regalos completamente gratis por tu cumpleaños, como bebidas, postres o productos. Además, también puedes encontrar descuentos exclusivos y beneficios especiales para que celebres a lo grande.

4. **¿Los beneficios son válidos solo el día de mi cumpleaños?**
   Depende de la marca. Algunos beneficios son válidos únicamente el día de tu cumpleaños, mientras que otros se pueden usar durante todo el mes.

5. **¿Necesito registrarme en CUMPLEPLAN para usar los beneficios?**
   Sí, es obligatorio registrarte en CUMPLEPLAN para acceder a los beneficios. Esto te permitirá descubrir regalos, descuentos y sorpresas especiales por tu cumpleaños, además de participar en sorteos, experiencias y otras actividades exclusivas que tenemos preparadas para hacer tu día aún más especial.

6. **¿Los beneficios están disponibles en todo el Perú?**
   Muchos beneficios están disponibles a nivel nacional, aunque algunos pueden variar según la ciudad o la tienda. Puedes revisar la cobertura en el detalle de cada beneficio.

7. **¿CUMPLEPLAN tiene algún costo?**
   No. Registrarte y usar CUMPLEPLAN es completamente gratis, para que puedas conocer y acceder a los beneficios de cumpleaños sin ningún costo.

---

## Orden de Implementación

1. **Paso 1**: Revisar código actual para ubicar textos a modificar
2. **Paso 2**: Actualizar categorías en `src/data/brands.ts`
3. **Paso 3**: Modificar textos de beneficios/descuentos
4. **Paso 4**: Agregar checkbox de consentimiento al formulario
5. **Paso 5**: Crear componente FAQ con acordeón
6. **Paso 6**: Integrar FAQ en la página principal
7. **Paso 7**: Revisar y testear todos los cambios

---

## Archivos Modificados/Creados

- [x] `src/data/brands.ts` - Categorías actualizadas
- [x] `src/components/Features.tsx` - Textos modificados
- [x] `src/components/Contact.tsx` - Checkbox de consentimiento agregado
- [x] `src/components/FAQ.tsx` - Componente creado ✨
- [x] `src/app/page.tsx` - Sección FAQ integrada
- [x] `src/components/ui/Accordion.tsx` - UI primitive creada ✨
- [x] `src/components/ui/index.ts` - Export de Accordion agregado

---

## Notas de Implementación

- ✅ Mantener consistencia con el sistema de diseño existente (Tailwind v4, colores custom)
- ✅ Usar patrón de componentes existente (Text.tsx para tipografía)
- ✅ Validar que el checkbox de consentimiento sea requerido en el formulario
- ✅ FAQ es responsive y accesible
- ✅ Animaciones suaves implementadas en el acordeón

---

## Resumen de Cambios Implementados

### ✅ Completado - 10 de febrero, 2026

**1. Textos Actualizados en Features.tsx**

- Descuentos: "Registra tu cumpleaños y accede a descuentos únicos, sin registros repetidos."
- Experiencias: "Accede a experiencias ofrecidas por nuestras marcas aliadas, con información clara y beneficios genuinos."

**2. Categorías Estandarizadas** (6 categorías totales)

- Comida y Bebidas ✓
- Ropa y accesorios (antes: Tiendas)
- Cuidado Personal y Belleza (antes: Belleza)
- Entretenimiento y Experiencias (antes: Entretenimiento)
- Hogar (nueva categoría)
- Bienestar (mantenida)

**Marcas eliminadas del MVP:** Tech World, El Rincón del Libro, Gift Emporium
**Marcas reasignadas:** Home Decor Plus → Hogar, Sports Central → Ropa y accesorios

**3. Checkbox de Consentimiento Agregado**

- Campo agregado al schema de Zod con validación requerida
- Texto: "Acepto la Política de Privacidad y el procesamiento de mis datos personales para contacto comercial"
- Integrado en formulario B2B con estilos consistentes

**4. Componente Accordion Creado**

- UI primitive reutilizable en `src/components/ui/Accordion.tsx`
- Animaciones suaves con CSS transitions
- Accesibilidad implementada (aria-expanded)
- Compatible con Next.js 14 App Router

**5. Sección FAQ Implementada**

- 7 preguntas frecuentes con sus respuestas
- Usa componente Accordion para interacción
- Primera pregunta abierta por defecto
- Responsive y accesible

**6. Build Exitoso**

- ✅ Compilación sin errores
- ✅ Type checking pasado
- ✅ Linting pasado
- ✅ Generación de páginas estáticas exitosa

---

## Ajustes Adicionales - 10 de febrero, 2026

**1. Texto de Consentimiento Actualizado**

- Cambiado a: "Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad"
- El checkbox ya está posicionado arriba del botón de submit
- Validación requerida implementada (bloquea submit si no está marcado)

**2. Categoría Bienestar Eliminada**

- ✅ Eliminada del type CategoryKey
- ✅ Eliminada del objeto categories
- ✅ Eliminada del objeto allBrands
- Marca "Harmony Fitness" en featuredBrands reemplazada por "Home Decor Plus"

**3. Categoría Hogar Expandida**
Ahora incluye 7 marcas demo (antes solo 1):

- Home Decor Plus
- Casa & Jardín
- Muebles Express
- Textil Hogar
- Cocina Gourmet
- Electro Hogar
- Baño & Spa

**Categorías Finales (5 total):**

1. Comida y Bebidas
2. Ropa y accesorios
3. Cuidado Personal y Belleza
4. Entretenimiento y Experiencias
5. Hogar

---

## Ajustes Finales - 10 de febrero, 2026

**Checkbox de Consentimiento en Ambos Formularios**

- ✅ Formulario B2C (Header.tsx): Checkbox agregado arriba del botón
- ✅ Formulario B2B (Contact.tsx): Checkbox agregado arriba del botón
- ✅ Ambos incluyen validación requerida
- ✅ Texto en Header incluye links clickeables a Términos y Política
- ✅ Formulario no se puede enviar sin marcar el checkbox

**Build Final:**

- ✅ Compilación exitosa
- ✅ Type checking pasado
- ✅ Todas las validaciones funcionando
