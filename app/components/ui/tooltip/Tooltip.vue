<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/tooltip/Tooltip; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from 'reka-ui'
import { TooltipRoot, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<TooltipRootProps>()
const emits = defineEmits<TooltipRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
    <TooltipRoot v-bind="forwarded">
        <slot />
    </TooltipRoot>
</template>
