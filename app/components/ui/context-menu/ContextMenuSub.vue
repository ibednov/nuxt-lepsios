<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/context-menu/ContextMenuSub; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import { ContextMenuSub, type ContextMenuSubEmits, type ContextMenuSubProps, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<ContextMenuSubProps>()
const emits = defineEmits<ContextMenuSubEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <ContextMenuSub v-bind="forwarded">
    <slot />
  </ContextMenuSub>
</template>
