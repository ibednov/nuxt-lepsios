<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
    <div
        data-slot="card"
        :class="
            cn(
                'bg-lepsios-two/30 text-card-foreground flex flex-col gap-6 rounded-4xl border-none py-6 shadow-none',
                props.class,
            )
        "
    >
        <slot />
    </div>
</template>
