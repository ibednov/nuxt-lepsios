<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/sheet/SheetDescription; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { DialogDescriptionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DialogDescription } from 'reka-ui'
import { cn } from '~/lib/utils'

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
    <DialogDescription
        data-slot="sheet-description"
        :class="cn('text-muted-foreground text-sm', props.class)"
        v-bind="delegatedProps"
    >
        <slot />
    </DialogDescription>
</template>
