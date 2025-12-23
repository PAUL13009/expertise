'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Erreur de connexion:', error)
        throw error
      }

      if (!data.user || !data.session) {
        throw new Error('Aucune session créée')
      }

      console.log('Connexion réussie, utilisateur:', data.user.email)
      
      // Attendre que la session soit bien persistée dans localStorage
      let sessionVerified = false
      for (let i = 0; i < 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 200))
        const { data: { session } } = await supabase.auth.getSession()
        if (session && session.user) {
          console.log('Session vérifiée et persistée')
          sessionVerified = true
          break
        }
      }

      if (!sessionVerified) {
        console.warn('Session non vérifiée après plusieurs tentatives, redirection quand même')
      }

      // Rediriger vers le dashboard
      window.location.href = '/admin/dashboard'
    } catch (error: any) {
      console.error('Erreur complète:', error)
      setError(error.message || 'Erreur de connexion')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-serif mb-6 text-center" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
          Connexion Admin
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#4682B4' }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}

