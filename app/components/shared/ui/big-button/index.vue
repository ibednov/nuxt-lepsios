<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BigButtonState, BigButtonVariant } from './types'
import { computed } from 'vue'
import { cn } from '~/lib/utils'

interface ComponentProps {
  variant?: BigButtonVariant
  state?: BigButtonState
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<ComponentProps>(), {
  variant: 'default',
  state: 'default',
})

const rootBase = computed(() =>
  props.variant === 'list'
    ? 'w-full px-4 py-4 text-left text-base md:text-lg transition-colors cursor-pointer'
    : 'w-full rounded-2xl p-4 text-center text-lg md:text-xl transition-colors backdrop-blur-xl',
)

/** variant → state → только «тон» поверх rootBase */
const tones = {
  default: {
    default:
      'bg-lepsios-background text-accent-foreground hover:bg-accent-foreground/80 hover:text-accent',
    active:
      'bg-accent-foreground text-accent',
    disabled:
      'pointer-events-none cursor-not-allowed bg-accent-foreground/60 text-accent opacity-50',
  },
  invert: {
    default:
      'bg-accent-foreground text-accent hover:bg-accent-foreground/90',
    active:
      'bg-accent text-accent-foreground shadow-sm ring-2 ring-accent-foreground/25 ring-offset-2 ring-offset-background',
    disabled:
      'pointer-events-none cursor-not-allowed bg-accent-foreground/60 text-accent opacity-50',
  },
  list: {
    default:
      'bg-transparent text-accent-foreground hover:bg-accent-foreground/5',
    active:
      'bg-accent-foreground/10 text-accent',
    disabled:
      'pointer-events-none cursor-not-allowed opacity-50',
  },
} as const satisfies Record<BigButtonVariant, Record<BigButtonState, string>>

const toneClass = computed(() => tones[props.variant][props.state])
</script>

<template>
    <div
        :class="cn(rootBase, toneClass, props.class)"
        :aria-disabled="state === 'disabled' ? true : undefined"
    >
        <slot />
    </div>
</template>
