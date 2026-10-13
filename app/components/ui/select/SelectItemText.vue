<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/select/SelectItemText; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { SelectItemTextProps } from 'reka-ui'
import { SelectItemText } from 'reka-ui'

const props = defineProps<SelectItemTextProps>()
</script>

<template>
    <SelectItemText v-bind="props">
        <slot />
    </SelectItemText>
</template>
