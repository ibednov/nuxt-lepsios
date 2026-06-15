<script setup lang="ts">
import { TabsList, type TabsListProps } from 'reka-ui'
import { computed, type HTMLAttributes, nextTick, onMounted, onUnmounted } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<TabsListProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const containerRef = ref<HTMLElement | null>(null)

function scrollToActiveTab() {
  nextTick(() => {
    if (!containerRef.value)
      return

    const activeTab = containerRef.value.querySelector('[data-state="active"]') as HTMLElement
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  })
}

// Отслеживаем изменения активной вкладки через MutationObserver
onMounted(() => {
  if (!containerRef.value)
    return

  const observer = new MutationObserver(() => {
    scrollToActiveTab()
  })

  observer.observe(containerRef.value, {
    attributes: true,
    attributeFilter: ['data-state'],
    subtree: true,
  })

  onUnmounted(() => {
    observer.disconnect()
  })

  // Прокручиваем при первой загрузке, если есть активная вкладка
  scrollToActiveTab()
})
</script>

<template>
    <div
        ref="containerRef"
        class="overflow-x-auto"
    >
        <TabsList
            data-slot="tabs-list"
            v-bind="delegatedProps"
            :class="cn(
                'bg-muted text-muted-foreground min-w-fit inline-flex h-9 w-full items-center justify-start rounded-lg p-[3px]',
                props.class,
            )"
        >
            <slot />
        </TabsList>
    </div>
</template>
