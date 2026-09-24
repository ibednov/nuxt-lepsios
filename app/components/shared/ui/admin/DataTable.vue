<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  minWidth?: string
}>()
</script>

<template>
    <div :class="cn('overflow-hidden rounded-xl border border-border bg-card', props.class)">
        <div class="overflow-x-auto">
            <table
                class="w-full text-left text-sm"
                :style="{ minWidth: props.minWidth }"
            >
                <slot />
            </table>
        </div>
    </div>
</template>
