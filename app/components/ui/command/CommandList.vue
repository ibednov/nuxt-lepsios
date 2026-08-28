<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { AnimatePresence, motion } from 'motion-v'
import type { ListboxContentProps } from 'reka-ui'
import { ListboxContent, useForwardProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<ListboxContentProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
    <ListboxContent
        data-slot="command-list"
        v-bind="forwarded"
        class="bg-popover/20 backdrop-blur-md text-popover-foreground rounded-2xl px-2 py-2"
        :class="cn('max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto', props.class)"
    >
        <AnimatePresence>
            <motion.div
                key="command-list"
                :initial="{ opacity: 0, y: -10 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: -10 }"
                :transition="{ duration: 0.2, ease: 'easeInOut' }"
                role="presentation"
            >
                <slot />
            </motion.div>
        </AnimatePresence>
    </ListboxContent>
</template>
