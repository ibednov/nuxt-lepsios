<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/input-group/InputGroupText; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
    <span
        :class="cn(
            'text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4',
            props.class,
        )"
    >
        <slot />
    </span>
</template>
