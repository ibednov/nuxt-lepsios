<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/dialog/DialogFooter; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
    <div
        data-slot="dialog-footer"
        :class="cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', props.class)"
    >
        <slot />
    </div>
</template>
