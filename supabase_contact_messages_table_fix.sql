-- Script de correction pour la fonction notify_new_contact_message
-- Exécutez ce script dans Supabase SQL Editor si vous avez des erreurs avec pg_net

-- Supprimer l'ancienne fonction et le trigger
DROP TRIGGER IF EXISTS trigger_notify_new_contact_message ON contact_messages;
DROP FUNCTION IF EXISTS notify_new_contact_message();

-- Vérifier et activer l'extension pg_net
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Fonction corrigée pour appeler la Edge Function qui envoie l'email
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

  -- Appeler la Edge Function via HTTP avec pg_net
  -- Note: Si cette syntaxe ne fonctionne pas, pg_net peut ne pas être disponible
  -- Dans ce cas, utilisez l'approche alternative ci-dessous
  SELECT net.http_post(
    url := supabase_url || '/functions/v1/send-contact-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || supabase_anon_key
    ),
    body := payload
  ) INTO request_id;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- En cas d'erreur, on log mais on ne bloque pas l'insertion
    RAISE WARNING 'Erreur lors de l''appel de la Edge Function: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recréer le trigger
CREATE TRIGGER trigger_notify_new_contact_message
  AFTER INSERT ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact_message();


