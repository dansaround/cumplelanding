'use client'

import dynamic from 'next/dynamic'
import type { HeaderData } from '@/types'

const ParticlesBg = dynamic(() => import('particles-bg'), {
  ssr: false,
})

interface HeaderProps {
  data: HeaderData
}

export const Header = ({ data }: HeaderProps) => {
  return (
    <header id='header'>
      <div className='intro'>
        <ParticlesBg type='circle' bg={{ zIndex: 0, position: 'absolute', top: 0 }} />
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {data?.title ?? 'Loading'}
                  <span></span>
                </h1>
                <p>{data?.paragraph ?? 'Loading'}</p>
                <a
                  href='#features'
                  className='btn btn-custom btn-lg page-scroll'
                >
                  Learn More
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
