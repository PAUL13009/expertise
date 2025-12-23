-- Créer la table properties avec tous les champs du formulaire
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Informations de base
  title TEXT NOT NULL,
  price TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('À vendre', 'À louer')),
  type TEXT, -- Alias pour compatibilité (synchronisé avec status)
  description TEXT,
  
  -- Caractéristiques principales
  rooms TEXT,
  bathrooms TEXT,
  surface_habitable TEXT, -- Surface habitable en m²
  surface TEXT, -- Alias pour compatibilité (synchronisé avec surface_habitable)
  
  -- Prestations (checkboxes)
  parking BOOLEAN DEFAULT false,
  terrasse BOOLEAN DEFAULT false,
  piscine BOOLEAN DEFAULT false,
  ascenseur BOOLEAN DEFAULT false,
  cave BOOLEAN DEFAULT false,
  jardin BOOLEAN DEFAULT false,
  balcon BOOLEAN DEFAULT false,
  garage BOOLEAN DEFAULT false,
  climatisation BOOLEAN DEFAULT false,
  interphone BOOLEAN DEFAULT false,
  local_velo BOOLEAN DEFAULT false,
  internet BOOLEAN DEFAULT false,
  digicode BOOLEAN DEFAULT false,
  fibre_optique BOOLEAN DEFAULT false,
  gardien BOOLEAN DEFAULT false,
  autres_prestations TEXT,
  
  -- Surfaces détaillées
  surface_totale TEXT, -- Surface totale en m²
  
  -- Diagnostic de Performance Énergétique (DPE)
  consommation_energetique TEXT,
  emissions_ges TEXT,
  
  -- Photos (JSONB pour stocker un tableau d'objets)
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);

-- Activer Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture publique
CREATE POLICY "Allow public read access" ON properties
  FOR SELECT USING (true);

-- Politique pour permettre l'écriture uniquement aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated insert" ON properties
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON properties
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON properties
  FOR DELETE USING (auth.role() = 'authenticated');

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour synchroniser type avec status
CREATE OR REPLACE FUNCTION sync_type_with_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status IS NOT NULL THEN
        NEW.type = NEW.status;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour synchroniser type avec status
CREATE TRIGGER sync_type_trigger
    BEFORE INSERT OR UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION sync_type_with_status();

-- Fonction pour synchroniser surface avec surface_habitable
CREATE OR REPLACE FUNCTION sync_surface_with_habitable()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.surface_habitable IS NOT NULL THEN
        NEW.surface = NEW.surface_habitable;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour synchroniser surface avec surface_habitable
CREATE TRIGGER sync_surface_trigger
    BEFORE INSERT OR UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION sync_surface_with_habitable();

