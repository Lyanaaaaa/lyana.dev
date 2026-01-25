import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WhatIDo from '@/components/WhatIDo'
import Experience from '@/components/Experience'
import ProjectsSection from '@/components/ProjectsSection'
import TechStack from '@/components/TechStack'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <div id="overview">
          <WhatIDo />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="projects">
          <ProjectsSection />
        </div>
        <div id="tech-stack">
          <TechStack />
        </div>
        <div id="contact">
          <Contact />
        </div>
        <Footer />
      </main>
    </>
  )
}