<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
    class?: HTMLAttributes['class']
    ariaLabel?: string
}>()
</script>

<template>
    <nav
        :aria-label="props.ariaLabel"
        data-slot="breadcrumb"
        :class="props.class"
    >
        <slot />
    </nav>
</template>
