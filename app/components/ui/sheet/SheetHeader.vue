<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/sheet/SheetHeader; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
    <div
        data-slot="sheet-header"
        :class="cn('flex flex-col gap-1.5 p-4', props.class)"
    >
        <slot />
    </div>
</template>
