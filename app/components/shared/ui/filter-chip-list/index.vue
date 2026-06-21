<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

interface ComponentProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<ComponentProps>()
</script>

<template>
    <div
        :class="cn(
            'flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            props.class,
        )"
    >
        <slot />
    </div>
</template>
