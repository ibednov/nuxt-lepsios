<script lang="ts" setup>
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()

const itemClass = computed(() => cn('inline-flex items-center gap-1.5', props.class))
</script>

<template>
    <li
        data-slot="breadcrumb-item"
        :class="itemClass"
    >
        <slot />
    </li>
</template>
