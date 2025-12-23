'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import Image from 'next/image'
import PropertyForm from '@/components/PropertyForm'

interface Property {
  id: string
  title: string
  location: string
  price: string
  surface: string
  rooms: string
  bathrooms: string
  type: string
  images: Array<{ src: string; alt: string }>
  created_at?: string
  updated_at?: string
}

interface ContactMessage {
  id: string
  nom: string
  prenom: string | null
  email: string
  telephone: string | null
  pays: string | null
  projet: string | null
  contact_method: string
  read: boolean
  created_at: string
}

type TabType = 'vendre' | 'louer' | 'messagerie' | 'trafic'

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [properties, setProperties] = useState<Property[]>([])
  const [loadingProperties, setLoadingProperties] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('vendre')
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loadingMessages, setLoadingMessages] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Attendre un peu avant de vérifier pour laisser le temps à la session d'être chargée
    const timer = setTimeout(() => {
      checkUser()
    }, 300)

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Changement d\'état auth:', _event, session?.user?.email)
      if (!session) {
        console.log('Pas de session, redirection vers login')
        setTimeout(() => {
          window.location.href = '/admin/login'
        }, 500)
      } else {
        console.log('Session trouvée:', session.user.email)
        setUser(session.user)
      }
    })

    return () => {
      clearTimeout(timer)
      subscription.unsubscribe()
    }
  }, [router])

  useEffect(() => {
    if (user) {
      fetchProperties()
    }
  }, [user])

  useEffect(() => {
    if (user && activeTab === 'messagerie') {
      fetchMessages()
    }
  }, [user, activeTab])

  const checkUser = async () => {
    try {
      // Vérifier d'abord la session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        console.error('Erreur de session:', sessionError)
      }
      
      if (session && session.user) {
        console.log('Session trouvée, utilisateur:', session.user.email)
        setUser(session.user)
        setLoading(false)
        return
      }

      // Si pas de session, essayer de récupérer l'utilisateur
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        console.error('Erreur utilisateur:', userError)
      }
      
      if (user) {
        console.log('Utilisateur trouvé:', user.email)
        setUser(user)
      } else {
        console.log('Aucun utilisateur trouvé, redirection vers login')
        // Attendre un peu avant de rediriger pour éviter les boucles
        setTimeout(() => {
          window.location.href = '/admin/login'
        }, 500)
      }
    } catch (error) {
      console.error('Erreur lors de la vérification:', error)
      setTimeout(() => {
        window.location.href = '/admin/login'
      }, 500)
    } finally {
      setLoading(false)
    }
  }

  const fetchProperties = async () => {
    setLoadingProperties(true)
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProperties(data || [])
    } catch (error: any) {
      console.error('Error fetching properties:', error.message)
    } finally {
      setLoadingProperties(false)
    }
  }

  const handleSubmit = async (propertyData: any): Promise<void> => {
    try {
      // Supprimer les champs qui n'existent pas dans la base de données
      const { photos, type, surface, ...dataWithoutExtras } = propertyData
      
      // Préparer les données pour Supabase en respectant exactement la structure de la table
      const processedData: any = {
        title: propertyData.title,
        price: propertyData.price,
        location: propertyData.location,
        status: propertyData.status || 'À vendre',
        description: propertyData.description || null,
        rooms: propertyData.rooms || null,
        bathrooms: propertyData.bathrooms || null,
        surface_habitable: propertyData.surface_habitable || null,
        parking: propertyData.parking || false,
        terrasse: propertyData.terrasse || false,
        piscine: propertyData.piscine || false,
        ascenseur: propertyData.ascenseur || false,
        cave: propertyData.cave || false,
        jardin: propertyData.jardin || false,
        balcon: propertyData.balcon || false,
        garage: propertyData.garage || false,
        climatisation: propertyData.climatisation || false,
        interphone: propertyData.interphone || false,
        local_velo: propertyData.local_velo || false,
        internet: propertyData.internet || false,
        digicode: propertyData.digicode || false,
        fibre_optique: propertyData.fibre_optique || false,
        gardien: propertyData.gardien || false,
        autres_prestations: propertyData.autres_prestations || null,
        surface_totale: propertyData.surface_totale || null,
        consommation_energetique: propertyData.consommation_energetique || null,
        emissions_ges: propertyData.emissions_ges || null,
        images: propertyData.images || [],
      }
      
      // Supprimer les champs null/undefined pour éviter les erreurs
      Object.keys(processedData).forEach(key => {
        if (processedData[key] === null || processedData[key] === undefined || processedData[key] === '') {
          if (typeof processedData[key] !== 'boolean') {
            delete processedData[key]
          }
        }
      })

      if (editingProperty) {
        // Mise à jour
        const { error } = await supabase
          .from('properties')
          .update(processedData)
          .eq('id', editingProperty.id)

        if (error) throw error
      } else {
        // Création
        const { error } = await supabase
          .from('properties')
          .insert([processedData])

        if (error) throw error
      }

      setShowAddForm(false)
      setEditingProperty(null)
      fetchProperties()
    } catch (error: any) {
      console.error('Erreur:', error)
      alert('Erreur: ' + error.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) return

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchProperties()
    } catch (error: any) {
      alert('Erreur: ' + error.message)
    }
  }

  const handleEdit = (property: Property) => {
    setEditingProperty(property)
    setShowAddForm(true)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const fetchMessages = async () => {
    setLoadingMessages(true)
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error: any) {
      console.error('Error fetching messages:', error.message)
    } finally {
      setLoadingMessages(false)
    }
  }

  const toggleMessageRead = async (id: string, currentReadStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: !currentReadStatus })
        .eq('id', id)

      if (error) throw error
      fetchMessages()
    } catch (error: any) {
      console.error('Error updating message:', error.message)
      alert('Erreur: ' + error.message)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchMessages()
    } catch (error: any) {
      alert('Erreur: ' + error.message)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
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

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
            Dashboard Admin
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Onglets */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-4">
            <button
              onClick={() => {
                setActiveTab('vendre')
                setShowAddForm(false)
                setEditingProperty(null)
              }}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === 'vendre'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'vendre' ? { borderColor: '#4682B4', color: '#4682B4' } : {}}
            >
              Vendre un bien
            </button>
            <button
              onClick={() => {
                setActiveTab('louer')
                setShowAddForm(false)
                setEditingProperty(null)
              }}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === 'louer'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'louer' ? { borderColor: '#4682B4', color: '#4682B4' } : {}}
            >
              Louer un bien
            </button>
            <button
              onClick={() => {
                setActiveTab('messagerie')
                setShowAddForm(false)
                setEditingProperty(null)
              }}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === 'messagerie'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'messagerie' ? { borderColor: '#4682B4', color: '#4682B4' } : {}}
            >
              Messagerie
            </button>
            <button
              onClick={() => {
                setActiveTab('trafic')
                setShowAddForm(false)
                setEditingProperty(null)
              }}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === 'trafic'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'trafic' ? { borderColor: '#4682B4', color: '#4682B4' } : {}}
            >
              Suivi du trafic
            </button>
          </div>
        </div>

        {/* Contenu selon l'onglet actif */}
        {(activeTab === 'vendre' || activeTab === 'louer') && (
          <>
            {/* Bouton Ajouter une annonce */}
            {!showAddForm && (
              <div className="mb-6">
                <button
                  onClick={() => {
                    setShowAddForm(true)
                    setEditingProperty(null)
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  style={{ backgroundColor: '#4682B4' }}
                >
                  + Ajouter une annonce
                </button>
              </div>
            )}

            {/* Formulaire d'ajout/modification */}
            {showAddForm && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                    {editingProperty ? 'Modifier l\'annonce' : `Nouvelle annonce - ${activeTab === 'vendre' ? 'Vente' : 'Location'}`}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddForm(false)
                      setEditingProperty(null)
                    }}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <PropertyForm
                  onSubmit={async (data) => {
                    const dataWithStatus = {
                      ...data,
                      status: activeTab === 'vendre' ? 'À vendre' : 'À louer'
                    }
                    await handleSubmit(dataWithStatus)
                  }}
                  onCancel={() => {
                    setShowAddForm(false)
                    setEditingProperty(null)
                  }}
                  initialData={editingProperty ? {
                    ...editingProperty,
                    status: activeTab === 'vendre' ? 'À vendre' : 'À louer'
                  } : undefined}
                />
              </div>
            )}

            {/* Liste des biens */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-serif mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                Liste des biens {activeTab === 'vendre' ? 'à vendre' : 'à louer'} ({properties.filter(p => (activeTab === 'vendre' ? p.type === 'À vendre' : p.type === 'À louer')).length})
              </h2>

              {loadingProperties ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" style={{ borderColor: '#4682B4' }}></div>
              <p className="text-gray-600">Chargement des biens...</p>
            </div>
              ) : properties.filter(p => activeTab === 'vendre' ? p.type === 'À vendre' : p.type === 'À louer').length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Aucun bien {activeTab === 'vendre' ? 'à vendre' : 'à louer'} enregistré pour le moment.</p>
                  <p className="text-sm mt-2">Cliquez sur "Ajouter une annonce" pour commencer.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.filter(p => activeTab === 'vendre' ? p.type === 'À vendre' : p.type === 'À louer').map((property) => (
                <div key={property.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {property.images && property.images.length > 0 && property.images[0].src && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={property.images[0].src}
                        alt={property.images[0].alt || property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg" style={{ color: '#4682B4' }}>
                        {property.title}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        property.type === 'À vendre' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {property.type}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                    <p className="font-semibold text-lg mb-3" style={{ color: '#4682B4' }}>
                      {property.price}
                    </p>
                    <div className="flex gap-4 text-sm text-gray-600 mb-4">
                      <span>{property.surface} m²</span>
                      <span>{property.rooms} ch.</span>
                      <span>{property.bathrooms} SDB</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(property)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        style={{ backgroundColor: '#4682B4' }}
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              </div>
              )}
            </div>
          </>
        )}

        {/* Onglet Messagerie */}
        {activeTab === 'messagerie' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                Messagerie ({messages.filter(m => !m.read).length} non lus)
              </h2>
              <button
                onClick={fetchMessages}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                style={{ backgroundColor: '#4682B4' }}
              >
                Actualiser
              </button>
            </div>

            {loadingMessages ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" style={{ borderColor: '#4682B4' }}></div>
                <p className="text-gray-600">Chargement des messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Aucun message pour le moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`border rounded-lg p-6 transition-all hover:shadow-md ${
                      message.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold" style={{ color: '#4682B4' }}>
                            {message.nom} {message.prenom || ''}
                          </h3>
                          {!message.read && (
                            <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                              Nouveau
                            </span>
                          )}
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><strong>Email:</strong> {message.email}</p>
                          {message.telephone && (
                            <p><strong>Téléphone:</strong> {message.telephone}</p>
                          )}
                          {message.pays && (
                            <p><strong>Pays:</strong> {message.pays}</p>
                          )}
                          <p><strong>Contact préféré:</strong> {
                            message.contact_method === 'telephone-whatsapp' 
                              ? 'Téléphone/WhatsApp' 
                              : 'Email'
                          }</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {formatDate(message.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => toggleMessageRead(message.id, message.read)}
                          className={`px-3 py-1 rounded text-sm transition-colors ${
                            message.read
                              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                          style={!message.read ? { backgroundColor: '#4682B4' } : {}}
                        >
                          {message.read ? 'Marquer non lu' : 'Marquer lu'}
                        </button>
                        <button
                          onClick={() => deleteMessage(message.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                    {message.projet && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-2">Projet:</p>
                        <p className="text-gray-600 whitespace-pre-wrap">{message.projet}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Onglet Suivi du trafic */}
        {activeTab === 'trafic' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-serif mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
              Suivi du trafic
            </h2>
            <div className="text-center py-12 text-gray-500">
              <p>Statistiques de trafic à venir.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
