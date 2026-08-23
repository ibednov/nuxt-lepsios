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

export const findCurrencyOption = (code: string | null | undefined) =>
  CURRENCY_FIELD_OPTIONS.find(option => option.value === code)

export const findCurrencyIcon = (code: string | null | undefined) =>
  currencies.find(currency => currency.value === code)?.icon
