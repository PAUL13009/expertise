-- Créer la table contact_messages pour stocker les messages du formulaire de contact
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Informations du contact
  nom TEXT NOT NULL,
  prenom TEXT,
  email TEXT NOT NULL,
  telephone TEXT,
  pays TEXT,
  
  -- Contenu du message
  projet TEXT,
  contact_method TEXT NOT NULL CHECK (contact_method IN ('telephone-whatsapp', 'email')),
  
  -- Métadonnées
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- Activer Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion publique (n'importe qui peut envoyer un message)
CREATE POLICY "Allow public insert" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Politique pour permettre la lecture uniquement aux utilisateurs authentifiés (admin)
CREATE POLICY "Allow authenticated read" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

-- Politique pour permettre la mise à jour uniquement aux utilisateurs authentifiés (marquer comme lu)
CREATE POLICY "Allow authenticated update" ON contact_messages
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Politique pour permettre la suppression uniquement aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated delete" ON contact_messages
  FOR DELETE USING (auth.role() = 'authenticated');

-- Activer l'extension pg_net pour permettre les appels HTTP depuis PostgreSQL
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Fonction pour appeler la Edge Function qui envoie l'email
CREATE OR REPLACE FUNCTION notify_new_contact_message()
RETURNS TRIGGER AS $$
DECLARE
  payload text;
  supabase_url text;
  supabase_anon_key text;
  request_id bigint;
BEGIN
  -- URL de votre projet Supabase
  supabase_url := 'https://apuptkqrzjhpgebgqbrc.supabase.co';
  -- Clé anonyme de votre projet Supabase
  supabase_anon_key := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwdXB0a3FyempocGdlYmdxYnJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxODkzNDksImV4cCI6MjA4MTc2NTM0OX0.yCka6xYDLAu-wFTlHHtzreDZMvzogM8pzO5N_bXUkcY';

  -- Construire le payload avec les données du nouveau message
  payload := json_build_object(
    'record', json_build_object(
      'id', NEW.id,
      'nom', NEW.nom,
      'prenom', NEW.prenom,
      'email', NEW.email,
      'telephone', NEW.telephone,
      'pays', NEW.pays,
      'projet', NEW.projet,
      'contact_method', NEW.contact_method,
      'created_at', NEW.created_at
    )
  )::text;

  -- Appeler la Edge Function via HTTP avec la syntaxe correcte de pg_net
  SELECT net.http_post(
    url := supabase_url || '/functions/v1/send-contact-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || supabase_anon_key
    )::jsonb,
    body := payload
  ) INTO request_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger qui se déclenche après l'insertion d'un nouveau message
CREATE TRIGGER trigger_notify_new_contact_message
  AFTER INSERT ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact_message();

