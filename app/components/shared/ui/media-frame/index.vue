<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface Props {
  surface?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  surface: true,
})
</script>

<template>
    <div
        class="w-full overflow-hidden rounded-[20px]"
        :class="[
            props.surface ? 'bg-lepsios-surface' : '',
            props.class,
        ]"
    >
        <slot />
    </div>
</template>
