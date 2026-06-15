export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

interface ClipboardCopyOptions {
  successMessage?: string
  errorMessage?: string
}

export const clipboardCopy = async (text: string, options?: ClipboardCopyOptions): Promise<void> => {
  if (!text) {
    return
  }

  const { successMessage, errorMessage } = options || {}

  const messages = {
    success: successMessage || useI18n().t('global.actions.copy_success'),
    error: errorMessage || useI18n().t('global.actions.copy_error'),
  }

  const { success } = useNotify()

  if (window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      success(messages.success)
      return
    }
    catch (error) {
      console.warn('Clipboard API failed:', error)
    }
  }

  const textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.select()
  try {
    document.execCommand('copy')
  }
  finally {
    document.body.removeChild(textArea)
  }

  success(messages.success)
}

export const extractUrl = (text: string): string | null => {
  if (!text) {
    return null
  }

  const urlRegex = /(https?:\/\/\S+)/i
  const match = text.match(urlRegex)

  return match ? match[0] : null
}

export const isMoreThanCharacters = (text: string | null, length: number): boolean => {
  if (!text) {
    return false
  }

  return text.length >= length
}

export const isUrl = (text: string): boolean => {
  if (!text) {
    return false
  }

  return /^https?:\/\/(?:www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b[-\w()@:%+.~#?&/=]*$/i.test(text)
}
