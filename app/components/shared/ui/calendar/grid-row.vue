<script setup lang="ts">
import type { CalendarGridRowProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { CalendarGridRow, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/lib/utils'
import { calendarGridRowVariants, type CalendarGridRowVariants } from './variants'

const props = defineProps<CalendarGridRowProps & {
  class?: HTMLAttributes['class']
  section?: CalendarGridRowVariants['section']
}>()

const delegatedProps = computed(() => {
  const { class: _, section: __, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <CalendarGridRow
        data-slot="calendar-grid-row"
        :class="cn(calendarGridRowVariants({ section }), props.class)"
        v-bind="forwardedProps"
    >
        <slot />
    </CalendarGridRow>
</template>
