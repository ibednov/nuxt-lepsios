<script setup lang="ts">
withDefaults(defineProps<{
  /** Glow accent: maps to --gp-* tokens from landing.css */
  glow?: 'blue' | 'violet' | 'signal' | 'pink'
  /** Decorative media: orbit sphere, bars, or none */
  media?: 'orbit' | 'orbit-rounded' | 'bars' | 'none'
  barCount?: number
}>(), {
  glow: 'blue',
  media: 'orbit',
  barCount: 28,
})
</script>

<template>
  <article
    class="glow-card flex flex-col p-6 sm:p-8"
    :data-glow="glow"
  >
    <div
      v-if="media !== 'none'"
      class="glow-card-light"
      aria-hidden="true"
    >
      <div
        v-if="media === 'orbit' || media === 'orbit-rounded'"
        class="glow-card-orbit"
        :class="{ 'is-rounded': media === 'orbit-rounded' }"
      />
      <div
        v-else-if="media === 'bars'"
        class="glow-card-bars"
      >
        <i
          v-for="n in barCount"
          :key="n"
          :style="{ '--bar': `${25 + ((n * 17) % 70)}%` }"
        />
      </div>
    </div>
    <slot />
  </article>
</template>
