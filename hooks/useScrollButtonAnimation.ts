import { useEffect, useRef } from 'react'

/**
 * Hook pour déclencher l'animation des boutons CTA au scroll sur mobile
 * L'animation se déclenche quand le bouton entre dans le viewport
 */
export function useScrollButtonAnimation() {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    // Détecter si on est sur mobile (largeur < 768px)
    const isMobile = () => window.innerWidth < 768

    // Fonction pour déclencher l'animation
    const triggerAnimation = () => {
      const fill = button.querySelector('.button-fill') as HTMLElement
      const arrow = button.querySelector('.button-arrow') as HTMLElement
      const text = button.querySelector('.button-text') as HTMLElement
      const textSpan = button.querySelector('.button-text span') as HTMLElement

      if (fill) {
        fill.style.width = '100%'
        fill.style.transform = 'translateX(-50%) scaleY(1)'
      }
      if (arrow) {
        arrow.style.opacity = '1'
        arrow.style.right = '-14px'
      }
      if (text) {
        // Récupérer la couleur originale depuis l'attribut data
        const originalColor = button.getAttribute('data-original-color')
        // Si pas de couleur originale, vérifier si c'est un bouton blanc (Hero)
        if (!originalColor) {
          const computedColor = window.getComputedStyle(text).color
          if (computedColor.includes('255, 255, 255')) {
            // Bouton Hero avec texte blanc, on garde blanc
            text.style.color = 'white'
          } else {
            // Sinon, on met blanc pour l'animation
            text.style.color = 'white'
          }
        } else {
          // Bouton avec couleur originale, on met blanc pour l'animation
          text.style.color = 'white'
        }
      }
      if (textSpan) {
        textSpan.style.transform = 'translateX(-8px)'
      }
    }

    // Fonction pour réinitialiser l'animation
    const resetAnimation = () => {
      const fill = button.querySelector('.button-fill') as HTMLElement
      const arrow = button.querySelector('.button-arrow') as HTMLElement
      const text = button.querySelector('.button-text') as HTMLElement
      const textSpan = button.querySelector('.button-text span') as HTMLElement

      if (fill) {
        fill.style.width = '0%'
        fill.style.transform = 'translateX(-50%) scaleY(0)'
      }
      if (arrow) {
        arrow.style.opacity = '0'
        arrow.style.right = '-30px'
      }
      if (text) {
        // Récupérer la couleur originale depuis l'attribut data
        const originalColor = button.getAttribute('data-original-color')
        if (originalColor) {
          text.style.color = originalColor
        } else {
          // Si pas d'attribut, vérifier la couleur computed
          const computedColor = window.getComputedStyle(text).color
          if (!computedColor.includes('255, 255, 255')) {
            // Si ce n'était pas blanc, remettre la couleur par défaut
            text.style.color = '#4682B4'
          }
        }
      }
      if (textSpan) {
        textSpan.style.transform = 'translateX(0)'
      }
    }

    // Intersection Observer pour détecter quand le bouton entre dans le viewport
    let isCurrentlyAnimated = false
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (isMobile()) {
            if (entry.isIntersecting && !isCurrentlyAnimated) {
              // Déclencher l'animation dès que le bouton est visible
              triggerAnimation()
              isCurrentlyAnimated = true
            } else if (!entry.isIntersecting && isCurrentlyAnimated) {
              // Réinitialiser quand le bouton sort du viewport pour permettre de réanimer
              resetAnimation()
              isCurrentlyAnimated = false
            }
          }
        })
      },
      {
        threshold: 0.1, // Déclencher dès que 10% du bouton est visible
        rootMargin: '0px'
      }
    )

    observer.observe(button)

    return () => {
      observer.disconnect()
    }
  }, [])

  return buttonRef
}
