<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

interface ComponentProps {
  label: string
  icon?: string
  active?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<ComponentProps>(), {
  active: false,
})

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
    <button
        type="button"
        :class="cn(
            'inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
            active
                ? 'bg-accent-foreground/20 text-accent-foreground'
                : 'bg-accent-foreground/10 text-muted-foreground',
            props.class,
        )"
        @click="emit('click')"
    >
        <Icon
            v-if="icon"
            :name="icon"
            size="14"
        />
        {{ label }}
    </button>
</template>
