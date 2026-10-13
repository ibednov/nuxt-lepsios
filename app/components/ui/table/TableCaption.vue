<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/table/TableCaption; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <caption :class="cn('mt-4 text-sm text-muted-foreground', props.class)">
        <slot />
    </caption>
</template>
