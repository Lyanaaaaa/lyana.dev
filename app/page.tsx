import Hero from '@/components/Hero'
import WhatIDo from '@/components/WhatIDo'
import FeaturedWork from '@/components/FeaturedWork'
import HowIWork from '@/components/HowIWork'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WhatIDo />
      <FeaturedWork />
      <HowIWork />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
}