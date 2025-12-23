'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

interface Property {
  id: string
  title: string
  price: string
  location: string
  status: string
  description: string
  rooms: string
  bathrooms: string
  surface_habitable: string
  surface_totale: string
  parking: boolean
  terrasse: boolean
  piscine: boolean
  ascenseur: boolean
  cave: boolean
  jardin: boolean
  balcon: boolean
  garage: boolean
  climatisation: boolean
  interphone: boolean
  local_velo: boolean
  internet: boolean
  digicode: boolean
  fibre_optique: boolean
  gardien: boolean
  autres_prestations: string
  consommation_energetique: string
  emissions_ges: string
  images: Array<{ src: string; alt: string }>
  created_at?: string
}

export default function PropertyDetail() {
  const params = useParams()
  const router = useRouter()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (params.id) {
      fetchProperty(params.id as string)
    }
  }, [params.id])

  const fetchProperty = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setProperty(data)
    } catch (error: any) {
      console.error('Error fetching property:', error.message)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const goToPrevious = () => {
    if (!property || !property.images) return
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    if (!property || !property.images) return
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    )
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" style={{ borderColor: '#4682B4' }}></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Annonce introuvable</p>
          <Link href="/" className="text-blue-600 hover:underline" style={{ color: '#4682B4' }}>
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  const prestations = [
    { key: 'parking', label: 'Parking' },
    { key: 'terrasse', label: 'Terrasse' },
    { key: 'piscine', label: 'Piscine' },
    { key: 'ascenseur', label: 'Ascenseur' },
    { key: 'cave', label: 'Cave' },
    { key: 'jardin', label: 'Jardin' },
    { key: 'balcon', label: 'Balcon' },
    { key: 'garage', label: 'Garage' },
    { key: 'climatisation', label: 'Climatisation' },
    { key: 'interphone', label: 'Interphone' },
    { key: 'local_velo', label: 'Local vélo' },
    { key: 'internet', label: 'Internet' },
    { key: 'digicode', label: 'Digicode' },
    { key: 'fibre_optique', label: 'Fibre optique' },
    { key: 'gardien', label: 'Gardien' },
  ]

  const prestationsActives = prestations.filter(p => property[p.key as keyof Property] === true)

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Titre et prix */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-serif mb-2" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                {property.title}
              </h1>
              <p className="text-xl text-gray-600">{property.location}</p>
            </div>
            <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              property.status === 'À vendre' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}>
              {property.status}
            </span>
          </div>
          <p className="text-3xl font-bold" style={{ color: '#4682B4' }}>
            {property.price}
          </p>
        </div>

        {/* Carrousel d'images */}
        {property.images && property.images.length > 0 && (
          <div className="relative mb-8 rounded-lg overflow-hidden bg-gray-200" style={{ height: '500px' }}>
            <Image
              src={property.images[currentImageIndex]?.src || property.images[0].src}
              alt={property.images[currentImageIndex]?.alt || property.title}
              fill
              className="object-cover"
              priority
            />
            
            {/* Flèches de navigation */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
                  aria-label="Image précédente"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
                  aria-label="Image suivante"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Indicateurs */}
            {property.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`transition-all rounded-full ${
                      index === currentImageIndex
                        ? 'w-8 h-2 bg-white'
                        : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            {property.description && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-serif mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>
            )}

            {/* Caractéristiques principales */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-serif mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                Caractéristiques principales
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {property.rooms && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Chambres</p>
                    <p className="text-xl font-semibold">{property.rooms}</p>
                  </div>
                )}
                {property.bathrooms && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Salles de bain</p>
                    <p className="text-xl font-semibold">{property.bathrooms}</p>
                  </div>
                )}
                {property.surface_habitable && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Surface habitable</p>
                    <p className="text-xl font-semibold">{property.surface_habitable} m²</p>
                  </div>
                )}
                {property.surface_totale && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Surface totale</p>
                    <p className="text-xl font-semibold">{property.surface_totale} m²</p>
                  </div>
                )}
              </div>
            </div>

            {/* Prestations */}
            {prestationsActives.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-serif mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  Prestations
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {prestationsActives.map((prestation) => (
                    <div key={prestation.key} className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{prestation.label}</span>
                    </div>
                  ))}
                </div>
                {property.autres_prestations && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Autres prestations</p>
                    <p className="text-gray-700">{property.autres_prestations}</p>
                  </div>
                )}
              </div>
            )}

            {/* DPE */}
            {(property.consommation_energetique !== 'Non renseigné' || property.emissions_ges !== 'Non renseigné') && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-serif mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  Diagnostic de Performance Énergétique (DPE)
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {property.consommation_energetique !== 'Non renseigné' && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Consommation énergétique</p>
                      <p className="text-xl font-semibold">{property.consommation_energetique}</p>
                    </div>
                  )}
                  {property.emissions_ges !== 'Non renseigné' && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Émissions de GES</p>
                      <p className="text-xl font-semibold">{property.emissions_ges}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Colonne latérale - Contact */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-serif mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+33661736438" className="text-gray-700 hover:text-blue-600 transition-colors">
                    +33 6 61 73 64 38
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:lagenceyl@gmail.com" className="text-gray-700 hover:text-blue-600 transition-colors">
                    lagenceyl@gmail.com
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-gray-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-700">
                    142 Boulevard Notre Dame<br />
                    13008 Marseille
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}


