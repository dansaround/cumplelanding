import { Navigation } from '@/components/Navigation'
import { Header } from '@/components/Header'
import { Features } from '@/components/Features'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="pt-16">
        <Header />
        <Features />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
