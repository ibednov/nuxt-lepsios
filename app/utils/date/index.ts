import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/en'
import 'dayjs/locale/ru'

dayjs.extend(utc)
dayjs.extend(customParseFormat)

// ===== Форматирование дат =====

export const formatDate = (date: string) =>
    dayjs(date).utc().local().format('DD.MM.YYYY HH:mm')

export const convertDate = (date: string) =>
    dayjs(date).local().format('YYYY-MM-DD HH:mm:ss')

export const convertDateToUTC = (date: string) =>
    dayjs(date).utc().format('YYYY-MM-DD HH:mm:ss')

export const formatDateOnly = (date: string) =>
    dayjs(date).format('DD.MM.YYYY')

/**
 * Форматирует дату в виде "DD MMMM YYYY" по текущей локали i18n.
 * Локаль берётся из useI18n().locale (Ref), поэтому используется unref.
 */
export const formatDateOnlyBasedOnLocale = (date: string) => {
    const { locale } = useI18n()
    const localeStr = unref(locale) || 'en'
    return dayjs(date).locale(localeStr).format('DD MMMM YYYY')
}

export const formatToISO = (
    date: string | Date | null | undefined,
): string | undefined => {
    if (!date) {
        return undefined
    }

    if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return `${date}T00:00:00Z`
    }

    const dateObj = typeof date === 'string' ? dayjs(date) : dayjs(date)
    if (!dateObj.isValid()) {
        return undefined
    }

    return dateObj.toISOString()
}

export const getDate = () => dayjs().toISOString()

export const getTenMinutesFromDate = (date: string) =>
    dayjs(date).add(5, 'minutes').toISOString()

export const timestamp = () => dayjs().format('YYYY-MM-DD HH:mm:ss')

export const formatDateToISO = (date: string | null | undefined) => {
    if (!date)
        return ''
    const parsed = dayjs(date, 'DD.MM.YYYY', true)
    return parsed.isValid() ? parsed.format('YYYY-MM-DD') : ''
}

// ===== Длительность (секунды → читаемый вид) =====

export const formatSecondToHours = (seconds: number) => {
    if (!seconds)
        return ''
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    const hoursStr = hours === 1 ? 'час' : hours < 5 ? 'часа' : 'часов'
    const minutesStr
        = minutes === 1 ? 'минута' : minutes < 5 ? 'минуты' : 'минут'
    const secondsStr
        = remainingSeconds === 1
            ? 'секунда'
            : remainingSeconds < 5
                ? 'секунды'
                : 'секунд'

    if (hours === 0 && minutes === 0) {
        return `${remainingSeconds} ${secondsStr}`
    }
    if (hours === 0 && minutes > 0) {
        return `${minutes} ${minutesStr} ${remainingSeconds} ${secondsStr}`
    }
    if (hours > 0) {
        return `${hours} ${hoursStr} ${minutes} ${minutesStr} ${remainingSeconds} ${secondsStr}`
    }
    return `${hours} ${hoursStr} ${minutes} ${minutesStr} ${remainingSeconds} ${secondsStr}`
}
