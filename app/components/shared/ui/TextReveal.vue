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

const typedElement = ref<HTMLElement>()
let typed: any = null

const initTyped = () => {
  if (typed) {
    typed.destroy()
  }

  import('typed.js').then((TypedModule) => {
    if (typedElement.value) {
      const Typed = TypedModule.default as TypedConstructor
      typed = new Typed(typedElement.value, {
        strings: props.words,
        typeSpeed: props.typeSpeed,
        loop: true,
        backDelay: 2000,
        backSpeed: 50,
      })
    }
  })
}

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      initTyped()
    }, 100)
  })
})

onUnmounted(() => {
  if (typed) {
    typed.destroy()
    typed = null
  }
})

watch(() => props.words, () => {
  initTyped()
}, { deep: true })
</script>

<template>
    <span
        ref="typedElement"
        :class="customClass"
    />
</template>
