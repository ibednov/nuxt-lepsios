<script setup lang="ts">
import type { FieldOption } from '~/interfaces/common/field'
import { CURRENCY_FIELD_OPTIONS, DEFAULT_CURRENCY, findCurrencyOption } from '~/utils/params/currency'

interface Props {
  placeholder?: string
  id?: string
  class?: string
  options?: FieldOption[]
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '0.00',
  id: 'price-input',
  class: '',
  options: () => CURRENCY_FIELD_OPTIONS,
})

const modelValue = defineModel<number | null>('modelValue', { default: null })
const currency = defineModel<string | null>('currency', { default: DEFAULT_CURRENCY })

const priceError = ref<string | null>(null)

const currencyValue = computed({
  get: () => currency.value ?? DEFAULT_CURRENCY,
  set: (value: string) => {
    currency.value = value
  },
})

const selectedCurrency = computed(() => {
  return props.options.find(option => option.value === currencyValue.value)
    ?? findCurrencyOption(DEFAULT_CURRENCY)
})

watch(() => modelValue.value, () => {
  priceError.value = null
})

const handleInput = (val: string | number) => {
  if (val === '' || val === null || val === undefined) {
    priceError.value = null
    modelValue.value = null
    return
  }

  const numValue = typeof val === 'string' ? Number.parseFloat(val) : val
  if (!Number.isNaN(numValue) && val !== '') {
    priceError.value = null
    modelValue.value = numValue
  }
  else {
    priceError.value = 'Введите число'
    modelValue.value = null
  }
}
</script>

<template>
    <div class="flex flex-col gap-1">
        <InputGroup :class="props.class">
            <InputGroupInput
                :id="props.id"
                :model-value="modelValue ?? ''"
                type="text"
                inputmode="decimal"
                :placeholder="props.placeholder"
                :class="priceError ? 'border-red-500' : ''"
                @update:model-value="handleInput"
            />
            <InputGroupAddon
                align="inline-end"
                class="px-0"
            >
                <Select v-model="currencyValue">
                    <SelectTrigger class="h-9 min-w-22 border-0 bg-transparent shadow-none focus:ring-0">
                        <SelectValue>
                            <div
                                v-if="selectedCurrency"
                                class="flex items-center gap-1.5"
                            >
                                <Icon
                                    v-if="selectedCurrency.icon"
                                    :name="selectedCurrency.icon"
                                    class="size-4 shrink-0"
                                />
                                <span class="text-sm font-medium">
                                    {{ selectedCurrency.value }}
                                </span>
                            </div>
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem
                                v-for="option in props.options"
                                :key="option.value"
                                :value="option.value"
                            >
                                <div class="flex items-center gap-2">
                                    <Icon
                                        v-if="option.icon"
                                        :name="option.icon"
                                        class="size-4 shrink-0"
                                    />
                                    <span>{{ option.value }}</span>
                                </div>
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </InputGroupAddon>
        </InputGroup>
        <Label
            v-if="priceError"
            class="text-xs text-red-500"
        >
            {{ priceError }}
        </Label>
    </div>
</template>
