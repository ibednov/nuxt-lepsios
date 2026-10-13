<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/range-calendar/RangeCalendarHeading; remove after Nuxt consumers migrate. -->
<script lang="ts" setup>
import { RangeCalendarHeading, type RangeCalendarHeadingProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<RangeCalendarHeadingProps & { class?: HTMLAttributes['class'] }>()

defineSlots<{
  default: (props: { headingValue: string }) => any
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <RangeCalendarHeading
        v-slot="{ headingValue }"
        data-slot="range-calendar-heading"
        :class="cn('text-sm font-medium', props.class)"
        v-bind="forwardedProps"
    >
        <slot :heading-value>
            {{ headingValue }}
        </slot>
    </RangeCalendarHeading>
</template>
