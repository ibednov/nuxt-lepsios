import { DateFormatter, getLocalTimeZone, parseDate } from '@internationalized/date'
import type { WeekStartsOn } from 'reka-ui/date'
import { getWeekStartsOn } from 'reka-ui/date'

const CALENDAR_LOCALE_BY_I18N: Record<string, string> = {
  ru: 'ru-RU',
  en: 'en-US',
}

export const resolveCalendarLocale = (i18nLocale: string): string =>
  CALENDAR_LOCALE_BY_I18N[i18nLocale] ?? i18nLocale

export interface CalendarLocaleConfig {
  locale: string
  weekStartsOn: WeekStartsOn
}

export const getCalendarLocaleConfig = (i18nLocale: string): CalendarLocaleConfig => {
  const locale = resolveCalendarLocale(i18nLocale)

  return {
    locale,
    weekStartsOn: getWeekStartsOn(locale),
  }
}

export const getWeekdayLabels = (locale: string, weekStartsOn: WeekStartsOn): string[] => {
  const formatter = new DateFormatter(locale, { weekday: 'narrow' })
  const referenceSunday = parseDate('2023-01-01')
  const startDate = referenceSunday.add({ days: weekStartsOn })

  return Array.from({ length: 7 }, (_, index) =>
    formatter.format(startDate.add({ days: index }).toDate(getLocalTimeZone())),
  )
}
