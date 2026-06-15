<script setup lang="ts">
import { PhoneSelect } from 'alexbednov-phone-select'

interface Props {
  placeholder?: string
  id?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  id: 'phone-input',
  class: '',
})

const modelValue = defineModel<string | null>('modelValue', { default: null })
const { locale } = useI18n()

const phoneLang = computed(() => {
  const currentLocale = locale.value
  if (currentLocale === 'ru' || currentLocale === 'en' || currentLocale === 'az' || currentLocale === 'be') {
    return currentLocale
  }
  return 'en'
})

const favoritesCountries = ['by', 'ru']
</script>

<template>
    <PhoneSelect
        :id="props.id"
        v-model="modelValue"
        :lang="phoneLang"
        :favorites-countries="favoritesCountries"
        :enable-mask="true"
        :enable-search="true"
        :hide-favorites="false"
        :disable-country-name-select="true"
        :disable-auto-parse-number="true"
        select-content-class="max-h-[min(60dvh,24rem)] overflow-y-auto"
        :input-class="props.class"
        :input-placeholder="props.placeholder"
    />
</template>
