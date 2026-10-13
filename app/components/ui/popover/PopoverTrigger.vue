<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/popover/PopoverTrigger; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import { PopoverTrigger, type PopoverTriggerProps } from 'reka-ui'

const props = defineProps<PopoverTriggerProps>()
</script>

<template>
    <PopoverTrigger
        data-slot="popover-trigger"
        v-bind="props"
    >
        <slot />
    </PopoverTrigger>
</template>
