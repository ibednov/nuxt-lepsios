<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/table/TableHeader; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <thead :class="cn('[&_tr]:border-b', props.class)">
        <slot />
    </thead>
</template>
