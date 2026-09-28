<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
  label?: string
}>()
</script>

<template>
  <Icon
    name="lucide:loader-circle"
    :role="props.label ? 'status' : undefined"
    :aria-label="props.label"
    :aria-hidden="props.label ? undefined : 'true'"
    :class="cn('size-4 animate-spin', props.class)"
  />
</template>
