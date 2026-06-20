<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { FieldPickerDateVariants } from './variants'
import { DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date'
import type { FieldDateRange } from '~/interfaces/common/field'
import { cn } from '~/lib/utils'
import { getCalendarRangeBounds, getCalendarYearOptions } from '~/utils/calendar/range'
import {
  fieldPickerDateVariants,
  fieldPickerSelectTriggerVariants,
} from './variants'

interface Props {
  modelValue?: string
  range?: FieldDateRange
  variant?: FieldPickerDateVariants['variant']
}

const props = withDefaults(defineProps<Props>(), {
  range: 'future',
  variant: 'drawer',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | undefined]
  'select': []
}>()

const { locale: calendarLocale } = useCalendarLocale()

const monthOptions = computed(() => {
  const formatter = new DateFormatter(calendarLocale.value, {
    month: 'long',
  })

  return Array.from({ length: 12 }, (_, index) => {
    const month = index + 1
    const date = placeholder.value.set({ month, day: 1 })

    return {
      value: String(month),
      label: formatter.format(date.toDate(getLocalTimeZone())),
    }
  })
})

const calendarValue = ref<DateValue>()
const placeholder = ref<DateValue>(today(getLocalTimeZone()))

const rangeBounds = computed(() => getCalendarRangeBounds(props.range))
const minValue = computed(() => rangeBounds.value.minValue)
const maxValue = computed(() => rangeBounds.value.maxValue)
const yearOptions = computed(() => getCalendarYearOptions(props.range))

const syncFromModel = () => {
  if (!props.modelValue) {
    calendarValue.value = undefined
    placeholder.value = today(getLocalTimeZone())
    return
  }

  const isoDate = props.modelValue.includes('T')
    ? props.modelValue.split('T')[0]!
    : props.modelValue

  try {
    const parsed = parseDate(isoDate)
    calendarValue.value = parsed
    placeholder.value = parsed
  }
  catch {
    calendarValue.value = undefined
    placeholder.value = today(getLocalTimeZone())
  }
}

const updateMonth = (month: string | number | boolean | Record<string, any>) => {
  placeholder.value = placeholder.value.set({ month: Number(month) })
}

const updateYear = (year: string | number | boolean | Record<string, any>) => {
  placeholder.value = placeholder.value.set({ year: Number(year) })
}

const handleCalendarUpdate = (value: DateValue | undefined) => {
  if (!value) {
    return
  }

  const month = String(value.month).padStart(2, '0')
  const day = String(value.day).padStart(2, '0')

  calendarValue.value = value
  emit('update:modelValue', `${value.year}-${month}-${day}`)
  emit('select')
}

syncFromModel()
</script>

<template>
    <div :class="cn(fieldPickerDateVariants({ variant }))">
        <div class="mb-3 grid grid-cols-2 gap-2">
            <Select
                :model-value="String(placeholder.month)"
                @update:model-value="updateMonth"
            >
                <SelectTrigger :class="fieldPickerSelectTriggerVariants({ variant })">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem
                        v-for="option in monthOptions"
                        :key="option.value"
                        :value="option.value"
                    >
                        {{ option.label }}
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select
                :model-value="String(placeholder.year)"
                @update:model-value="updateYear"
            >
                <SelectTrigger :class="fieldPickerSelectTriggerVariants({ variant })">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem
                        v-for="option in yearOptions"
                        :key="option.value"
                        :value="option.value"
                    >
                        {{ option.label }}
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>

        <shared-ui-calendar
            v-model="calendarValue"
            v-model:placeholder="placeholder"
            :variant="variant"
            :min-value="minValue"
            :max-value="maxValue"
            :default-placeholder="today(getLocalTimeZone())"
            @update:model-value="handleCalendarUpdate"
        />
    </div>
</template>
