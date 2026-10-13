<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/context-menu/ContextMenuRadioGroup; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import { ContextMenuRadioGroup, type ContextMenuRadioGroupEmits, type ContextMenuRadioGroupProps, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<ContextMenuRadioGroupProps>()
const emits = defineEmits<ContextMenuRadioGroupEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <ContextMenuRadioGroup v-bind="forwarded">
    <slot />
  </ContextMenuRadioGroup>
</template>
