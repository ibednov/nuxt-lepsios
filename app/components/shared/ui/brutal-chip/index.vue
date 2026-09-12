<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

defineProps<{
  icon?: string
  label: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    class="flex h-full min-h-12 w-full items-center gap-2 border border-[color:var(--gp-ink,#09090b)] bg-[color:var(--gp-paper,#fafafa)] px-3 py-2.5 shadow-[3px_3px_0_0_var(--gp-accent,#2563eb)]"
    :class="$props.class"
  >
    <Icon
      v-if="icon"
      :name="icon"
      class="size-4 shrink-0 text-[color:var(--gp-accent,#2563eb)]"
      aria-hidden="true"
    />
    <p class="line-clamp-2 font-mono text-[10px] uppercase leading-tight tracking-[0.08em] text-[color:var(--gp-ink,#09090b)] sm:text-[11px]">
      {{ label }}
    </p>
  </div>
</template>
