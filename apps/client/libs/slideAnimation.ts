export function slideAnimation (match: React.MutableRefObject<HTMLElement | null>) {
  if (match.current) {
    // Definir el keyframe directamente en el elemento
    match.current.style.animation = `
      slide 0.5s ease-in-out forwards
    `

    // Definir el keyframe como una cadena
    const keyframes = `
      @keyframes slide {
        0% {
          opacity: 0;
          transform: translateX(100%);
        }
        100% {
          opacity: 1;
          transform: translateX(0%);
        }
      }
    `

    // Agregar el estilo del keyframe al head del documento
    const styleSheet = document.styleSheets[0]
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length)

    // Limpia la animación después de que termine
    match.current.addEventListener('animationend', () => {
      match.current?.style.removeProperty('animation')
    })
  }
}
