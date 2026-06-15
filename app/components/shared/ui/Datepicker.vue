<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import {
  DateFormatter,

  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date'

import dayjs from 'dayjs'
import { cn } from '~/lib/utils'

const props = defineProps<{
  disablePast?: boolean
}>()

const { t } = useI18n()

const isOpen = ref(false)

const df = new DateFormatter('ru-RU', {
  dateStyle: 'long',
})

const dateValue = ref<DateValue>()

const data = defineModel<Date | string | null | undefined>('modelValue')

const handleCalendarUpdate = (newValue: DateValue | undefined) => {
  if (newValue) {
    // Форматируем дату напрямую без конвертации часового пояса: YYYY-MM-DD
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

const calendarMinValue = computed(() => props.disablePast ? today(getLocalTimeZone()) : undefined)

onMounted(() => {
  if (data.value) {
    let isoDateString: string | undefined
    if (typeof data.value === 'string') {
      // Если это полная дата с временем (RFC3339), извлекаем только дату YYYY-MM-DD
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
                {{ dateValue ? df.format(dateValue.toDate(getLocalTimeZone())) : t('shared.ui.datepicker.placeholder') }}
            </Button>
        </PopoverTrigger>
        <PopoverContent
            class="w-auto p-0 z-120"
        >
            <Calendar
                v-model="dateValue"
                :min-value="calendarMinValue"
                initial-focus
                @update:model-value="handleCalendarUpdate"
            />
        </PopoverContent>
    </Popover>
</template>
