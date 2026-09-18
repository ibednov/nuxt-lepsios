<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { MediaChipVariants } from './variants'
import { cn } from '~/lib/utils'
import { mediaChipVariants } from './variants'

interface ComponentProps {
  label: string
  variant?: MediaChipVariants['variant']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<ComponentProps>(), {
  variant: 'glass',
})
</script>

<template>
    <span
        :class="cn(mediaChipVariants({ variant: props.variant }), props.class)"
    >
        {{ label }}
    </span>
</template>
