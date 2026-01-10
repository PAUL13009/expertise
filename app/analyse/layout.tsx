import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analyse immobilière Marseille | Vente accompagnée - L\'Agence YL',
  description: 'Service d\'analyse immobilière à Marseille pour la vente accompagnée de votre bien. Méthode structurée et sélective pour des projets immobiliers réussis. Expertise locale 6e-15e arrondissements.',
  alternates: {
    canonical: 'https://www.lagenceyl.fr/analyse',
  },
  openGraph: {
    title: 'Analyse immobilière Marseille | Vente accompagnée',
    description: 'Service d\'analyse immobilière à Marseille pour la vente accompagnée de votre bien. Méthode structurée et sélective pour des projets immobiliers réussis.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.lagenceyl.fr/analyse',
    siteName: "L'Agence YL",
  },
}

export default function AnalyseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
