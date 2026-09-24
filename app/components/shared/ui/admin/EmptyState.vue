<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  title?: string
  description?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
    <div :class="cn('flex min-h-44 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/20 px-6 py-10 text-center', props.class)">
        <div
            v-if="$slots.icon"
            class="mb-1 text-muted-foreground"
        >
            <slot name="icon" />
        </div>
        <h2
            v-if="title || $slots.title"
            class="text-sm font-semibold text-foreground"
        >
            <slot name="title">
                {{ title }}
            </slot>
        </h2>
        <p
            v-if="description || $slots.description"
            class="max-w-md text-sm leading-6 text-muted-foreground"
        >
            <slot name="description">
                {{ description }}
            </slot>
        </p>
        <div
            v-if="$slots.actions"
            class="mt-2"
        >
            <slot name="actions" />
        </div>
    </div>
</template>
