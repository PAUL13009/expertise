'use client'

import { useState } from 'react'
import FadeContent from './FadeContent'
import VariableProximity from './VariableProximity'

interface Testimonial {
  id: number
  name: string
  date: string
  shortQuote: string
  fullText: string
}

export default function Testimonials() {
  const containerRef = null
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Marie D.',
      date: 'Janvier 2024',
      shortQuote: '« Un accompagnement professionnel et rassurant ! »',
      fullText: 'L\'Agence YL nous a accompagnés dans l\'achat de notre premier appartement à Marseille. L\'équipe a été à l\'écoute de nos besoins et nous a guidés à chaque étape. Leur professionnalisme et leur réactivité ont rendu cette transaction fluide et sans stress. Nous recommandons vivement leurs services.'
    },
    {
      id: 2,
      name: 'Pierre M.',
      date: 'Décembre 2023',
      shortQuote: '« Une expertise remarquable et un service personnalisé. »',
      fullText: 'Grâce à l\'Agence YL, nous avons vendu notre maison en moins de 3 mois. L\'estimation était précise et la stratégie de mise en marché adaptée à notre bien. L\'accompagnement a été constant jusqu\'à la signature finale. Une agence de confiance que nous recommandons sans hésitation.'
    },
    {
      id: 3,
      name: 'Sophie L.',
      date: 'Novembre 2023',
      shortQuote: '« Une équipe à l\'écoute et très professionnelle. »',
      fullText: 'Nous cherchions un appartement à louer dans le 8ème arrondissement. L\'Agence YL a su comprendre nos critères et nous a présenté plusieurs biens correspondant parfaitement à nos attentes. Le processus de location a été simplifié grâce à leur expertise. Nous sommes très satisfaits de leur service.'
    },
    {
      id: 4,
      name: 'Jean-Claude R.',
      date: 'Octobre 2023',
      shortQuote: '« Un service irréprochable de A à Z. »',
      fullText: 'L\'Agence YL a géré la vente de notre bien immobilier avec un professionnalisme exemplaire. Chaque étape a été expliquée clairement et le suivi a été régulier. Nous avons particulièrement apprécié leur transparence et leur disponibilité. Une expérience très positive que nous recommandons.'
    },
    {
      id: 5,
      name: 'Camille B.',
      date: 'Septembre 2023',
      shortQuote: '« Une agence qui tient ses engagements ! »',
      fullText: 'Nous avons fait appel à l\'Agence YL pour l\'estimation de notre appartement. Le rapport était détaillé et l\'analyse du marché très pertinente. Le conseiller a pris le temps de répondre à toutes nos questions. Un service de qualité qui nous a permis de prendre les bonnes décisions.'
    }
  ]

  const handlePrevious = () => {
    setCurrentTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const currentTestimonial = testimonials[currentTestimonialIndex]

  return (
    <section id="temoignages" className="pt-20 pb-20 bg-stone-50">
      <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Colonne de gauche - Titre et notes */}
            <div className="md:col-span-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                <VariableProximity
                  label="Ce que nos clients disent de nous"
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 700"
                  containerRef={null}
                  radius={100}
                  falloff="linear"
                />
              </h2>
              
              {/* Notes */}
              <div className="space-y-4 pt-4 border-t border-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-serif" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                    4.8
                  </span>
                  <span className="text-2xl" style={{ color: '#4682B4' }}>★</span>
                  <span className="text-sm text-gray-600 ml-2">/ 295 avis TripAdvisor</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-serif" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                    4.7
                  </span>
                  <span className="text-2xl" style={{ color: '#4682B4' }}>★</span>
                  <span className="text-sm text-gray-600 ml-2">/ 742 avis Google</span>
                </div>
              </div>

              {/* Flèches de navigation - Sous les notes */}
              <div className="flex gap-2 mt-6">
                <button 
                  onClick={handlePrevious}
                  className="w-10 h-10 flex items-center justify-center transition-all hover:scale-110 hover:shadow-md"
                  style={{ border: '1px solid #4682B4', color: '#4682B4' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#4682B4';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#4682B4';
                  }}
                  aria-label="Témoignage précédent"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={handleNext}
                  className="w-10 h-10 flex items-center justify-center transition-all hover:scale-110 hover:shadow-md"
                  style={{ border: '1px solid #4682B4', color: '#4682B4' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#4682B4';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#4682B4';
                  }}
                  aria-label="Témoignage suivant"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Colonne de droite - Carrousel de témoignages */}
            <div className="md:col-span-2 relative">
              <div key={currentTestimonialIndex} className="animate-fade-in">
                <div className="bg-white rounded-lg shadow-lg p-8 md:p-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Colonne gauche - Nom, date et citation */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-serif mb-2" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                          <VariableProximity
                            label={currentTestimonial.name}
                            fromFontVariationSettings="'wght' 400"
                            toFontVariationSettings="'wght' 600"
                            containerRef={null}
                            radius={80}
                            falloff="linear"
                          />
                        </h3>
                        <p className="text-sm text-gray-600">
                          {currentTestimonial.date}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-2xl md:text-3xl font-serif leading-relaxed" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                          <VariableProximity
                            label={currentTestimonial.shortQuote}
                            fromFontVariationSettings="'wght' 400"
                            toFontVariationSettings="'wght' 600"
                            containerRef={null}
                            radius={100}
                            falloff="linear"
                          />
                        </p>
                      </div>
                    </div>

                    {/* Colonne droite - Texte complet */}
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        <VariableProximity
                          label={currentTestimonial.fullText}
                          fromFontVariationSettings="'wght' 300"
                          toFontVariationSettings="'wght' 500"
                          containerRef={null}
                          radius={80}
                          falloff="linear"
                        />
                      </p>
                      <a 
                        href="#contact"
                        className="inline-block text-sm font-semibold underline transition-all hover:opacity-80 hover:scale-105 hover:translate-x-1"
                        style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}
                      >
                        <VariableProximity
                          label="LIRE LA SUITE"
                          fromFontVariationSettings="'wght' 400"
                          toFontVariationSettings="'wght' 600"
                          containerRef={null}
                          radius={60}
                          falloff="linear"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Indicateurs de position */}
              <div className="flex justify-center items-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentTestimonialIndex
                        ? 'w-8 h-2'
                        : 'w-2 h-2 bg-gray-300'
                    }`}
                    style={index === currentTestimonialIndex ? { backgroundColor: '#4682B4' } : {}}
                    onMouseEnter={(e) => {
                      if (index !== currentTestimonialIndex) {
                        e.currentTarget.style.backgroundColor = 'rgba(70, 130, 180, 0.5)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (index !== currentTestimonialIndex) {
                        e.currentTarget.style.backgroundColor = '#d1d5db'
                      }
                    }}
                    aria-label={`Aller au témoignage ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeContent>
    </section>
  )
}

