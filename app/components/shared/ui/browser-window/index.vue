<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

export type BrowserWindowOs = 'macos' | 'windows'
export type BrowserWindowTone = 'inherit' | 'light'
export type BrowserWindowAspect = 'auto' | '16/9' | '4/3'

const props = withDefaults(defineProps<{
  os?: BrowserWindowOs
  url?: string
  expanded?: boolean
  /** light = always light chrome (demo), ignore page dark mode */
  tone?: BrowserWindowTone
  /** lock frame height via aspect-ratio (ignored when expanded) */
  aspectRatio?: BrowserWindowAspect
  /** scroll content inside the window body */
  scrollable?: boolean
  class?: HTMLAttributes['class']
}>(), {
  os: 'macos',
  url: '',
  expanded: false,
  tone: 'inherit',
  aspectRatio: 'auto',
  scrollable: false,
})

const emit = defineEmits<{
  close: []
  minimize: []
  maximize: []
}>()

const isMac = computed(() => props.os === 'macos')
const isLight = computed(() => props.tone === 'light')

const aspectClass = computed(() => {
  if (props.expanded || props.aspectRatio === 'auto') return ''
  if (props.aspectRatio === '16/9') return 'aspect-[16/9]'
  if (props.aspectRatio === '4/3') return 'aspect-[4/3]'
  return ''
})
</script>

<template>
  <div
    class="flex min-h-0 w-full flex-col overflow-hidden border"
    :class="[
      isLight
        ? 'border-[#09090b] bg-[#fafafa] text-[#09090b]'
        : 'border-[color:var(--gp-ink,#09090b)] bg-[color:var(--gp-paper,#fafafa)] text-[color:var(--gp-ink,#09090b)]',
      expanded
        ? 'h-full shadow-[0_24px_80px_rgba(0,0,0,0.55)]'
        : isLight
          ? 'shadow-[8px_8px_0_#2563eb] sm:shadow-[12px_12px_0_#2563eb]'
          : 'shadow-[8px_8px_0_var(--gp-accent,#2563eb)] sm:shadow-[12px_12px_0_var(--gp-accent,#2563eb)]',
      aspectClass,
      props.class,
    ]"
  >
    <div
      class="flex h-11 shrink-0 items-center gap-2 border-b px-3"
      :class="[
        isMac ? '' : 'flex-row-reverse',
        isLight ? 'border-[#e4e4e0] bg-[#f0f0ee]' : 'border-[color:var(--gp-line,#e4e4e0)] bg-[color:var(--gp-mist,#f0f0ee)]',
      ]"
    >
      <div class="flex shrink-0 gap-1.5" :class="isMac ? '' : 'order-3'">
        <button type="button" class="size-3 rounded-full bg-[#ff5f57] transition hover:ring-2 hover:ring-[#ff5f57]/40" aria-label="close" @click="emit('close')" />
        <button type="button" class="size-3 rounded-full bg-[#febc2e] transition hover:ring-2 hover:ring-[#febc2e]/40" aria-label="minimize" @click="emit('minimize')" />
        <button type="button" class="size-3 rounded-full bg-[#28c840] transition hover:ring-2 hover:ring-[#28c840]/50" aria-label="maximize" @click="emit('maximize')" />
      </div>
      <div class="flex min-w-0 flex-1 items-end gap-1 self-stretch pt-2" :class="isMac ? '' : 'order-2 justify-end'">
        <slot name="tabs" />
      </div>
    </div>

    <div
      v-if="url || $slots.url"
      class="flex h-8 shrink-0 items-center gap-2 border-b px-3 font-mono text-[10px]"
      :class="isLight
        ? 'border-[#e4e4e0] bg-[#fafafa] text-[#52525b]'
        : 'border-[color:var(--gp-line,#e4e4e0)] bg-[color:var(--gp-paper,#fafafa)] text-[color:var(--gp-muted,#52525b)]'"
    >
      <slot name="url">
        <Icon name="lucide:lock" class="size-3 shrink-0" />
        <span class="truncate">{{ url }}</span>
      </slot>
    </div>

    <div
      class="flex min-h-0 min-w-0 flex-1 flex-col"
      :class="[
        isLight ? 'bg-[#fafafa] text-[#09090b]' : 'bg-[color:var(--gp-paper,#fafafa)]',
        scrollable ? 'overflow-auto' : 'overflow-hidden',
      ]"
    >
      <slot />
    </div>
  </div>
</template>
