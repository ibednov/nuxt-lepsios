<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/card/CardTitle; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
    <h3
        data-slot="card-title"
        :class="cn('leading-none font-semibold', props.class)"
    >
        <slot />
    </h3>
</template>
