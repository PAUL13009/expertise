-- Script pour ajouter les colonnes manquantes à la table analyse_leads
-- À exécuter dans l'éditeur SQL de Supabase

-- ============================================
-- Ajouter les nouvelles colonnes pour le formulaire d'estimation optimisé
-- ============================================

DO $$ 
BEGIN
  -- Ajustement prix (échelle 1-10)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'ajustement_prix_echelle') THEN
    ALTER TABLE analyse_leads ADD COLUMN ajustement_prix_echelle INTEGER;
  END IF;

  -- Surface extérieure (si extérieur sélectionné)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'surface_exterieur') THEN
    ALTER TABLE analyse_leads ADD COLUMN surface_exterieur TEXT;
  END IF;

  -- Type de stationnement (couvert/extérieur)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'stationnement_type') THEN
    ALTER TABLE analyse_leads ADD COLUMN stationnement_type TEXT;
  END IF;

  -- Type de location (nue/meublée)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'type_location') THEN
    ALTER TABLE analyse_leads ADD COLUMN type_location TEXT;
  END IF;

  -- Loyer mensuel
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'loyer_mensuel') THEN
    ALTER TABLE analyse_leads ADD COLUMN loyer_mensuel TEXT;
  END IF;

  -- Nombre de salles de bain
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'nombre_salles_de_bain') THEN
    ALTER TABLE analyse_leads ADD COLUMN nombre_salles_de_bain INTEGER;
  END IF;

  -- Montant des travaux
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'montant_travaux') THEN
    ALTER TABLE analyse_leads ADD COLUMN montant_travaux TEXT;
  END IF;

  -- Surface du terrain (étape 1 - si Maison)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'surface_terrain') THEN
    ALTER TABLE analyse_leads ADD COLUMN surface_terrain TEXT;
  END IF;

END $$;

-- Vérification : Afficher les colonnes ajoutées
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'analyse_leads'
  AND column_name IN (
    'ajustement_prix_echelle',
    'surface_exterieur',
    'stationnement_type',
    'type_location',
    'loyer_mensuel',
    'nombre_salles_de_bain',
    'montant_travaux',
    'surface_terrain'
  )
ORDER BY column_name;
