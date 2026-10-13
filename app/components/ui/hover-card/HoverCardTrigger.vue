<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/hover-card/HoverCardTrigger; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { HoverCardTriggerProps } from "reka-ui"
import { HoverCardTrigger } from "reka-ui"

const props = defineProps<HoverCardTriggerProps>()
</script>

<template>
  <HoverCardTrigger v-bind="props">
    <slot />
  </HoverCardTrigger>
</template>
