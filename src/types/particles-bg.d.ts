declare module 'particles-bg' {
  import { ComponentType } from 'react'

  interface ParticlesBgProps {
    type?: 'color' | 'ball' | 'lines' | 'thick' | 'circle' | 'cobweb' | 'polygon' | 'square' | 'tadpole' | 'fountain' | 'random' | 'custom'
    bg?: boolean | {
      zIndex?: number
      position?: string
      top?: number | string
      left?: number | string
      bottom?: number | string
      right?: number | string
    }
    num?: number
    color?: string
    canvas?: any
    config?: any
  }

  const ParticlesBg: ComponentType<ParticlesBgProps>
  export default ParticlesBg
}
