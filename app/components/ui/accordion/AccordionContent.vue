<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/accordion/AccordionContent; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { AccordionContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { AccordionContent } from 'reka-ui'
import { cn } from '~/lib/utils'

const props = defineProps<AccordionContentProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
    <AccordionContent
        v-bind="delegatedProps"
        class="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    >
        <div :class="cn('pb-4 pt-0', props.class)">
            <slot />
        </div>
    </AccordionContent>
</template>
