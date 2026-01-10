import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Formulaire d\'estimation immobilière | Étape 2 - L\'Agence YL',
  description: 'Formulaire d\'estimation immobilière gratuite à Marseille. Étape 2 : affinage de l\'estimation avec précision maximale pour produire l\'estimation la plus réaliste possible.',
  alternates: {
    canonical: 'https://www.lagenceyl.fr/estimation/formulaire/etape-2',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function EstimationEtape2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
