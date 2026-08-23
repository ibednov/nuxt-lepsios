import type { FieldOption } from '~/interfaces/common/field'

export enum CurrencyEnum {
  BYN = 'BYN',
  RUB = 'RUB',
  USD = 'USD',
  EUR = 'EUR',
  CNY = 'CNY',
}

export const DEFAULT_CURRENCY = CurrencyEnum.USD

interface Currency {
  code: CurrencyEnum
  icon: string
  value: string
}

const currencies: Currency[] = [
  {
    code: CurrencyEnum.BYN,
    icon: 'lucide:banknote',
    value: CurrencyEnum.BYN,
  },
  {
    code: CurrencyEnum.RUB,
    icon: 'f7:money-rubl',
    value: CurrencyEnum.RUB,
  },
  {
    code: CurrencyEnum.USD,
    icon: 'f7:money-dollar',
    value: CurrencyEnum.USD,
  },
  {
    code: CurrencyEnum.EUR,
    icon: 'f7:money-euro',
    value: CurrencyEnum.EUR,
  },
  {
    code: CurrencyEnum.CNY,
    icon: 'f7:money-yen',
    value: CurrencyEnum.CNY,
  },
]

export const CURRENCY_FIELD_OPTIONS: FieldOption[] = currencies.map(currency => ({
  label: currency.code,
  icon: currency.icon,
  value: currency.value,
}))

export const findCurrencyOption = (code: string | null | undefined) => {
  const current = String(code ?? '').trim().toUpperCase()
  if (!current) {
    return undefined
  }
  return CURRENCY_FIELD_OPTIONS.find(option => String(option.value) === current)
}

export const findCurrencyIcon = (code: string | null | undefined) =>
  findCurrencyOption(code)?.icon

export const visibleCurrencyOption = (
  code: string | null | undefined,
  options: FieldOption[] = CURRENCY_FIELD_OPTIONS,
): FieldOption => {
  const current = String(code ?? '').trim().toUpperCase()
  if (!current) {
    return findCurrencyOption(DEFAULT_CURRENCY)
      ?? { label: DEFAULT_CURRENCY, value: DEFAULT_CURRENCY }
  }
  return options.find(option => String(option.value) === current)
    ?? findCurrencyOption(current)
    ?? { label: current, value: current }
}

export const currencySelectOptions = (
  code: string | null | undefined,
  options: FieldOption[] = CURRENCY_FIELD_OPTIONS,
): FieldOption[] => {
  const list = [...options]
  const current = String(code ?? '').trim().toUpperCase()
  if (current && !list.some(option => String(option.value) === current)) {
    list.push(visibleCurrencyOption(current, options))
  }
  return list
}
