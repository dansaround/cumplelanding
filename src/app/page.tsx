import { Navigation } from '@/components/Navigation'
import { Header } from '@/components/Header'
import { Features } from '@/components/Features'
import { About } from '@/components/About'
import { Services } from '@/components/Services'
import { Gallery } from '@/components/Gallery'
import { Testimonials } from '@/components/Testimonials'
import { Team } from '@/components/Team'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import type { SiteData } from '@/types'
import JsonData from '@/data/data.json'

export default function Home() {
  const data = JsonData as SiteData

  return (
    <div>
      <Navigation />
      <Header />
      <Features data={data.Features} />
      <About data={data.About} />
      <Services data={data.Services} />
      <Gallery />
      <Testimonials data={data.Testimonials} />
      <Team data={data.Team} />
      <Contact data={data.Contact} />
      <Footer />
    </div>
  )
}
