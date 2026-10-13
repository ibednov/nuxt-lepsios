<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/dialog/DialogClose; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import { DialogClose, type DialogCloseProps } from 'reka-ui'

const props = defineProps<DialogCloseProps>()
</script>

<template>
    <DialogClose
        data-slot="dialog-close"
        v-bind="props"
    >
        <slot />
    </DialogClose>
</template>
