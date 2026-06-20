<script setup lang="ts">
import { CalendarCell, type CalendarCellProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'
import { calendarCellVariants } from './variants'

const props = defineProps<CalendarCellProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <CalendarCell
        data-slot="calendar-cell"
        :class="cn(calendarCellVariants(), props.class)"
        v-bind="forwardedProps"
    >
        <slot />
    </CalendarCell>
</template>
