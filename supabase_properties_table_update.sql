-- Script pour mettre à jour la table properties si elle existe déjà
-- Exécutez ce script dans SQL Editor de Supabase si vous avez déjà créé la table

-- Ajouter les colonnes manquantes si elles n'existent pas
DO $$ 
BEGIN
    -- Ajouter 'type' pour compatibilité avec Gallery (alias de status)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'properties' AND column_name = 'type') THEN
        ALTER TABLE properties ADD COLUMN type TEXT;
        -- Copier les valeurs de status vers type
        UPDATE properties SET type = status;
    END IF;
    
    -- Ajouter 'surface' pour compatibilité avec Gallery (alias de surface_habitable)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'properties' AND column_name = 'surface') THEN
        ALTER TABLE properties ADD COLUMN surface TEXT;
        -- Copier les valeurs de surface_habitable vers surface
        UPDATE properties SET surface = surface_habitable;
    END IF;
END $$;

-- Créer un trigger pour synchroniser type avec status
CREATE OR REPLACE FUNCTION sync_type_with_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status IS NOT NULL THEN
        NEW.type = NEW.status;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Supprimer le trigger s'il existe déjà
DROP TRIGGER IF EXISTS sync_type_trigger ON properties;

-- Créer le trigger
CREATE TRIGGER sync_type_trigger
    BEFORE INSERT OR UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION sync_type_with_status();

-- Créer un trigger pour synchroniser surface avec surface_habitable
CREATE OR REPLACE FUNCTION sync_surface_with_habitable()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.surface_habitable IS NOT NULL THEN
        NEW.surface = NEW.surface_habitable;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Supprimer le trigger s'il existe déjà
DROP TRIGGER IF EXISTS sync_surface_trigger ON properties;

-- Créer le trigger
CREATE TRIGGER sync_surface_trigger
    BEFORE INSERT OR UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION sync_surface_with_habitable();


