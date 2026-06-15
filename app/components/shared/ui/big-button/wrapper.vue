<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BigButtonState, BigButtonVariant } from './types'
import { computed } from 'vue'
import { cn } from '~/lib/utils'

interface ComponentProps {
  title?: string
  variant?: BigButtonVariant
  state?: BigButtonState
  class?: HTMLAttributes['class']
  titleClass?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<ComponentProps>(), {
  variant: 'default',
  state: 'default',
})

const rootBase
  = 'col-span-2 flex flex-col gap-3 rounded-xl p-3 transition-colors'

const titleBase = 'text-xl md:text-2xl font-thin'

/** variant → state → классы блока и заголовка */
const tones = {
  default: {
    default: {
      root: 'border border-border bg-accent-foreground/10',
      title: 'text-accent-foreground',
    },
    active: {
      root: 'border border-border bg-accent-foreground/10 ring-2 ring-accent/20 ring-offset-2 ring-offset-background',
      title: 'text-accent-foreground',
    },
    disabled: {
      root: 'pointer-events-none border border-border bg-accent-foreground/10 opacity-50',
      title: 'text-accent-foreground',
    },
  },
  invert: {
    default: {
      root: 'bg-accent-foreground/75 backdrop-blur-xl',
      title: 'text-accent',
    },
    active: {
      root: 'bg-accent-foreground ring-2 ring-accent/30 ring-offset-2 ring-offset-background',
      title: 'text-accent',
    },
    disabled: {
      root: 'pointer-events-none bg-accent-foreground opacity-50',
      title: 'text-accent',
    },
  },
} as const satisfies Record<
  BigButtonVariant,
  Record<BigButtonState, { root: string, title: string }>
>

const tone = computed(() => tones[props.variant][props.state])
</script>

<template>
    <div
        :class="cn(rootBase, tone.root, props.class)"
        :aria-disabled="state === 'disabled' ? true : undefined"
    >
        <div :class="cn(titleBase, tone.title, props.titleClass)">
            <slot name="title">
                {{ title }}
            </slot>
        </div>

        <slot />
    </div>
</template>
