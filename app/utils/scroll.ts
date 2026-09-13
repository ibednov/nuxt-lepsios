export const scrollToTop = () => {
  if (import.meta.client) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}

export const lockPageScroll = () => {
  if (import.meta.client) {
    document.body.style.overflow = 'hidden'
  }
}

export const unlockPageScroll = () => {
  if (import.meta.client) {
    document.body.style.overflow = 'auto'
  }
}
