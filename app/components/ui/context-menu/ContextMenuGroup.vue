<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/context-menu/ContextMenuGroup; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import { ContextMenuGroup, type ContextMenuGroupProps } from 'reka-ui'

const props = defineProps<ContextMenuGroupProps>()
</script>

<template>
  <ContextMenuGroup v-bind="props">
    <slot />
  </ContextMenuGroup>
</template>
