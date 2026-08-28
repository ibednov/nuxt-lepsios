<script lang="ts" setup>
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()

const ellipsisClass = computed(() => cn('flex size-9 items-center justify-center', props.class))
</script>

<template>
    <span
        data-slot="breadcrumb-ellipsis"
        role="presentation"
        aria-hidden="true"
        :class="ellipsisClass"
    >
        <slot>
            <Icon name="lucide:more-horizontal" class="size-4" />
        </slot>
        <span class="sr-only">More</span>
    </span>
</template>
