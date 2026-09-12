<script setup lang="ts">
export interface FaqDetailsItem {
  question: string
  answer: string
}

withDefaults(defineProps<{
  items: FaqDetailsItem[]
  color?: 'white' | 'dark'
  numbered?: boolean
}>(), {
  color: 'dark',
  numbered: false,
})
</script>

<template>
  <div
    class="faq-details-list divide-y border"
    :class="color === 'white'
      ? 'divide-[color:var(--gp-ink,#09090b)] border-[color:var(--gp-ink,#09090b)] bg-[color:var(--gp-paper,#fafafa)]'
      : 'divide-[color:var(--gp-line,#282b37)] border-[color:var(--gp-line,#282b37)]'"
  >
    <details
      v-for="(item, index) in items"
      :key="item.question"
      class="faq-details group"
      :class="color === 'white' ? 'bg-[color:var(--gp-paper,#fafafa)] open:bg-[color:var(--gp-mist,#f0f0ee)]' : ''"
    >
      <summary
        class="flex min-h-[4.25rem] cursor-pointer list-none items-center gap-4 px-6 py-5 text-left text-base font-medium sm:gap-5 sm:px-8 sm:py-6 sm:text-lg [&::-webkit-details-marker]:hidden"
        :class="color === 'white'
          ? 'text-[color:var(--gp-ink,#09090b)]'
          : 'justify-between text-lg text-[var(--gp-ink,#f5f5fa)]'"
      >
        <span
          v-if="numbered"
          class="w-10 shrink-0 font-mono text-[11px] tabular-nums text-[color:var(--gp-muted,#52525b)] sm:w-12"
        >
          ({{ String(index + 1).padStart(2, '0') }})
        </span>
        <span class="min-w-0 flex-1 pr-3">{{ item.question }}</span>
        <span
          class="relative inline-flex size-7 shrink-0 items-center justify-center text-[color:var(--gp-accent,#2563eb)]"
          aria-hidden="true"
        >
          <Icon name="lucide:plus" class="absolute size-5 opacity-100 transition-opacity group-open:opacity-0" />
          <Icon name="lucide:minus" class="absolute size-5 opacity-0 transition-opacity group-open:opacity-100" />
        </span>
      </summary>
      <p
        class="pb-6 text-sm leading-relaxed sm:text-base"
        :class="color === 'white'
          ? 'border-t border-[color:var(--gp-line,#e4e4e0)] px-6 pt-4 text-[color:var(--gp-muted,#52525b)] sm:px-8 sm:pl-[4.5rem]'
          : 'max-w-3xl px-6 pr-8 text-[var(--gp-muted,#a4a7b9)] sm:px-8'"
      >
        {{ item.answer }}
      </p>
    </details>
  </div>
</template>
