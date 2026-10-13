<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/combobox/ComboboxSeparator; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { ComboboxSeparatorProps } from 'reka-ui'
import { ComboboxSeparator } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<ComboboxSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props

    return delegated
})
</script>

<template>
    <ComboboxSeparator
        v-bind="delegatedProps"
        :class="cn('-mx-1 h-px bg-border', props.class)"
    >
        <slot />
    </ComboboxSeparator>
</template>
