<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
    <section :class="cn('mx-auto flex w-full max-w-[1440px] flex-col gap-6', props.class)">
        <slot />
    </section>
</template>
