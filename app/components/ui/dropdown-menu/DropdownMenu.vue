<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/dropdown-menu/DropdownMenu; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { DropdownMenuRootEmits, DropdownMenuRootProps } from 'reka-ui'
import { DropdownMenuRoot, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<DropdownMenuRootProps>()
const emits = defineEmits<DropdownMenuRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
    <DropdownMenuRoot
        data-slot="dropdown-menu"
        v-bind="forwarded"
    >
        <slot />
    </DropdownMenuRoot>
</template>
