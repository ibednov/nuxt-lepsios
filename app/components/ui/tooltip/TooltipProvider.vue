<script setup lang="ts">
import type { TooltipProviderProps } from 'reka-ui'
import { TooltipProvider as RekaTooltipProvider } from 'reka-ui'

const props = defineProps<TooltipProviderProps>()
</script>

<template>
    <RekaTooltipProvider v-bind="props">
        <slot />
    </RekaTooltipProvider>
</template>
