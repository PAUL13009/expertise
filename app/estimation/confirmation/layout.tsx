import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Confirmation de demande d\'estimation | L\'Agence YL',
  description: 'Votre demande d\'estimation immobilière a bien été reçue. L\'Agence YL vous recontactera sous 24 à 48h ouvrées pour vous restituer une estimation argumentée et exploitable.',
  alternates: {
    canonical: 'https://www.lagenceyl.fr/estimation/confirmation',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function EstimationConfirmationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
