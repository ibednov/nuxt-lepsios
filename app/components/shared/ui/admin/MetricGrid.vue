<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<{
  columns?: 1 | 2 | 3 | 4 | 5
  class?: HTMLAttributes['class']
}>(), {
  columns: 4,
})

const columnsClass = computed(() => ({
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-5',
}[props.columns]))
</script>

<template>
    <div :class="cn('grid gap-3 md:gap-4', columnsClass, props.class)">
        <slot />
    </div>
</template>
