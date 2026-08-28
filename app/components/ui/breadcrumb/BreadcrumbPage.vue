<script lang="ts" setup>
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()

const pageClass = computed(() => cn('text-foreground font-normal', props.class))
</script>

<template>
    <span
        data-slot="breadcrumb-page"
        role="link"
        aria-disabled="true"
        aria-current="page"
        :class="pageClass"
    >
        <slot />
    </span>
</template>
