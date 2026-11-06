export const useDark = () => {
  const colorMode = useColorMode()

  const currentTheme = computed(() => {
    const preference = colorMode?.preference
    if (preference === 'light' || preference === 'dark' || preference === 'system') {
      return preference
    }
    return 'system'
  })

  const isDark = computed(() => {
    // Track color-mode so this recomputes after preference changes.
    const preference = colorMode?.preference
    const resolved = colorMode?.value

    if (import.meta.client && typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }

    if (preference === 'system') {
      return resolved === 'dark'
    }
    return preference === 'dark'
  })

  const toggleDark = (theme: 'light' | 'dark' | 'system') => {
    // Callers must pass a theme string — never bind @click="toggleDark"
    // (PointerEvent becomes preference → classList InvalidCharacterError).
    if (theme !== 'light' && theme !== 'dark' && theme !== 'system') {
      return
    }
    if (!colorMode) {
      return
    }
    colorMode.preference = theme
  }

  return { isDark, toggleDark, currentTheme }
}
