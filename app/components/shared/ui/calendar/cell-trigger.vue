<script setup lang="ts">
import { CalendarCellTrigger, type CalendarCellTriggerProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { calendarCellTriggerVariants } from './variants'

const props = withDefaults(defineProps<CalendarCellTriggerProps & { class?: HTMLAttributes['class'] }>(), {
  as: 'button',
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <CalendarCellTrigger
        data-slot="calendar-cell-trigger"
        :class="cn(
            buttonVariants({ variant: 'ghost' }),
            calendarCellTriggerVariants(),
            props.class,
        )"
        v-bind="forwardedProps"
    >
        <slot />
    </CalendarCellTrigger>
</template>
