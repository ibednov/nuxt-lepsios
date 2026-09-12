<script setup lang="ts">
export type BrutalCardColor = 'white' | 'dark'

withDefaults(defineProps<{
  color?: BrutalCardColor
  active?: boolean
  index?: string
  tag?: string
  title?: string
  subtitle?: string
  description?: string
  items?: string[]
}>(), {
  color: 'white',
  active: false,
  items: () => [],
})
</script>

<template>
  <article
    class="group flex h-full flex-col border transition duration-200"
    :class="[
      color === 'dark'
        ? 'bg-[color:var(--gp-panel,#141414)] text-white'
        : 'bg-[color:var(--gp-paper,#fafafa)] text-[color:var(--gp-ink,#09090b)]',
      active
        ? color === 'dark'
          ? 'border-[color:var(--gp-accent,#2563eb)] shadow-[8px_8px_0_0_var(--gp-accent,#2563eb)]'
          : 'border-[color:var(--gp-accent,#2563eb)] shadow-[8px_8px_0_0_var(--gp-accent,#2563eb)]'
        : color === 'dark'
          ? 'border-white/15'
          : 'border-[color:var(--gp-ink,#09090b)] shadow-[4px_4px_0_0_var(--gp-line,#e4e4e0)] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--gp-accent,#2563eb)]',
    ]"
  >
    <slot name="media" />

    <div class="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
      <div v-if="index || tag || $slots.meta" class="mb-3 flex items-start justify-between gap-3">
        <slot name="meta">
          <span
            v-if="index"
            class="font-mono text-[11px] uppercase tracking-[0.16em]"
            :class="active || color === 'white' ? 'text-[color:var(--gp-accent,#2563eb)]' : 'text-white/40'"
          >
            {{ index }}
          </span>
          <span
            v-if="tag"
            class="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em]"
            :class="color === 'dark' ? 'text-white/40' : 'text-[color:var(--gp-accent,#2563eb)]'"
          >
            {{ tag }}
          </span>
        </slot>
      </div>

      <slot name="title">
        <h3
          v-if="title"
          class="font-display text-xl font-bold sm:text-2xl"
          :class="color === 'dark' ? 'text-white' : 'text-[color:var(--gp-ink,#09090b)]'"
        >
          {{ title }}
        </h3>
      </slot>

      <p
        v-if="subtitle"
        class="mt-2 font-display text-2xl font-bold sm:text-3xl"
        :class="color === 'dark' ? 'text-white' : 'text-[color:var(--gp-ink,#09090b)]'"
      >
        {{ subtitle }}
      </p>

      <p
        v-if="description"
        class="mt-3 text-sm sm:text-base"
        :class="color === 'dark' ? 'text-white/55' : 'text-[color:var(--gp-muted,#52525b)]'"
      >
        {{ description }}
      </p>

      <ul v-if="items?.length" class="mt-4 flex flex-1 flex-col gap-2">
        <li
          v-for="item in items"
          :key="item"
          class="flex gap-2.5 text-sm"
          :class="color === 'dark' ? 'text-white/75' : 'text-[color:var(--gp-ink,#09090b)]/80'"
        >
          <Icon name="lucide:check" class="mt-0.5 size-4 shrink-0 text-[color:var(--gp-accent,#2563eb)]" />
          <span>{{ item }}</span>
        </li>
      </ul>

      <div v-if="$slots.default" class="mt-auto pt-5">
        <slot />
      </div>
    </div>
  </article>
</template>
