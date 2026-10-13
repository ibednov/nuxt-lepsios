<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/card/CardContent; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
    <div
        data-slot="card-content"
        :class="cn('px-6', props.class)"
    >
        <slot />
    </div>
</template>
