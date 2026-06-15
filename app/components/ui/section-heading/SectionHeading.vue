<script setup lang="ts">
interface Props {
  /** Маленький лейбл над заголовком (например "Возможности") */
  label?: string
  /** Основной заголовок h2. Не используется если передан слот title */
  title?: string
  /** Описание под заголовком */
  description?: string
  /** Включить анимации fade-up с задержками */
  animate?: boolean
  /** Нижний отступ обёртки: 16 | 14 | 12 (mb-*) */
  marginBottom?: '16' | '14' | '12'
  /** Максимальная ширина блока: 2xl | 3xl */
  maxWidth?: '2xl' | '3xl'
}

const props = withDefaults(defineProps<Props>(), {
  animate: true,
  marginBottom: '16',
  maxWidth: '2xl',
})

const marginClass = computed(() =>
  props.marginBottom === '12' ? 'mb-12' : props.marginBottom === '14' ? 'mb-14' : 'mb-16',
)
const maxWidthClass = computed(() => (props.maxWidth === '3xl' ? 'max-w-3xl' : 'max-w-2xl'))
const animationClass = computed(() => (props.animate ? 'opacity-0 animate-fade-up' : ''))
</script>

<template>
  <div
    class="text-center mx-auto"
    :class="[maxWidthClass, marginClass]"
  >
    <span
      v-if="label"
      class="inline-block text-sm font-semibold text-primary mb-3"
      :class="animationClass"
      style="animation-delay: 0.1s"
    >
      {{ label }}
    </span>
    <h2
      class="text-3xl md:text-4xl font-extrabold mb-4"
      :class="animationClass"
      :style="label ? 'animation-delay: 0.2s' : animate ? 'animation-delay: 0.1s' : undefined"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </h2>
    <p
      v-if="description || $slots.description"
      class="text-muted-foreground text-lg"
      :class="animationClass"
      :style="animate ? 'animation-delay: 0.3s' : undefined"
    >
      <slot name="description">
        {{ description }}
      </slot>
    </p>
  </div>
</template>
