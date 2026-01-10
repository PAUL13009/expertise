import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Formulaire d\'estimation immobilière | Étape 1 - L\'Agence YL',
  description: 'Formulaire d\'estimation immobilière gratuite à Marseille. Étape 1 : renseignements de base sur votre bien immobilier. Estimation basée sur les ventes réelles du marché.',
  alternates: {
    canonical: 'https://www.lagenceyl.fr/estimation/formulaire',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function EstimationFormulaireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
