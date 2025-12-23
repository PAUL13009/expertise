'use client'

import { useRef, useEffect } from 'react'
import Hero from '@/components/Hero'
import StatsSection from '@/components/StatsSection'
import About from '@/components/About'
import Gallery from '@/components/Gallery'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import LocationSection from '@/components/LocationSection'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { useProximityContainer } from '@/components/ProximityProvider'

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)
  const containerRef = useProximityContainer()

  useEffect(() => {
    if (mainRef.current && containerRef) {
      containerRef.current = mainRef.current
    }
  }, [containerRef])

  return (
    <main ref={mainRef} className="min-h-screen">
      <Navbar />
      <Hero />
      <StatsSection />
      <About />
      <Features />
      <Gallery />
      <Testimonials />
      <LocationSection />
      <Footer />
    </main>
  )
}

