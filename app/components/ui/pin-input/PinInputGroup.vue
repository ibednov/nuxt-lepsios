<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/pin-input/PinInputGroup; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>()
const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <Primitive
        data-slot="pin-input-group"
        v-bind="forwardedProps"
        :class="cn('flex items-center', props.class)"
    >
        <slot />
    </Primitive>
</template>
