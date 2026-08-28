<script lang="ts" setup>
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>(), {
    as: 'a',
})

const PrimitiveComponent = Primitive
const linkClass = computed(() => cn('hover:text-foreground transition-colors', props.class))
</script>

<template>
    <PrimitiveComponent
        data-slot="breadcrumb-link"
        :as="props.as"
        :as-child="props.asChild"
        :class="linkClass"
    >
        <slot />
    </PrimitiveComponent>
</template>
