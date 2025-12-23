'use client'

import Image from 'next/image'
import VariableProximity from './VariableProximity'

export default function Footer() {
  const containerRef = null
  return (
    <footer className="bg-white text-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo centré */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/Logo-removebg-preview.png"
            alt="L'Agence Y L"
            width={200}
            height={200}
            className="object-contain"
            priority
          />
        </div>
        
        {/* Copyright */}
        <div className="text-center text-gray-600 text-sm mb-4">
          <p>
            <VariableProximity
              label={`© ${new Date().getFullYear()} L'Agence Y L. Tous droits réservés.`}
              fromFontVariationSettings="'wght' 200"
              toFontVariationSettings="'wght' 300"
              containerRef={null}
              radius={60}
              falloff="linear"
            />
          </p>
        </div>
        
        {/* Lien Espace Admin */}
        <div className="text-center">
          <a
            href="/admin/login"
            className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Espace Admin
          </a>
        </div>
      </div>
    </footer>
  )
}

