<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

interface ComponentProps {
  title: string
  description?: string
  class?: HTMLAttributes['class']
}

const props = defineProps<ComponentProps>()
</script>

<template>
    <article
        :class="cn(
            'flex max-w-45 min-w-35 shrink-0 flex-col gap-1 rounded-2xl bg-lepsios-background p-3',
            props.class,
        )"
    >
        <div v-if="$slots.header">
            <slot name="header" />
        </div>
        <div class="flex items-center gap-2">
            <slot name="leading" />
            <h3 class="truncate text-sm font-medium text-accent-foreground">
                {{ title }}
            </h3>
        </div>
        <p
            v-if="description"
            class="line-clamp-2 text-xs text-muted-foreground"
        >
            {{ description }}
        </p>
    </article>
</template>
