<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/context-menu/ContextMenuTrigger; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import { ContextMenuTrigger, type ContextMenuTriggerProps, useForwardProps } from 'reka-ui'

const props = defineProps<ContextMenuTriggerProps>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <ContextMenuTrigger v-bind="forwardedProps">
    <slot />
  </ContextMenuTrigger>
</template>
