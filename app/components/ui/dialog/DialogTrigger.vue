<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/dialog/DialogTrigger; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import { DialogTrigger, type DialogTriggerProps } from 'reka-ui'

const props = defineProps<DialogTriggerProps>()
</script>

<template>
    <DialogTrigger
        data-slot="dialog-trigger"
        v-bind="props"
    >
        <slot />
    </DialogTrigger>
</template>
