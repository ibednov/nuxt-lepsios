<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  variant?: 'default' | 'cosy' | 'cosy-soft'
}>(), { variant: 'default' })
</script>

<template>
    <div
        data-slot="card"
        :class="
            cn(
                props.variant === 'cosy'
                    ? 'flex flex-col gap-6 rounded-[1.25rem] border border-[var(--waify-border,#E6E2DA)] bg-white py-5 text-[var(--waify-charcoal,#231E1A)] shadow-[0_3px_12px_rgb(35_30_26/.06)]'
                    : props.variant === 'cosy-soft'
                        ? 'flex flex-col gap-6 rounded-[1.25rem] border border-[#f2e1d7] bg-[#f8eee7] py-5 text-[var(--waify-charcoal,#231E1A)] shadow-none'
                        : 'bg-lepsios-two/30 text-card-foreground flex flex-col gap-6 rounded-4xl border-none py-6 shadow-none',
                props.class,
            )
        "
    >
        <slot />
    </div>
</template>
