<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  eyebrow?: string
  title?: string
  description?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
    <header :class="cn('flex flex-col gap-4 md:flex-row md:items-end md:justify-between', props.class)">
        <div class="flex min-w-0 items-start gap-3">
            <div v-if="$slots.leading" class="shrink-0 pt-1">
                <slot name="leading" />
            </div>
            <div class="min-w-0 space-y-1">
            <p
                v-if="eyebrow || $slots.eyebrow"
                class="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
            >
                <slot name="eyebrow">
                    {{ eyebrow }}
                </slot>
            </p>
            <h1 class="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                <slot name="title">
                    {{ title }}
                </slot>
            </h1>
            <p
                v-if="description || $slots.description"
                class="max-w-3xl text-sm leading-6 text-muted-foreground"
            >
                <slot name="description">
                    {{ description }}
                </slot>
            </p>
            </div>
        </div>
        <div
            v-if="$slots.actions"
            class="flex shrink-0 flex-wrap items-center gap-2"
        >
            <slot name="actions" />
        </div>
    </header>
</template>
