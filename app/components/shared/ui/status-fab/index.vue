<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { StatusFabVariants } from './variants'
import { cn } from '~/lib/utils'
import { statusFabVariants } from './variants'

interface ComponentProps {
  icon: string
  iconSize?: number | string
  variant?: StatusFabVariants['variant']
  position?: StatusFabVariants['position']
  class?: HTMLAttributes['class']
  ariaLabel?: string
}

const props = withDefaults(defineProps<ComponentProps>(), {
  iconSize: 18,
  variant: 'light-square',
  position: 'media-corner',
})

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
    <button
        type="button"
        :aria-label="ariaLabel"
        :class="cn(
            statusFabVariants({ variant: props.variant, position: props.position }),
            props.class,
        )"
        @click.stop="emit('click')"
    >
        <Icon
            :name="icon"
            :size="iconSize"
            class="block"
        />
    </button>
</template>
