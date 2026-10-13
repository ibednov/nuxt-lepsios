<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/sheet/SheetTrigger; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { DialogTriggerProps } from 'reka-ui'
import { DialogTrigger } from 'reka-ui'

const props = defineProps<DialogTriggerProps>()
</script>

<template>
    <DialogTrigger
        data-slot="sheet-trigger"
        v-bind="props"
    >
        <slot />
    </DialogTrigger>
</template>
