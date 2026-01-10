import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Confirmation de demande d\'analyse | L\'Agence YL',
  description: 'Votre demande d\'analyse immobilière a bien été reçue. L\'Agence YL vous recontactera sous 24 à 48h ouvrées pour discuter de votre projet de vente à Marseille.',
  alternates: {
    canonical: 'https://www.lagenceyl.fr/analyse/confirmation',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function AnalyseConfirmationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
