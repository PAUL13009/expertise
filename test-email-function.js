// Script de test pour vérifier la fonction Edge
// Exécutez ce script avec : node test-email-function.js

const SUPABASE_URL = 'https://apuptkqrzjhpgebgqbrc.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwdXB0a3FyempocGdlYmdxYnJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxODkzNDksImV4cCI6MjA4MTc2NTM0OX0.yCka6xYDLAu-wFTlHHtzreDZMvzogM8pzO5N_bXUkcY'

async function testEmailFunction() {
  console.log('🧪 Test de la fonction Edge send-contact-email\n')
  
  const testData = {
    record: {
      id: 'test-' + Date.now(),
      nom: 'Test',
      prenom: 'User',
      email: 'test@example.com',
      telephone: '0612345678',
      pays: 'France',
      projet: 'Test de l\'envoi d\'email depuis le script de test',
      contact_method: 'email',
      created_at: new Date().toISOString()
    }
  }
  
  console.log('📤 Envoi des données de test...')
  console.log('Données:', JSON.stringify(testData, null, 2))
  
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-contact-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(testData)
    })
    
    const result = await response.json()
    
    console.log('\n📥 Réponse reçue:')
    console.log('Status:', response.status)
    console.log('Body:', JSON.stringify(result, null, 2))
    
    if (response.ok) {
      console.log('\n✅ Succès! L\'email devrait être envoyé.')
    } else {
      console.log('\n❌ Erreur:', result.error || result.message)
    }
  } catch (error) {
    console.error('\n❌ Erreur lors de l\'appel:', error.message)
    console.error('Stack:', error.stack)
  }
}

testEmailFunction()


