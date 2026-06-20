<script setup lang="ts">
import { CalendarRoot, type CalendarRootEmits, type CalendarRootProps, useForwardPropsEmits } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { useCalendarLocale } from '~/composables/ui/calendar'
import { cn } from '~/lib/utils'
import { getWeekdayLabels } from '~/utils/calendar/locale'
import CalendarCell from './cell.vue'
import CalendarCellTrigger from './cell-trigger.vue'
import CalendarGrid from './grid.vue'
import CalendarGridBody from './grid-body.vue'
import CalendarGridHead from './grid-head.vue'
import CalendarGridRow from './grid-row.vue'
import CalendarHeadCell from './head-cell.vue'
import CalendarHeader from './header.vue'
import CalendarHeading from './heading.vue'
import CalendarNextButton from './next-button.vue'
import CalendarPrevButton from './prev-button.vue'
import { calendarVariants, type CalendarVariants } from './variants'

const props = defineProps<CalendarRootProps & {
  class?: HTMLAttributes['class']
  variant?: CalendarVariants['variant']
}>()

const emits = defineEmits<CalendarRootEmits>()

const { locale: defaultLocale, weekStartsOn: defaultWeekStartsOn } = useCalendarLocale()

const calendarLocale = computed(() => props.locale ?? defaultLocale.value)
const calendarWeekStartsOn = computed(() => props.weekStartsOn ?? defaultWeekStartsOn.value)

const weekdayLabels = computed(() =>
  getWeekdayLabels(calendarLocale.value, calendarWeekStartsOn.value),
)

const delegatedProps = computed(() => {
  const { class: _, locale: __, weekStartsOn: ___, variant: ____, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
    <CalendarRoot
        v-slot="{ grid }"
        data-slot="calendar"
        :class="cn(calendarVariants({ variant }), props.class)"
        :locale="calendarLocale"
        :week-starts-on="calendarWeekStartsOn"
        v-bind="forwarded"
    >
        <CalendarHeader>
            <CalendarHeading />

            <div class="flex items-center gap-1">
                <CalendarPrevButton />
                <CalendarNextButton />
            </div>
        </CalendarHeader>

        <div class="mt-4 flex w-full flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
            <CalendarGrid
                v-for="month in grid"
                :key="month.value.toString()"
            >
                <CalendarGridHead>
                    <CalendarGridRow section="head">
                        <CalendarHeadCell
                            v-for="(day, index) in weekdayLabels"
                            :key="`${day}-${index}`"
                        >
                            {{ day }}
                        </CalendarHeadCell>
                    </CalendarGridRow>
                </CalendarGridHead>
                <CalendarGridBody>
                    <CalendarGridRow
                        v-for="(weekDates, index) in month.rows"
                        :key="`weekDate-${index}`"
                    >
                        <CalendarCell
                            v-for="weekDate in weekDates"
                            :key="weekDate.toString()"
                            :date="weekDate"
                        >
                            <CalendarCellTrigger
                                :day="weekDate"
                                :month="month.value"
                            />
                        </CalendarCell>
                    </CalendarGridRow>
                </CalendarGridBody>
            </CalendarGrid>
        </div>
    </CalendarRoot>
</template>
