<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
    <div :class="cn('overflow-hidden rounded-2xl bg-lepsios-surface', props.class)">
        <slot />
    </div>
</template>
