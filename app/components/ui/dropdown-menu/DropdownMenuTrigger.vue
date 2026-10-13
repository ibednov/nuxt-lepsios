<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/dropdown-menu/DropdownMenuTrigger; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import { DropdownMenuTrigger, type DropdownMenuTriggerProps, useForwardProps } from 'reka-ui'

const props = defineProps<DropdownMenuTriggerProps>()

const forwardedProps = useForwardProps(props)
</script>

<template>
    <DropdownMenuTrigger
        data-slot="dropdown-menu-trigger"
        v-bind="forwardedProps"
    >
        <slot />
    </DropdownMenuTrigger>
</template>
