'use client'

import FadeContent from './FadeContent'
import VariableProximity from './VariableProximity'

export default function About() {
  const containerRef = null

  return (
    <section id="a-propos" className="pt-20 pb-12 bg-stone-50">
      <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xl md:text-2xl lg:text-3xl font-serif leading-relaxed max-w-5xl mx-auto" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
              <VariableProximity
                label="L'Agence YL, agence immobilière à Marseille fondée par une professionnelle diplômée d'un Bac+5, s'appuie sur plus de 10 ans d'expérience."
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 600"
                containerRef={null}
                radius={100}
                falloff="linear"
              />
              <br /><br />
              <VariableProximity
                label="Nous accompagnons nos clients avec expertise dans leurs projets d'achat, de vente ou de location immobilière, grâce à un réseau solide de professionnels."
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 600"
                containerRef={null}
                radius={100}
                falloff="linear"
              />
            </p>
            
            {/* Bouton "À propos de nous" */}
            <div className="mt-12 flex justify-center">
              <a 
                href="/a-propos"
                className="font-semibold transition-all"
                style={{ 
                  color: '#4682B4',
                  fontFamily: 'var(--font-poppins), sans-serif'
                }}
              >
                <VariableProximity
                  label="À propos de nous"
                  fromFontVariationSettings="'wght' 500"
                  toFontVariationSettings="'wght' 700"
                  containerRef={null}
                  radius={60}
                  falloff="linear"
                />
              </a>
            </div>
          </div>
        </div>
      </FadeContent>
    </section>
  )
}

