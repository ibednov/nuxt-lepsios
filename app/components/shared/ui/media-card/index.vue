<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { MediaCardAspect } from './types'
import { computed } from 'vue'
import { cn } from '~/lib/utils'
import { mediaCardAspectClasses } from './types'

interface ComponentProps {
  src?: string
  alt?: string
  clickable?: boolean
  aspect?: MediaCardAspect
  class?: HTMLAttributes['class']
  imageClass?: HTMLAttributes['class']
  contentClass?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<ComponentProps>(), {
  alt: '',
  clickable: false,
  aspect: '16/10',
})

const emit = defineEmits<{
  click: []
}>()

const slots = useSlots()

const imageAspectClass = computed(() => mediaCardAspectClasses[props.aspect])

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
                'flex items-start justify-between gap-3 p-4',
                props.contentClass,
            )"
        >
            <div class="min-w-0 flex-1">
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
