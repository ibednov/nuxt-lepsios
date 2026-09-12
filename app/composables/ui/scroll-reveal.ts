import type { Ref } from 'vue'

/**
 * Scroll-triggered reveal — respects prefers-reduced-motion.
 */
export function useScrollReveal(
  target: Ref<HTMLElement | null>,
  options: { rootMargin?: string; threshold?: number } = {},
) {
  const isVisible = ref(false)

  onMounted(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      isVisible.value = true
      return
    }

    const el = target.value
    if (!el)
      return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting)
          return
        isVisible.value = true
        observer.disconnect()
      },
      {
        rootMargin: options.rootMargin ?? '0px 0px -12% 0px',
        threshold: options.threshold ?? 0.12,
      },
    )

    observer.observe(el)
    onUnmounted(() => observer.disconnect())
  })

  return { isVisible }
}
