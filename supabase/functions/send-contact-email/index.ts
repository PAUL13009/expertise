import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'npm:resend@2.0.0'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || 're_hoEbn2Yu_4nY7dZtdRAi7h44Q5XEegGVU'
const AGENT_EMAIL = 'paul.nogaro@gmail.com'

console.log('Edge Function initialized')
console.log('RESEND_API_KEY present:', !!RESEND_API_KEY)

const resend = new Resend(RESEND_API_KEY)

serve(async (req) => {
  console.log('Request received:', req.method, req.url)
  
  // Gérer les requêtes CORS preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }
  
  try {
    // Récupérer les données du message depuis le trigger
    const body = await req.json()
    console.log('Request body:', JSON.stringify(body))
    
    const { record } = body
    
    if (!record) {
      console.error('No record provided in request body')
      return new Response(
        JSON.stringify({ error: 'No record provided' }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      )
    }
    
    console.log('Processing record:', record.email, record.nom)

    // Préparer le contenu de l'email
    const contactMethod = record.contact_method === 'telephone-whatsapp' 
      ? 'Téléphone/WhatsApp' 
      : 'Email'
    
    const emailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4682B4; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #4682B4; }
            .value { margin-top: 5px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nouveau message de contact</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nom complet :</div>
                <div class="value">${record.nom} ${record.prenom || ''}</div>
              </div>
              <div class="field">
                <div class="label">Email :</div>
                <div class="value">${record.email}</div>
              </div>
              ${record.telephone ? `
              <div class="field">
                <div class="label">Téléphone :</div>
                <div class="value">${record.telephone}</div>
              </div>
              ` : ''}
              ${record.pays ? `
              <div class="field">
                <div class="label">Pays de résidence :</div>
                <div class="value">${record.pays}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Méthode de contact préférée :</div>
                <div class="value">${contactMethod}</div>
              </div>
              ${record.projet ? `
              <div class="field">
                <div class="label">Description du projet :</div>
                <div class="value">${record.projet.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>Message reçu le ${new Date(record.created_at).toLocaleString('fr-FR')}</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Envoyer l'email via Resend SDK
    console.log('Sending email to:', AGENT_EMAIL)
    console.log('Using API key:', RESEND_API_KEY.substring(0, 10) + '...')
    
    const emailPayload = {
      from: 'L\'Agence YL <onboarding@resend.dev>',
      to: AGENT_EMAIL,
      subject: `Nouveau message de contact - ${record.nom} ${record.prenom || ''}`,
      html: emailContent,
    }
    
    console.log('Email payload prepared')
    
    const { data, error } = await resend.emails.send(emailPayload)

    if (error) {
      console.error('Resend API error:', JSON.stringify(error))
      return new Response(
        JSON.stringify({ 
          error: error.message || 'Unknown error',
          details: error 
        }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      )
    }

    console.log('Email sent successfully:', data?.id)
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: data?.id,
        message: 'Email sent successfully'
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        } 
      }
    )
  } catch (error: any) {
    console.error('Unexpected error:', error)
    console.error('Error stack:', error.stack)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Unknown error',
        details: error.toString()
      }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        } 
      }
    )
  }
})

