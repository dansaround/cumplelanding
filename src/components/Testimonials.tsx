import type { TestimonialItem } from '@/types'

interface TestimonialsProps {
  data: TestimonialItem[]
}

export const Testimonials = ({ data }: TestimonialsProps) => {
  return (
    <div id='testimonials'>
      <div className='container'>
        <div className='section-title text-center'>
          <h2>What our clients say</h2>
        </div>
        <div className='row'>
          {data
            ? data.map((d, i) => (
                <div key={`${d.name}-${i}`} className='col-md-4'>
                  <div className='testimonial'>
                    <div className='testimonial-image'>
                      {' '}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/${d.img}`} alt={d.name} />{' '}
                    </div>
                    <div className='testimonial-content'>
                      <p>&quot;{d.text}&quot;</p>
                      <div className='testimonial-meta'> - {d.name} </div>
                    </div>
                  </div>
                </div>
              ))
            : 'loading'}
        </div>
      </div>
    </div>
  )
}
