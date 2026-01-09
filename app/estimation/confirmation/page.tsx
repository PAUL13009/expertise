'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedContent from '@/components/AnimatedContent'
import FadeContent from '@/components/FadeContent'

export default function EstimationConfirmationPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* SECTION 1 — CONFIRMATION CLAIRE */}
            <div className="text-center mb-16">
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.3}
                delay={0}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Votre demande d'estimation a bien été reçue !
                </h1>
              </AnimatedContent>
              
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.3}
                delay={0.2}
              >
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Nous allons maintenant analyser votre bien de façon précise et réaliste.
                </p>
              </AnimatedContent>
            </div>

            {/* SECTION 2 — CE QUI VA SE PASSER MAINTENANT */}
            <div className="mb-12">
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.3}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }}></div>
                  <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Prochaine étape
                </h2>
                </div>
              </AnimatedContent>
              
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.4}
              >
                <ul className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <li className="flex items-start" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>•</span>
                    <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Nous analysons manuellement les informations transmises</span>
                  </li>
                  <li className="flex items-start" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>•</span>
                    <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Nous comparons votre bien aux ventes réelles du secteur</span>
                  </li>
                  <li className="flex items-start" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>•</span>
                    <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Nous évaluons sa capacité à se vendre dans un délai de 2 à 3 mois</span>
                  </li>
                </ul>
              </AnimatedContent>
              
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.5}
              >
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-semibold italic" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Chaque estimation est réalisée avec l'objectif de vendre vite, au juste prix, et sans promesse irréaliste.
                </p>
              </AnimatedContent>
            </div>

            {/* SECTION 3 — LE FILTRE (NON NÉGOCIABLE) */}
            <div className="mb-12">
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.6}
              >
                <div className="bg-white border-2 rounded-lg p-8 md:p-10 shadow-lg" style={{ borderColor: '#4682B4' }}>
                  <div className="text-center mb-6">
                    <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }}></div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Notre engagement est simple
                    </h3>
                  </div>
                  
                  <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    <p className="font-semibold text-center" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Nous refusons de prendre des mandats lorsque le prix attendu n'est pas cohérent avec le marché.
                    </p>
                    
                    <div className="pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                      <p className="font-semibold mb-4 text-center" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Pourquoi ?
                      </p>
                      <ul className="space-y-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        <li className="flex items-start">
                          <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>•</span>
                          <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Parce qu'un bien surévalué ne se vend pas</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>•</span>
                          <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Parce qu'il se dévalorise avec le temps</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>•</span>
                          <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Parce que notre rôle est de protéger votre projet, pas de flatter un prix</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                      <p className="font-semibold text-center" style={{ color: '#dc2626', fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Si votre objectif est d'obtenir une estimation complaisante, notre méthode ne sera probablement pas adaptée.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedContent>
            </div>

            {/* SECTION 4 — DÉLAI & PRISE DE CONTACT */}
            <div className="mb-12">
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.7}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }}></div>
                  <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Quand serez-vous recontacté ?
                </h2>
                </div>
              </AnimatedContent>
              
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.8}
              >
                <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <p style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Vous serez contacté <span className="font-semibold" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>sous 24 à 48h ouvrées</span>
                  </p>
                  <p style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    <span className="font-semibold" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Par téléphone ou email</span>
                  </p>
                  <p style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Afin de vous restituer une estimation argumentée et exploitable
                  </p>
                  <p className="font-semibold mt-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Si votre bien correspond à notre méthode, nous vous expliquerons précisément la stratégie de mise en vente.
                  </p>
                </div>
              </AnimatedContent>
            </div>

            {/* SECTION 5 — RESPONSABILISATION DU VENDEUR */}
            <div className="mb-12">
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.9}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }}></div>
                  <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Pour aller plus loin
                </h2>
                </div>
              </AnimatedContent>
              
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={1.0}
              >
                <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <p className="text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Afin de tirer le meilleur parti de notre échange, nous vous invitons à réfléchir aux points suivants :
                  </p>
                  
                  <ul className="space-y-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>•</span>
                      <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        <span className="font-semibold" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Suis-je prêt à vendre au prix du marché réel ?</span>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>•</span>
                      <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        <span className="font-semibold" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Mon objectif est-il de vendre vite ou de tester un prix ?</span>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>•</span>
                      <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        <span className="font-semibold" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Suis-je ouvert à une stratégie fondée sur les faits plutôt que sur l'affect ?</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </AnimatedContent>
            </div>

            {/* SECTION 6 — NAVIGATION */}
            <div className="mt-16 pt-8 border-t" style={{ borderColor: '#e5e7eb' }}>
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={1.1}
              >
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <a
                    href="/"
                    className="group relative inline-block px-8 py-4 rounded-full font-medium overflow-hidden transition-all duration-500"
                    style={{
                      backgroundColor: 'white',
                      color: '#4682B4',
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '1.125rem',
                      textDecoration: 'none',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      letterSpacing: '0.3px'
                    }}
                    onMouseEnter={(e) => {
                      const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                      const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                      const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                      const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                      if (fill) {
                        fill.style.width = '100%'
                        fill.style.transform = 'translateX(-50%) scaleY(1)'
                      }
                      if (arrow) {
                        arrow.style.opacity = '1'
                        arrow.style.right = '-14px'
                      }
                      if (text) text.style.color = 'white'
                      if (textSpan) textSpan.style.transform = 'translateX(-8px)'
                    }}
                    onMouseLeave={(e) => {
                      const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                      const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                      const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                      const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                      if (fill) {
                        fill.style.width = '0%'
                        fill.style.transform = 'translateX(-50%) scaleY(0)'
                      }
                      if (arrow) {
                        arrow.style.opacity = '0'
                        arrow.style.right = '-30px'
                      }
                      if (text) text.style.color = '#4682B4'
                      if (textSpan) textSpan.style.transform = 'translateX(0)'
                    }}
                  >
                    <span
                      className="button-fill absolute bottom-0 left-1/2 h-full rounded-full"
                      style={{
                        width: '0%',
                        backgroundColor: '#4682B4',
                        transform: 'translateX(-50%) scaleY(0)',
                        transformOrigin: 'center bottom',
                        transition: 'width 0.5s ease-in-out, transform 0.5s ease-in-out',
                        zIndex: 1
                      }}
                    ></span>
                    <span className="button-text relative z-10 flex items-center justify-center transition-all duration-300" style={{ color: '#4682B4' }}>
                      <span className="transition-transform duration-300">Retour à l'accueil</span>
                      <svg
                        className="button-arrow absolute w-5 h-5 transition-all duration-300"
                        style={{
                          opacity: 0,
                          right: '-30px',
                          transition: 'opacity 0.4s ease-in-out, right 0.4s ease-in-out'
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </a>
                  
                  <a
                    href="/vente"
                    className="group relative inline-block px-8 py-4 rounded-full font-medium overflow-hidden transition-all duration-500"
                    style={{
                      backgroundColor: 'white',
                      color: '#4682B4',
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '1.125rem',
                      textDecoration: 'none',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      letterSpacing: '0.3px'
                    }}
                    onMouseEnter={(e) => {
                      const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                      const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                      const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                      const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                      if (fill) {
                        fill.style.width = '100%'
                        fill.style.transform = 'translateX(-50%) scaleY(1)'
                      }
                      if (arrow) {
                        arrow.style.opacity = '1'
                        arrow.style.right = '-14px'
                      }
                      if (text) text.style.color = 'white'
                      if (textSpan) textSpan.style.transform = 'translateX(-8px)'
                    }}
                    onMouseLeave={(e) => {
                      const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                      const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                      const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                      const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                      if (fill) {
                        fill.style.width = '0%'
                        fill.style.transform = 'translateX(-50%) scaleY(0)'
                      }
                      if (arrow) {
                        arrow.style.opacity = '0'
                        arrow.style.right = '-30px'
                      }
                      if (text) text.style.color = '#4682B4'
                      if (textSpan) textSpan.style.transform = 'translateX(0)'
                    }}
                  >
                    <span
                      className="button-fill absolute bottom-0 left-1/2 h-full rounded-full"
                      style={{
                        width: '0%',
                        backgroundColor: '#4682B4',
                        transform: 'translateX(-50%) scaleY(0)',
                        transformOrigin: 'center bottom',
                        transition: 'width 0.5s ease-in-out, transform 0.5s ease-in-out',
                        zIndex: 1
                      }}
                    ></span>
                    <span className="button-text relative z-10 flex items-center justify-center transition-all duration-300" style={{ color: '#4682B4' }}>
                      <span className="transition-transform duration-300">Découvrir notre méthode</span>
                      <svg
                        className="button-arrow absolute w-5 h-5 transition-all duration-300"
                        style={{
                          opacity: 0,
                          right: '-30px',
                          transition: 'opacity 0.4s ease-in-out, right 0.4s ease-in-out'
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </a>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </FadeContent>
      </section>

      <Footer />
    </main>
  )
}
