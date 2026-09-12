<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '~/components/ui/button'

withDefaults(defineProps<{
  icon: string
  iconSize?: number | string
  iconClass?: HTMLAttributes['class']
  buttonClass?: HTMLAttributes['class']
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  testId?: string
}>(), {
  iconSize: 24,
  iconClass: undefined,
  buttonClass: undefined,
  variant: 'ghost',
  size: 'icon',
  testId: undefined,
})
</script>

<template>
    <Button
        :variant="variant"
        :size="size"
        :class="buttonClass"
        :data-testid="testId"
    >
        <Icon
            :name="icon"
            :size="iconSize"
            :class="iconClass"
        />
    </Button>
</template>
