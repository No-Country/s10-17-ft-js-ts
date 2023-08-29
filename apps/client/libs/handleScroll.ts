export default function handleScroll (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, ref: React.RefObject<HTMLUListElement>) {
  const direction = event.currentTarget.value
  const scroll = ref.current?.scrollLeft

  if (scroll !== undefined) {
    if (direction === 'left' && scroll >= 0) {
      ref.current?.scrollTo({
        left: scroll - 100,
        behavior: 'smooth'
      })
    } else {
      ref.current?.scrollTo({
        left: scroll + 100,
        behavior: 'smooth'
      })
    }
  }
}
