<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/table/TableBody; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <tbody :class="cn('[&_tr:last-child]:border-0', props.class)">
        <slot />
    </tbody>
</template>
