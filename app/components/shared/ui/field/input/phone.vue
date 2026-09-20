<script setup lang="ts">
import { PhoneSelect } from 'alexbednov-phone-select/vue'
import { cn } from '~/lib/utils'
import 'alexbednov-phone-select/style.css'

type PhoneLang = 'ru' | 'en' | 'az' | 'be'

interface Props {
  label?: string
  invalid?: boolean
  errorMessage?: string | null
  testId?: string
  dataTestid?: string
  defaultCountry?: string
  onlyCountries?: string[]
  lang?: PhoneLang
  favoritesCountries?: string[]
  hideFavorites?: boolean
  dedupeFavorites?: boolean
  enableSearch?: boolean
  enableMask?: boolean
  selectPlaceholder?: string
  inputPlaceholder?: string
  placeholder?: string
  disableCountryNameSelect?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultCountry: 'by',
  favoritesCountries: () => ['BY'],
  onlyCountries: () => ['BY', 'RU', 'AZ'],
  hideFavorites: true,
  dedupeFavorites: true,
  enableSearch: true,
  enableMask: true,
  disableCountryNameSelect: true,
})

const modelValue = defineModel<string>({ default: '' })

const { locale, t } = useI18n()

const phoneLang = computed((): PhoneLang => {
  if (props.lang) {
    return props.lang
  }
  const code = locale.value.split('-')[0]?.toLowerCase()
  if (code === 'en' || code === 'ru' || code === 'az' || code === 'be') {
    return code
  }
  return 'ru'
})

const resolvedTestId = computed(() => props.testId ?? props.dataTestid)

const inputClass = computed(() =>
  cn(
    'flex h-12 w-full rounded-2xl px-4 text-base bg-lepsios-field',
    props.invalid
      ? 'border border-red-500 ring-1 ring-red-500/40'
      : 'border-0',
  ),
)
</script>

<template>
    <div class="flex flex-col gap-2">
        <Label
            v-if="label"
            class="text-sm font-medium"
        >
            {{ label }}
        </Label>
        <PhoneSelect
            v-model="modelValue"
            :default-country="defaultCountry"
            :only-countries="onlyCountries"
            :lang="phoneLang"
            :favorites-countries="favoritesCountries"
            :hide-favorites="hideFavorites"
            :dedupe-favorites="dedupeFavorites"
            :enable-search="enableSearch"
            :enable-mask="enableMask"
            :select-placeholder="selectPlaceholder ?? t('ui.input.phone.select_placeholder')"
            :input-placeholder="inputPlaceholder ?? placeholder ?? t('ui.input.phone.input_placeholder')"
            :disable-country-name-select="disableCountryNameSelect"
            :input-class="inputClass"
            select-class="border-0 bg-lepsios-field"
            :data-testid="resolvedTestId"
        />
        <p
            v-if="errorMessage"
            class="text-sm text-red-500"
        >
            {{ errorMessage }}
        </p>
    </div>
</template>
