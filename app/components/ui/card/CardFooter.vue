<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/card/CardFooter; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
    <div
        data-slot="card-footer"
        :class="cn('flex items-center px-6 [.border-t]:pt-6', props.class)"
    >
        <slot />
    </div>
</template>
