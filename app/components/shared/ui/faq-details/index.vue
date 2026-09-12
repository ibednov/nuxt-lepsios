<script setup lang="ts">
export interface FaqDetailsItem {
  question: string
  answer: string
}

defineProps<{
  items: FaqDetailsItem[]
}>()
</script>

<template>
  <div class="faq-details-list">
    <details
      v-for="item in items"
      :key="item.question"
      class="faq-details group"
    >
      <summary class="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-lg font-medium text-[var(--gp-ink,#f5f5fa)] [&::-webkit-details-marker]:hidden">
        <span class="min-w-0 flex-1">{{ item.question }}</span>
        <span
          class="relative flex size-6 shrink-0 items-center justify-center text-[var(--gp-accent,#a8a5ff)]"
          aria-hidden="true"
        >
          <Icon
            name="lucide:plus"
            class="absolute size-5 group-open:hidden"
          />
          <Icon
            name="lucide:minus"
            class="absolute hidden size-5 group-open:block"
          />
        </span>
      </summary>
      <p class="max-w-3xl pb-6 pr-6 text-base leading-relaxed text-[var(--gp-muted,#a4a7b9)]">
        {{ item.answer }}
      </p>
    </details>
  </div>
</template>
