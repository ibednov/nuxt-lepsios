<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { MediaCardAspect, MediaCardLayout } from './types'
import { computed } from 'vue'
import { cn } from '~/lib/utils'
import { mediaCardAspectClasses } from './types'

interface ComponentProps {
  src?: string
  alt?: string
  clickable?: boolean
  aspect?: MediaCardAspect
  layout?: MediaCardLayout
  class?: HTMLAttributes['class']
  imageClass?: HTMLAttributes['class']
  contentClass?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<ComponentProps>(), {
  alt: '',
  clickable: false,
  aspect: '16/10',
  layout: 'cover',
})

const emit = defineEmits<{
  click: []
}>()

const slots = useSlots()

const imageAspectClass = computed(() => mediaCardAspectClasses[props.aspect])

const contentLayoutClass = computed(() => {
  if (props.layout === 'tile') {
    return 'flex flex-col gap-1.5 px-2.5 pt-1.5 pb-2.5'
  }
  return 'flex items-start justify-between gap-3 p-4'
})

const handleClick = () => {
  if (!props.clickable) {
    return
  }

  emit('click')
}
</script>

<template>
    <article
        :class="cn(
            'overflow-hidden rounded-2xl bg-lepsios-background',
            clickable && 'cursor-pointer',
            props.class,
        )"
        @click="handleClick"
    >
        <div
            :class="cn(
                'relative overflow-hidden',
                imageAspectClass,
                props.imageClass,
            )"
        >
            <slot name="image">
                <img
                    v-if="src"
                    :src="src"
                    :alt="alt"
                    class="absolute inset-0 size-full object-cover"
                >
            </slot>

            <div
                v-if="slots.overlay"
                class="absolute inset-0 z-[1]"
            >
                <slot name="overlay" />
            </div>
        </div>

        <div
            :class="cn(
                contentLayoutClass,
                props.contentClass,
            )"
        >
            <div
                :class="layout === 'tile' ? 'min-w-0 w-full' : 'min-w-0 flex-1'"
            >
                <slot name="content" />
            </div>

            <div
                v-if="slots.action"
                class="shrink-0"
                @click.stop
            >
                <slot name="action" />
            </div>
        </div>
    </article>
</template>
