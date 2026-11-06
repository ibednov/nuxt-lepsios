export const useDark = () => {
  const colorMode = useColorMode()

  const currentTheme = computed(() => {
    const preference = colorMode?.preference
    if (preference === 'light' || preference === 'dark' || preference === 'system') {
      return preference
    }
    return 'system'
  })

  // Resolved mode only — never document.classList (SSR HTML ≠ client → hydration spam).
  const isDark = computed(() => colorMode?.value === 'dark')

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
