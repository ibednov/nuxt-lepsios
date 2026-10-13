<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/pin-input/PinInputSeparator; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui'

const props = defineProps<PrimitiveProps>()
const forwardedProps = useForwardProps(props)
</script>

<template>
    <Primitive
        data-slot="pin-input-separator"
        v-bind="forwardedProps"
    >
        <slot>
            <Icon name="lucide:minus" />
        </slot>
    </primitive>
</template>
