<script setup lang="ts">
const props = withDefaults(defineProps<{
  pose?: 'welcome' | 'cooking' | 'thinking' | 'shopping' | 'success' | 'empty' | 'idle' | 'peace'
  size?: 'sm' | 'md' | 'lg'
  alt?: string
  basePath?: string
}>(), { pose: 'idle', size: 'md', alt: 'Mascot', basePath: '/images/waify' })

const src = computed(() => `${props.basePath}/mascot-${props.pose}.png`)
</script>

<template>
  <img :src="src" :alt="alt" class="waify-mascot" :class="{ 'waify-mascot--sm': size === 'sm', 'waify-mascot--lg': size === 'lg' }" draggable="false">
</template>
