<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import type { TabsListProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { TabsList } from 'reka-ui'
import { nextTick, onMounted, onUnmounted, provide } from 'vue'
import { tabsListVariants } from '~/components/ui/tabs/variants'
import { cn } from '~/lib/utils'

type TabsListVariants = VariantProps<typeof tabsListVariants>

const props = defineProps<TabsListProps & {
  class?: HTMLAttributes['class']
  variant?: TabsListVariants['variant']
}>()

provide<TabsListVariants>('tabsList', {
  variant: props.variant,
})

const delegatedProps = reactiveOmit(props, 'class', 'variant')

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
            :data-variant="variant"
            v-bind="delegatedProps"
            :class="cn(tabsListVariants({ variant }), props.class)"
        >
            <slot />
        </TabsList>
    </div>
</template>
