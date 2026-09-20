<script setup lang="ts">
withDefaults(defineProps<{
  pose?: 'empty' | 'shopping' | 'thinking' | 'cooking' | 'welcome'
  title: string
  description?: string
  variant?: 'default' | 'cosy'
}>(), { pose: 'empty', variant: 'default' })
</script>

<template>
  <div class="flex flex-col items-center gap-4 px-6 py-10 text-center" :class="variant === 'cosy' ? 'waify-card bg-gradient-to-br from-white to-[#f3f6ec]' : 'waify-card'">
    <SharedUiMascot :pose="pose" size="lg" />
    <div class="flex max-w-xl flex-col gap-1">
      <h2 class="waify-display text-xl font-medium text-foreground">{{ title }}</h2>
      <p v-if="description" class="text-sm leading-relaxed text-muted-foreground">{{ description }}</p>
    </div>
    <slot />
  </div>
</template>
