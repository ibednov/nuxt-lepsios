export const useDark = () => {
  const colorMode = ref(useColorMode())
  const currentTheme = computed(() => colorMode.value.preference)
  const isDark = computed(() => colorMode.value.preference === 'dark')
  const toggleDark = (theme: 'light' | 'dark' | 'system') => {
    colorMode.value.preference = theme
  }
  return { isDark, toggleDark, currentTheme }
}
