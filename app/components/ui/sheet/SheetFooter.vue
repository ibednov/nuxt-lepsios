<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/sheet/SheetFooter; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
    <div
        data-slot="sheet-footer"
        :class="cn('mt-auto flex flex-col gap-2 p-4', props.class)
        "
    >
        <slot />
    </div>
</template>
