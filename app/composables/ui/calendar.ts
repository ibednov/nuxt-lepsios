export const useCalendarLocale = () => {
  const { locale: i18nLocale } = useI18n()

  const locale = computed(() => getCalendarLocaleConfig(i18nLocale.value).locale)
  const weekStartsOn = computed(() => getCalendarLocaleConfig(i18nLocale.value).weekStartsOn)

  return {
    locale,
    weekStartsOn,
  }
}
