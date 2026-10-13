<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/command/CommandShortcut; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <span
        data-slot="command-shortcut"
        :class="cn('text-muted-foreground ml-auto text-xs tracking-widest', props.class)"
    >
        <slot />
    </span>
</template>
