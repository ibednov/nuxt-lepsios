<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '~/lib/utils'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    contentClass?: HTMLAttributes['class']
    /**
     * Рябь/искажение фона (backdrop-filter + SVG). По умолчанию выкл. —
     * на фото и контрастном UI часто выглядит грязно.
     */
    distort?: boolean
    /** Сила feDisplacementMap, только при distort */
    displacementScale?: number
    backdropBlurPx?: number
    /** Насыщенность фона под стеклом (как у iOS) */
    backdropSaturate?: number
  }>(),
  {
    distort: false,
    displacementScale: 12,
    backdropBlurPx: 16,
    backdropSaturate: 1.35,
  },
)

const rawId = useId()
const filterId = `container-glass-${rawId.replace(/[^\w-]/g, '')}`

const backdropStyle = computed(() => {
  const base = `blur(${props.backdropBlurPx}px) saturate(${props.backdropSaturate})`
  if (!props.distort) {
    return {
      WebkitBackdropFilter: base,
      backdropFilter: base,
    }
  }
  return {
    WebkitBackdropFilter: `${base} url(#${filterId})`,
    backdropFilter: `${base} url(#${filterId})`,
  }
})
</script>

<template>
    <div
        :class="
            cn(
                'relative flex items-center justify-center rounded-3xl',
                'border border-white/35',
                'shadow-[0_10px_40px_-12px_rgb(15_23_42/18%),0_0_0_1px_rgb(255_255_255/12%)_inset]',
                'dark:border-white/12 dark:shadow-[0_12px_40px_-12px_rgb(0_0_0/40%),0_0_0_1px_rgb(255_255_255/6%)_inset]',
                props.class,
            )
        "
    >
        <svg
            v-if="props.distort"
            class="pointer-events-none absolute size-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <filter
                :id="filterId"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
            >
                <feTurbulence
                    type="fractalNoise"
                    base-frequency="0.008 0.008"
                    num-octaves="2"
                    seed="92"
                    result="noise"
                />
                <feGaussianBlur
                    in="noise"
                    std-deviation="0.06"
                    result="blur"
                />
                <feDisplacementMap
                    in="SourceGraphic"
                    in2="blur"
                    :scale="props.displacementScale"
                    x-channel-selector="R"
                    y-channel-selector="G"
                />
            </filter>
        </svg>

        <div
            class="absolute inset-0 z-[-1] isolate overflow-hidden rounded-[inherit] bg-white/28 dark:bg-zinc-900/32"
            :style="backdropStyle"
        />

        <div
            class="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] shadow-[inset_2px_2px_0_-2px_rgb(255_255_255/55%),inset_0_0_3px_1px_rgb(255_255_255/45%)] dark:shadow-[inset_2px_2px_0_-2px_rgb(255_255_255/10%),inset_0_0_3px_1px_rgb(255_255_255/8%)]"
        />

        <div :class="cn('relative z-0', props.contentClass)">
            <slot />
        </div>
    </div>
</template>
