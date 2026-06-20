<script setup lang="ts">
import { CalendarHeadCell, type CalendarHeadCellProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'
import { calendarHeadCellVariants } from './variants'

const props = defineProps<CalendarHeadCellProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <CalendarHeadCell
        data-slot="calendar-head-cell"
        :class="cn(calendarHeadCellVariants(), props.class)"
        v-bind="forwardedProps"
    >
        <slot />
    </CalendarHeadCell>
</template>
