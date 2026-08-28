<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { ListboxFilter, type ListboxFilterProps, useForwardProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { useCommand } from '.'

defineOptions({
    inheritAttrs: false,
})

const props = defineProps<
    ListboxFilterProps & {
        class?: HTMLAttributes['class']
    }
>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)

const { filterState } = useCommand()
</script>

<template>
    <div
        data-slot="command-input-wrapper"
        class="flex h-12 items-center gap-3 px-4
        bg-popover/50 text-popover-foreground
        backdrop-blur-md
        rounded-full
        "
    >
        <Icon
            name="ph:magnifying-glass"
            size="20"
            class="shrink-0 opacity-50"
        />
        <ListboxFilter
            v-bind="{ ...forwardedProps, ...$attrs }"
            v-model="filterState.search"
            data-slot="command-input"
            auto-focus
            :class="cn('placeholder:text-muted-foreground flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50', props.class)"
        />
    </div>
</template>
