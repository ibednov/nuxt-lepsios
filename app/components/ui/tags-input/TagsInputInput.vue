<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/tags-input/TagsInputInput; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { TagsInputInputProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { TagsInputInput, useForwardProps } from 'reka-ui'
import { cn } from '~/lib/utils'

const props = defineProps<TagsInputInputProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <TagsInputInput
        v-bind="forwardedProps"
        :class="cn('text-sm min-h-5 focus:outline-none flex-1 bg-transparent px-1', props.class)"
    />
</template>
