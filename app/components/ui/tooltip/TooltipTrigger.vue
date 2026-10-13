<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/tooltip/TooltipTrigger; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { TooltipTriggerProps } from 'reka-ui'
import { TooltipTrigger as RekaTooltipTrigger } from 'reka-ui'

const props = defineProps<TooltipTriggerProps>()
</script>

<template>
    <RekaTooltipTrigger v-bind="props">
        <slot />
    </RekaTooltipTrigger>
</template>
