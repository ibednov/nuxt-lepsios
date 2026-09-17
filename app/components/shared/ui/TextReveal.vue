<script setup lang="ts">
interface Props {
  words: string[]
  typeSpeed?: number
  customClass?: string
}

type TypedConstructor = new (element: Element, options: any) => any

const props = withDefaults(defineProps<Props>(), {
  typeSpeed: 75,
})

const wordsKey = computed(() => props.words.join('\0'))
let typed: any = null

const destroyTyped = () => {
  if (typed) {
    typed.destroy()
    typed = null
  }
}

const bindTypedEl = (el: Element | null) => {
  destroyTyped()
  if (!(el instanceof HTMLElement)) {
    return
  }
  import('typed.js').then((TypedModule) => {
    if (!(el.isConnected)) {
      return
    }
    const Typed = TypedModule.default as TypedConstructor
    typed = new Typed(el, {
      strings: props.words,
      typeSpeed: props.typeSpeed,
      loop: true,
      backDelay: 2000,
      backSpeed: 50,
    })
  })
}

onUnmounted(() => {
  destroyTyped()
})
</script>

<template>
    <span
        :key="wordsKey"
        :ref="(el) => bindTypedEl(el as Element | null)"
        :class="customClass"
    />
</template>
