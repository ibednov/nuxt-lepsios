<script setup lang="ts">
import type { TocDocument, TocLinkItem } from '~/interfaces/shared/ui/toc'

interface TocItem {
  id: string
  title: string
  level: number
  children?: TocItem[]
}

const state = defineModel<boolean>('state')
const data = defineModel<TocDocument>()

const { t } = useI18n()

const getHeaders = (): TocItem[] => {
  if (!data.value) {
    return []
  }

  const body = data.value.body as { toc?: { links?: TocLinkItem[] } } | undefined
  const toc = body?.toc

  if (!toc?.links || !Array.isArray(toc.links)) {
    return []
  }

  const convertLinks = (links: TocLinkItem[]): TocItem[] =>
    links
      .map(link => ({
        id: link.id || '',
        title: link.text || link.title || '',
        level: link.depth || 1,
        children:
          link.children && Array.isArray(link.children)
            ? convertLinks(link.children)
            : undefined,
      }))
      .filter(item => item.id && item.title)

  return convertLinks(toc.links)
}

const headers = computed(() => getHeaders())

const toggleState = () => {
  state.value = !state.value
}

const scrollToAnchor = (id: string) => {
  toggleState()
  if (import.meta.client) {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
</script>

<template>
  <div class="sticky top-8 self-start">
    <shared-ui-sheet-drawer
      v-if="data && headers.length > 0"
      v-model:open="state"
      :title="t('shared.toc.title')"
    >
      <template #trigger>
        <Button
          variant="ghost"
          class="w-fit h-fit p-2"
        >
          <Icon
            name="ri:list-check"
            size="20"
          />
        </Button>
      </template>
      <template #default>
        <div class="flex flex-col gap-1">
          <shared-ui-toc-item
            v-for="item in headers"
            :key="item.id"
            :item="item"
            @click="scrollToAnchor"
          />
        </div>
      </template>
    </shared-ui-sheet-drawer>
  </div>
</template>
