<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

interface Props {
  title: string
  hint?: string
  disabled?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const modelValue = defineModel<boolean>({ default: false })

const handleRowClick = () => {
  if (props.disabled) {
    return
  }
  modelValue.value = !modelValue.value
}
</script>

<template>
    <div
        role="switch"
        tabindex="0"
        :aria-checked="modelValue"
        :aria-disabled="disabled"
        :class="cn(
            'flex items-center justify-between gap-3 px-4 py-4 select-none',
            disabled
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer',
            props.class,
        )"
        @click="handleRowClick"
        @keydown.enter.prevent="handleRowClick"
        @keydown.space.prevent="handleRowClick"
    >
        <div class="flex min-w-0 items-center gap-3">
            <slot name="icon" />
            <div class="min-w-0 text-left">
                <div class="font-medium text-accent-foreground">
                    {{ title }}
                </div>
                <div
                    v-if="hint"
                    class="text-sm text-muted-foreground"
                >
                    {{ hint }}
                </div>
            </div>
        </div>
        <Switch
            :model-value="modelValue"
            :disabled="disabled"
            tabindex="-1"
            class="pointer-events-none"
        />
    </div>
</template>
