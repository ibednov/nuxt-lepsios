<script setup lang="ts">
const props = withDefaults(defineProps<{
  phrases: string[]
  paused?: boolean
}>(), {
  paused: false,
})

const activeIndex = ref(0)
const mounted = ref(false)
const reducedMotion = ref(false)
const pageHidden = ref(false)

const safePhrases = computed(() => props.phrases.filter(Boolean))
const animated = computed(() => mounted.value && !reducedMotion.value && safePhrases.value.length > 1)
const playbackPaused = computed(() => props.paused || pageHidden.value)

let motionQuery: MediaQueryList | undefined

function updateMotionPreference() {
  reducedMotion.value = motionQuery?.matches ?? false
  activeIndex.value = 0
}

function updatePageVisibility() {
  pageHidden.value = document.hidden
}

function advancePhrase(event: AnimationEvent) {
  if (event.target !== event.currentTarget || !animated.value)
    return
  const total = safePhrases.value.length
  if (!total)
    return
  activeIndex.value = (activeIndex.value + 1) % total
}

const phraseIndex = computed(() => {
  const total = safePhrases.value.length
  if (!total)
    return 0
  return activeIndex.value % total
})

const currentPhrase = computed(() => safePhrases.value[phraseIndex.value] ?? '')

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  updateMotionPreference()
  updatePageVisibility()
  motionQuery.addEventListener('change', updateMotionPreference)
  document.addEventListener('visibilitychange', updatePageVisibility)
  mounted.value = true
})

onBeforeUnmount(() => {
  motionQuery?.removeEventListener('change', updateMotionPreference)
  document.removeEventListener('visibilitychange', updatePageVisibility)
})
</script>

<template>
  <span
    class="lepsios-rotating"
    :class="{ 'is-animated': animated, 'is-paused': playbackPaused }"
  >
    <span class="sr-only">{{ safePhrases.join(', ') }}</span>
    <span
      v-if="safePhrases.length"
      class="lepsios-rotating-grid"
      aria-hidden="true"
    >
      <span
        v-for="(phrase, index) in safePhrases"
        :key="`reserve-${index}`"
        class="lepsios-rotating-reserve"
      >{{ phrase }}</span>
      <span
        :key="phraseIndex"
        class="lepsios-rotating-phrase"
      >
        <span class="lepsios-rotating-base">{{ currentPhrase }}</span>
        <span
          class="lepsios-rotating-fill"
          @animationend="advancePhrase"
        >{{ currentPhrase }}</span>
      </span>
    </span>
  </span>
</template>

<style scoped>
.lepsios-rotating {
  display: block;
  min-width: 0;
  max-width: 100%;
}

.lepsios-rotating-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  width: max-content;
  max-width: 100%;
}

.lepsios-rotating-reserve,
.lepsios-rotating-phrase {
  grid-area: 1 / 1;
  align-self: start;
  justify-self: start;
  min-width: 0;
  max-width: 100%;
  padding-bottom: 0.1em;
  white-space: normal;
}

.lepsios-rotating-reserve {
  visibility: hidden;
  pointer-events: none;
}

.lepsios-rotating-phrase {
  position: relative;
}

.lepsios-rotating-base {
  color: color-mix(in srgb, var(--gp-muted, #a4a7b9) 48%, transparent);
}

.lepsios-rotating-phrase::after,
.lepsios-rotating-fill::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: max(1px, 0.018em);
}

.lepsios-rotating-phrase::after {
  background: var(--gp-line, #282b37);
}

.lepsios-rotating-fill {
  position: absolute;
  z-index: 1;
  inset: 0;
  color: var(--gp-accent, #a8a5ff);
  background: linear-gradient(
    110deg,
    var(--gp-pink, #f49dde),
    var(--gp-violet, #ad6aff) 48%,
    #708dff
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lepsios-rotating-fill::after {
  background: currentColor;
}

.is-animated .lepsios-rotating-fill {
  animation: lepsios-phrase-fill 3.6s linear both;
}

.is-paused .lepsios-rotating-fill {
  animation-play-state: paused;
}

@keyframes lepsios-phrase-fill {
  0% {
    clip-path: inset(0 100% 0 0);
  }

  83.333%,
  100% {
    clip-path: inset(0 0 0 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .lepsios-rotating-fill {
    animation: none !important;
    clip-path: none;
  }
}
</style>
