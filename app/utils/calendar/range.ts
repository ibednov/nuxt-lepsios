import { getLocalTimeZone, today, type DateValue } from '@internationalized/date'
import type { FieldDateRange } from '~/interfaces/common/field'

const PAST_YEARS_OFFSET = 50
const FUTURE_YEARS_OFFSET = 10

export const getCalendarRangeBounds = (range: FieldDateRange): {
  minValue?: DateValue
  maxValue?: DateValue
} => {
  const todayValue = today(getLocalTimeZone())

  if (range === 'future') {
    return { minValue: todayValue }
  }

  if (range === 'past') {
    return { maxValue: todayValue }
  }

  return {}
}

export const getCalendarYearOptions = (range: FieldDateRange) => {
  const currentYear = today(getLocalTimeZone()).year

  if (range === 'future') {
    return Array.from({ length: FUTURE_YEARS_OFFSET + 1 }, (_, index) => {
      const year = currentYear + index

      return {
        value: String(year),
        label: String(year),
      }
    })
  }

  if (range === 'past') {
    return Array.from({ length: PAST_YEARS_OFFSET + 1 }, (_, index) => {
      const year = currentYear - PAST_YEARS_OFFSET + index

      return {
        value: String(year),
        label: String(year),
      }
    })
  }

  const startYear = currentYear - PAST_YEARS_OFFSET
  const endYear = currentYear + FUTURE_YEARS_OFFSET

  return Array.from({ length: endYear - startYear + 1 }, (_, index) => {
    const year = startYear + index

    return {
      value: String(year),
      label: String(year),
    }
  })
}
