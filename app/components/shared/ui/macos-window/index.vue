<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  dockLabel?: string
  maximized?: boolean
  minimized?: boolean
}>(), {
  title: '~',
  dockLabel: '~',
  maximized: false,
  minimized: false,
})

const emit = defineEmits<{
  close: []
  minimize: []
  restore: []
  toggleMax: []
}>()

const { t } = useI18n()

const onKey = (e: KeyboardEvent) => {
  if (!(e.metaKey || e.ctrlKey))
    return
  if (e.key === 'w' || e.key === 'W') {
    e.preventDefault()
    emit('close')
  }
  if (e.key === 'm' || e.key === 'M') {
    e.preventDefault()
    emit('minimize')
  }
  if (e.key === 'f' && e.ctrlKey) {
    e.preventDefault()
    emit('toggleMax')
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <button
    v-if="props.minimized"
    type="button"
    class="term-dock relative z-10"
    :aria-label="t('global.term.restore')"
    @click="emit('restore')"
  >
    <span
      class="flex gap-1.5"
      aria-hidden="true"
    >
      <i class="size-2 rounded-full bg-[#ff5f56]" />
      <i class="size-2 rounded-full bg-[#ffbd2e]" />
      <i class="size-2 rounded-full bg-[#27c93f]" />
    </span>
    {{ props.dockLabel }}
  </button>

  <div
    v-show="!props.minimized"
    class="term-window relative z-10 flex min-h-0 w-full flex-1 flex-col overflow-hidden"
  >
    <header
      class="term-chrome flex shrink-0 items-center gap-2 px-2 py-2 sm:gap-3 sm:px-4 sm:py-2.5"
      @dblclick="emit('toggleMax')"
    >
      <div
        class="term-lights flex gap-1.5"
        @dblclick.stop
      >
        <button
          type="button"
          class="term-light term-light-close"
          :aria-label="t('global.term.close')"
          @click.stop="emit('close')"
        />
        <button
          type="button"
          class="term-light term-light-min"
          :aria-label="t('global.term.min')"
          @click.stop="emit('minimize')"
        />
        <button
          type="button"
          class="term-light term-light-max"
          :aria-label="t('global.term.max')"
          @click.stop="emit('toggleMax')"
        />
      </div>
      <p class="min-w-0 flex-1 truncate text-center text-[10px] tracking-[0.12em] text-[color:var(--lepsios-term-accent)] sm:text-xs sm:tracking-[0.14em]">
        <slot name="title">{{ props.title }}</slot>
      </p>
      <div class="term-toolbar flex shrink-0 items-center gap-1 sm:gap-2">
        <slot name="toolbar" />
      </div>
    </header>

    <div class="term-body min-h-0 flex-1 overflow-y-auto">
      <slot />
    </div>

    <slot name="prompt" />
  </div>
</template>
