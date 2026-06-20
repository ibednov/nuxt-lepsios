<script setup lang="ts">
import { CalendarGrid, type CalendarGridProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'
import { calendarGridVariants } from './variants'

const props = defineProps<CalendarGridProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <CalendarGrid
        data-slot="calendar-grid"
        :class="cn(calendarGridVariants(), props.class)"
        v-bind="forwardedProps"
    >
        <colgroup>
            <col
                v-for="index in 7"
                :key="index"
                class="w-[14.285714%]"
            >
        </colgroup>
        <slot />
    </CalendarGrid>
</template>
