<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

type ModalActionVariant = 'default' | 'destructive'

interface ComponentProps {
  icon?: string
  label: string
  variant?: ModalActionVariant
  disabled?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<ComponentProps>(), {
  variant: 'default',
  disabled: false,
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  if (props.disabled) {
    return
  }

  emit('click')
}
</script>

<template>
    <button
        type="button"
        class="w-full"
        :disabled="disabled"
        @click="handleClick"
    >
        <shared-ui-big-button
            variant="list"
            :state="disabled ? 'disabled' : 'default'"
            :class="cn(
                'flex w-full items-center gap-3',
                variant === 'destructive' && 'text-destructive',
                props.class,
            )"
        >
            <Icon
                v-if="icon"
                :name="icon"
                size="20"
                class="shrink-0"
                :class="variant === 'destructive' ? 'text-destructive' : 'text-wishimi-icon-gray'"
            />
            <span>{{ label }}</span>
        </shared-ui-big-button>
    </button>
</template>
