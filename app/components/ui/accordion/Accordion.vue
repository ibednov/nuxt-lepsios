<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/accordion/Accordion; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { AccordionRootEmits, AccordionRootProps } from 'reka-ui'
import {
  AccordionRoot,
  useForwardPropsEmits,
} from 'reka-ui'

const props = defineProps<AccordionRootProps>()
const emits = defineEmits<AccordionRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
    <AccordionRoot v-bind="forwarded">
        <slot />
    </AccordionRoot>
</template>
