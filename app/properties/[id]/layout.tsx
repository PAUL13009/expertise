import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  return {
    title: `Bien immobilier à Marseille | L'Agence YL`,
    description: 'Détails du bien immobilier à Marseille. Consultez les caractéristiques complètes, photos et informations pour ce bien disponible à la vente ou à la location.',
    alternates: {
      canonical: `https://www.lagenceyl.fr/properties/${params.id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `Bien immobilier à Marseille | L'Agence YL`,
      description: 'Détails du bien immobilier à Marseille. Consultez les caractéristiques complètes, photos et informations pour ce bien disponible à la vente ou à la location.',
      type: 'website',
      locale: 'fr_FR',
      url: `https://www.lagenceyl.fr/properties/${params.id}`,
      siteName: "L'Agence YL",
    },
  }
}

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
