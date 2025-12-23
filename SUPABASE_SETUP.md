# Configuration Supabase

## 1. Installation des dépendances

Exécutez la commande suivante pour installer les dépendances Supabase :

```bash
npm install
```

## 2. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec le contenu suivant :

```env
NEXT_PUBLIC_SUPABASE_URL=https://apuptkqrzjhpgebgqbrc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwdXB0a3FyempocGdlYmdxYnJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxODkzNDksImV4cCI6MjA4MTc2NTM0OX0.yCka6xYDLAu-wFTlHHtzreDZMvzogM8pzO5N_bXUkcY
```

## 3. Configuration de la base de données Supabase

### Créer la table `properties`

Dans votre dashboard Supabase, allez dans SQL Editor et exécutez cette requête :

```sql
-- Créer la table properties
CREATE TABLE properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  price TEXT NOT NULL,
  surface TEXT NOT NULL,
  rooms TEXT NOT NULL,
  bathrooms TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('À vendre', 'À louer')),
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Créer un index pour améliorer les performances
CREATE INDEX idx_properties_type ON properties(type);
CREATE INDEX idx_properties_created_at ON properties(created_at DESC);

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
```

### Créer un utilisateur admin

Dans Authentication > Users, créez un nouvel utilisateur avec :
- Email : votre email
- Password : votre mot de passe

Cet utilisateur pourra se connecter via `/admin/login`.

## 4. Structure des données

La table `properties` attend les données suivantes :

```json
{
  "title": "Appartement moderne",
  "location": "Marseille 13008",
  "price": "450 000 €",
  "surface": "85",
  "rooms": "3",
  "bathrooms": "2",
  "type": "À vendre",
  "images": [
    {
      "src": "/images/DSC04823.jpg",
      "alt": "Appartement moderne - Vue extérieure"
    },
    {
      "src": "/images/DSC02414.jpg",
      "alt": "Appartement moderne - Séjour"
    }
  ]
}
```

## 5. Accès au dashboard admin

1. Allez sur `/admin/login`
2. Connectez-vous avec l'email et le mot de passe créés dans Supabase
3. Vous serez redirigé vers `/admin/dashboard`

## Notes importantes

- Le fichier `.env.local` ne doit pas être commité dans Git (il est déjà dans `.gitignore`)
- Pour Vercel, ajoutez les variables d'environnement dans les paramètres du projet
- Les images doivent être uploadées dans le dossier `public/images/` ou utiliser Supabase Storage


