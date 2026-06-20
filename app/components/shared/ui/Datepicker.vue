<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import {
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date'

import dayjs from 'dayjs'
import { useCalendarLocale } from '~/composables/ui/calendar'
import type { FieldDateRange } from '~/interfaces/common/field'
import { cn } from '~/lib/utils'
import { getCalendarRangeBounds } from '~/utils/calendar/range'

const props = withDefaults(defineProps<{
  range?: FieldDateRange
}>(), {
  range: 'future',
})

const { t } = useI18n()
const { locale: calendarLocale } = useCalendarLocale()

const isOpen = ref(false)

const dateFormatter = computed(() => new DateFormatter(calendarLocale.value, {
  dateStyle: 'long',
}))

const dateValue = ref<DateValue>()

const data = defineModel<Date | string | null | undefined>('modelValue')

const handleCalendarUpdate = (newValue: DateValue | undefined) => {
  if (newValue) {
    const year = String(newValue.year).padStart(4, '0')
    const month = String(newValue.month).padStart(2, '0')
    const day = String(newValue.day).padStart(2, '0')
    data.value = `${year}-${month}-${day}`
  }
  else {
    data.value = null
  }
  isOpen.value = false
}

const rangeBounds = computed(() => getCalendarRangeBounds(props.range))
const calendarMinValue = computed(() => rangeBounds.value.minValue)
const calendarMaxValue = computed(() => rangeBounds.value.maxValue)

onMounted(() => {
  if (data.value) {
    let isoDateString: string | undefined
    if (typeof data.value === 'string') {
      if (/^\d{4}-\d{2}-\d{2}T/.test(data.value)) {
        isoDateString = data.value.split('T')[0]
      }
      else {
        isoDateString = data.value
      }
    }
    else if (data.value instanceof Date) {
      isoDateString = dayjs(data.value).format('YYYY-MM-DD')
    }

    if (isoDateString) {
      try {
        dateValue.value = parseDate(isoDateString)
      }
      catch (e) {
        console.error('Failed to parse date:', isoDateString, e)
        dateValue.value = undefined
      }
    }
  }
  else {
    dateValue.value = undefined
  }
})
</script>

<template>
    <Popover
        v-model:open="isOpen"
    >
        <PopoverTrigger as-child>
            <Button
                variant="outline"
                :class="cn(
                    'justify-start text-left font-normal',
                    !dateValue && 'text-muted-foreground',
                )"
            >
                <Icon
                    name="lucide:calendar"
                    size="16"
                />
                {{ dateValue ? dateFormatter.format(dateValue.toDate(getLocalTimeZone())) : t('shared.ui.datepicker.placeholder') }}
            </Button>
        </PopoverTrigger>
        <PopoverContent
            class="w-auto p-0 z-120"
        >
            <shared-ui-calendar
                v-model="dateValue"
                :min-value="calendarMinValue"
                :max-value="calendarMaxValue"
                initial-focus
                @update:model-value="handleCalendarUpdate"
            />
        </PopoverContent>
    </Popover>
</template>
