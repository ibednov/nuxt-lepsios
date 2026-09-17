<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'

export interface TagCloudItem {
  id: string
  label: string
  description?: string
}

const props = withDefaults(defineProps<{
  items: TagCloudItem[]
  moreLabel?: string
  gap?: number
  rowHeight?: number
}>(), {
  moreLabel: '',
  gap: 52,
  rowHeight: 48,
})

const ROTATIONS = [-2.5, 1.5, -1, 2, -2, 1, -1.5, 2.5] as const

const hovered = ref<string | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const positions = ref<Array<{ id: string, x: number, y: number, r: number }>>([])
const moreBadge = ref({ x: 0, y: 0, r: -1 })
const containerHeight = ref(320)

function estimateWidth(label: string) {
  const textW = [...label].reduce(
    (sum, ch) => sum + (ch.charCodeAt(0) > 127 ? 8.4 : 7.2),
    0,
  )
  return Math.min(220, Math.ceil(20 + textW))
}

function layout() {
  const width = containerRef.value?.clientWidth ?? 0
  if (!width) return

  const next: typeof positions.value = []
  let x = 0
  let y = 0
  let row = 0

  for (let i = 0; i < props.items.length; i++) {
    const item = props.items[i]!
    const tagWidth = estimateWidth(item.label)

    if (x > 0 && x + tagWidth > width) {
      row += 1
      x = 0
      y += props.rowHeight
    }

    next.push({
      id: item.id,
      x: x + (row % 3 === 1 ? 14 : row % 3 === 2 ? 6 : 0),
      y: y + (i % 2 ? 3 : 0),
      r: ROTATIONS[i % ROTATIONS.length]!,
    })

    x += tagWidth + props.gap
  }

  if (props.moreLabel) {
    const moreWidth = estimateWidth(props.moreLabel)
    if (x > 0 && x + moreWidth > width) {
      y += props.rowHeight
      x = 0
    }
    moreBadge.value = { x: x + 4, y: y + 2, r: -1 }
  }

  positions.value = next
  containerHeight.value = y + props.rowHeight + 12
}

const layoutById = computed(() =>
  Object.fromEntries(positions.value.map(pos => [pos.id, pos])),
)

const itemsSignature = computed(() =>
  props.items.map(i => `${i.id}:${i.label}`).join('|'),
)

const setContainerRef = (el: Element | null) => {
  containerRef.value = el instanceof HTMLElement ? el : null
  if (containerRef.value) {
    nextTick(layout)
  }
}

useResizeObserver(containerRef, () => layout())
</script>

<template>
  <div
    :key="itemsSignature"
    :ref="setContainerRef"
    class="relative w-full min-w-0 flex-1 transition-[height] duration-300"
    :style="{ height: `${containerHeight}px` }"
  >
    <button
      v-for="item in items"
      :key="item.id"
      type="button"
      class="absolute whitespace-nowrap border px-3 py-2 text-left font-mono text-sm font-medium leading-none transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
      :class="hovered === item.id
        ? 'z-30 max-w-none border-[color:var(--gp-accent,#2563eb)] bg-[color:var(--gp-ink,#09090b)] text-white shadow-[6px_6px_0_0_var(--gp-accent,#2563eb)]'
        : hovered
          ? 'z-0 border-[color:var(--gp-ink,#09090b)] bg-[color:var(--gp-paper,#fafafa)] text-[color:var(--gp-ink,#09090b)] opacity-35'
          : 'z-10 border-[color:var(--gp-ink,#09090b)] bg-[color:var(--gp-paper,#fafafa)] text-[color:var(--gp-ink,#09090b)] hover:border-[color:var(--gp-accent,#2563eb)]'"
      :style="{
        left: `${layoutById[item.id]?.x ?? 0}px`,
        top: `${layoutById[item.id]?.y ?? 0}px`,
        transform: hovered === item.id
          ? 'rotate(0deg) scale(1.06)'
          : hovered
            ? `scale(0.94) rotate(${layoutById[item.id]?.r ?? 0}deg) translate(${(layoutById[item.id]?.r ?? 0) > 0 ? 6 : -6}px, 4px)`
            : `rotate(${layoutById[item.id]?.r ?? 0}deg)`,
      }"
      @mouseenter="hovered = item.id"
      @mouseleave="hovered = null"
      @focus="hovered = item.id"
      @blur="hovered = null"
    >
      <span class="block">{{ item.label }}</span>
      <span
        v-if="hovered === item.id && item.description"
        class="mt-1.5 block max-w-[14rem] text-[11px] font-normal leading-snug whitespace-normal text-white/70"
      >
        {{ item.description }}
      </span>
    </button>

    <span
      v-if="moreLabel"
      class="absolute z-10 whitespace-nowrap border border-dashed border-[color:var(--gp-accent,#2563eb)] bg-[color:var(--gp-paper,#fafafa)] px-3 py-2 font-mono text-sm text-[color:var(--gp-accent,#2563eb)]"
      :style="{
        left: `${moreBadge.x}px`,
        top: `${moreBadge.y}px`,
        transform: `rotate(${moreBadge.r}deg)`,
      }"
    >
      {{ moreLabel }}
    </span>
  </div>
</template>
