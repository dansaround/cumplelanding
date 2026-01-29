import { Navigation } from '@/components/Navigation'
import { Header } from '@/components/Header'
import { Features } from '@/components/Features'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="pt-16">
      <Navigation />
      <Header />
      <Features />
      <Contact />
      <Footer />
    </main>
  )
}
