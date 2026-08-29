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
}>(), {
  iconSize: 24,
  iconClass: undefined,
  buttonClass: undefined,
  variant: 'ghost',
  size: 'icon',
})
</script>

<template>
    <Button
        :variant="variant"
        :size="size"
        :class="buttonClass"
    >
        <Icon
            :name="icon"
            :size="iconSize"
            :class="iconClass"
        />
    </Button>
</template>
