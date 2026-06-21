interface ShareContentOptions {
  title?: string
  text?: string
  url: string
  successMessage?: string
  errorMessage?: string
}

export const shareContent = async (options: ShareContentOptions): Promise<void> => {
  const { title, text, url, successMessage, errorMessage } = options

  if (!url) {
    return
  }

  if (typeof navigator !== 'undefined' && 'share' in navigator) {
    try {
      await navigator.share({ title, text, url })
      return
    }
    catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return
      }

      console.warn('Web Share API failed:', error)
    }
  }

  await clipboardCopy(url, { successMessage, errorMessage })
}
