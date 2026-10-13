<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/select/SelectValue; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { SelectValueProps } from 'reka-ui'
import { SelectValue } from 'reka-ui'

const props = defineProps<SelectValueProps>()
</script>

<template>
    <SelectValue v-bind="props">
        <slot />
    </SelectValue>
</template>
