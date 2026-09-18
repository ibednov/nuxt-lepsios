<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { EntityCardVariants } from './variants'
import { computed } from 'vue'
import { cn } from '~/lib/utils'
import { entityCardVariants } from './variants'

interface ComponentProps {
  variant?: NonNullable<EntityCardVariants['variant']>
  density?: NonNullable<EntityCardVariants['density']>
  as?: 'article' | 'div' | 'button'
  clickable?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<ComponentProps>(), {
  variant: 'person',
  density: 'cozy',
  as: 'article',
  clickable: false,
})

const emit = defineEmits<{
  click: []
}>()

const slots = useSlots()

const rootTag = computed(() => {
  if (props.as !== 'article') {
    return props.as
  }
  if (props.variant === 'inbox' && props.clickable) {
    return 'button'
  }
  return 'article'
})

const handleClick = () => {
  if (!props.clickable) {
    return
  }
  emit('click')
}
</script>

<template>
    <component
        :is="rootTag"
        :type="rootTag === 'button' ? 'button' : undefined"
        :class="cn(
            entityCardVariants({ variant: props.variant, density: props.density }),
            clickable && rootTag !== 'button' && 'cursor-pointer',
            props.class,
        )"
        @click="handleClick"
    >
        <!-- person: leading row + actions -->
        <template v-if="variant === 'person'">
            <div class="flex items-center gap-3">
                <div
                    v-if="slots.leading"
                    class="shrink-0"
                >
                    <slot name="leading" />
                </div>
                <div class="flex min-w-0 flex-1 flex-col">
                    <slot name="title" />
                    <slot name="subtitle" />
                </div>
                <div
                    v-if="slots.meta"
                    class="shrink-0"
                >
                    <slot name="meta" />
                </div>
            </div>
            <div
                v-if="slots.actions"
                class="flex items-center gap-2"
            >
                <slot name="actions" />
            </div>
            <slot />
        </template>

        <!-- inbox: horizontal row -->
        <template v-else-if="variant === 'inbox'">
            <div
                v-if="slots.leading"
                class="shrink-0"
            >
                <slot name="leading" />
            </div>
            <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-2">
                    <slot name="title" />
                    <slot name="meta" />
                </div>
                <slot name="preview" />
            </div>
            <div
                v-if="slots.trailing"
                class="flex shrink-0 items-center gap-2"
            >
                <slot name="trailing" />
            </div>
            <slot />
        </template>

        <!-- thumb-row: media list item -->
        <template v-else>
            <div class="flex items-start gap-3">
                <div
                    v-if="slots.leading"
                    class="size-[72px] shrink-0 overflow-hidden rounded-xl bg-muted"
                >
                    <slot name="leading" />
                </div>
                <div class="min-w-0 flex-1">
                    <slot name="meta" />
                    <slot name="title" />
                    <slot name="subtitle" />
                    <slot name="preview" />
                </div>
            </div>
            <div
                v-if="slots.inset"
                class="mt-3"
            >
                <slot name="inset" />
            </div>
            <div
                v-if="slots.actions"
                class="mt-3 flex items-center gap-2"
            >
                <slot name="actions" />
            </div>
            <div
                v-if="slots.footer"
                class="mt-3"
            >
                <slot name="footer" />
            </div>
            <slot />
        </template>
    </component>
</template>
