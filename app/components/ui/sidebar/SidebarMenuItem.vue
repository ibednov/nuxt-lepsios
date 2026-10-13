<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/sidebar/SidebarMenuItem; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
    <li
        data-sidebar="menu-item"
        :class="cn('group/menu-item relative', props.class)"
    >
        <slot />
    </li>
</template>
