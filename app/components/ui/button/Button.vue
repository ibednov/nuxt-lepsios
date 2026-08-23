<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '.'
import { Primitive } from 'reka-ui'
import { cn } from '~/lib/utils'
import { buttonVariants } from '.'

interface Props extends PrimitiveProps {
  textAlign?: ButtonVariants['textAlign']
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  textAlign: 'left',
  disabled: false,
})
</script>

<template>
    <Primitive
        data-slot="button"
        :as="as"
        :as-child="asChild"
        :disabled="props.disabled"
        :aria-disabled="props.disabled ? true : undefined"
        :class="cn(buttonVariants({ variant, size, textAlign }), props.class)"
    >
        <slot />
    </Primitive>
</template>
