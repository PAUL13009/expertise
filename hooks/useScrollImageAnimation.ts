import { useEffect, useRef, useState } from 'react'

/**
 * Hook pour déclencher l'animation d'un overlay d'image au scroll sur mobile
 * L'animation se déclenche quand l'image entre dans le viewport
 */
export function useScrollImageAnimation() {
  const imageRef = useRef<HTMLDivElement>(null)
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    const imageContainer = imageRef.current
    if (!imageContainer) return

    // Détecter si on est sur mobile (largeur < 768px)
    const isMobile = () => window.innerWidth < 768

    // Intersection Observer pour détecter quand l'image entre dans le viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (isMobile() && entry.isIntersecting) {
            // Délai pour que l'animation soit visible
            setTimeout(() => {
              setIsAnimated(true)
            }, 300)
          } else if (isMobile() && !entry.isIntersecting) {
            // Réinitialiser quand l'image sort du viewport
            setIsAnimated(false)
          }
        })
      },
      {
        threshold: 0.3, // Déclencher quand 30% de l'image est visible
        rootMargin: '0px'
      }
    )

    observer.observe(imageContainer)

    return () => {
      observer.disconnect()
    }
  }, [])

  return { imageRef, isAnimated }
}
