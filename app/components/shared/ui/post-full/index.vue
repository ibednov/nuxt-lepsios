<script setup lang="ts">
export interface SharedUiPostFullMeta {
  image?: string
  date?: string
  author?: string
  category?: string | string[]
  tags?: string[]
  stack?: string[]
  github?: string
  demo?: string
}

export interface SharedUiPostFullData {
  title: string
  description?: string
  meta?: SharedUiPostFullMeta
}

const props = withDefaults(defineProps<{
  post: SharedUiPostFullData
  backLabel?: string
  /** term = landing hero; classic = compact article */
  variant?: 'term' | 'classic'
  locale?: string
  demoLabel?: string
  githubLabel?: string
  stackLabel?: string
}>(), {
  variant: 'term',
  locale: 'en-GB',
  demoLabel: 'Demo',
  githubLabel: 'GitHub',
  stackLabel: 'Stack',
})

const emit = defineEmits<{
  back: []
}>()

const dateLabel = computed(() => {
  const raw = props.post.meta?.date
  if (!raw)
    return ''
  return new Date(raw).toLocaleDateString(props.locale)
})

const categories = computed(() => {
  const cat = props.post.meta?.category
  if (!cat)
    return [] as string[]
  return Array.isArray(cat) ? cat : [cat]
})

const stack = computed(() => props.post.meta?.stack || [])
const tags = computed(() => props.post.meta?.tags || [])
</script>

<template>
  <!-- term: landing hero layout (blog + lab) -->
  <article
    v-if="variant === 'term'"
    class="term-shell flex flex-col gap-10 px-3 py-8 sm:gap-12 sm:px-4 sm:py-12 md:px-8"
  >
    <header class="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
      <div class="flex flex-col gap-5 lg:col-span-7">
        <button
          v-if="backLabel"
          type="button"
          class="term-kicker mb-0 w-fit text-left"
          @click="emit('back')"
        >
          ← {{ backLabel }}
        </button>

        <h1 class="term-section-title max-w-3xl">
          {{ post.title }}
        </h1>

        <div
          class="term-rule max-w-xs"
          aria-hidden="true"
        />

        <p
          v-if="post.description"
          class="max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg"
        >
          {{ post.description }}
        </p>

        <p class="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
          <span v-if="dateLabel">{{ dateLabel }}</span>
          <span
            v-if="dateLabel && categories.length"
            class="mx-2 text-[color:var(--lepsios-term-accent,var(--home-accent))]"
          >·</span>
          <span v-if="categories.length">{{ categories.join(' / ') }}</span>
          <template v-if="post.meta?.author">
            <span
              v-if="dateLabel || categories.length"
              class="mx-2 text-[color:var(--lepsios-term-accent,var(--home-accent))]"
            >·</span>
            <span>{{ post.meta.author }}</span>
          </template>
        </p>

        <div
          v-if="post.meta?.demo || post.meta?.github"
          class="flex flex-wrap gap-3 pt-1"
        >
          <a
            v-if="post.meta?.demo"
            class="term-cta"
            :href="String(post.meta.demo)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{{ demoLabel }}</span>
          </a>
          <a
            v-if="post.meta?.github"
            class="term-cta"
            :href="String(post.meta.github)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{{ githubLabel }}</span>
          </a>
        </div>
      </div>

      <aside class="lg:col-span-5">
        <div
          v-if="post.meta?.image"
          class="term-card overflow-hidden border border-foreground/15 bg-background/40"
        >
          <img
            :src="String(post.meta.image)"
            :alt="post.title"
            class="aspect-[16/10] w-full object-cover object-top"
          >
        </div>
        <div
          v-else
          class="term-card flex min-h-48 items-center justify-center border border-dashed border-foreground/20 bg-background/30 p-6 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/35"
        >
          {{ post.title }}
        </div>
      </aside>
    </header>

    <section
      v-if="stack.length"
      class="flex flex-col gap-4"
    >
      <p class="term-kicker">
        {{ stackLabel }}
      </p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tech in stack"
          :key="tech"
          class="term-chip"
        >
          {{ tech }}
        </span>
      </div>
    </section>

    <section
      v-if="tags.length"
      class="flex flex-wrap gap-2"
    >
      <span
        v-for="tag in tags"
        :key="tag"
        class="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--lepsios-term-accent,var(--home-accent))]"
      >
        #{{ tag }}
      </span>
    </section>

    <div
      class="term-rule"
      aria-hidden="true"
    />

    <section class="min-w-0 max-w-3xl">
      <slot />
    </section>
  </article>

  <!-- classic: compact column -->
  <article
    v-else
    class="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-6 px-3 py-8 sm:px-4"
  >
    <button
      v-if="backLabel"
      type="button"
      class="term-kicker w-fit text-left"
      @click="emit('back')"
    >
      ← {{ backLabel }}
    </button>
    <h1 class="text-2xl font-bold md:text-4xl">
      {{ post.title }}
    </h1>
    <p
      v-if="post.description"
      class="text-xl text-muted-foreground"
    >
      {{ post.description }}
    </p>
    <p class="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
      <span v-if="dateLabel">{{ dateLabel }}</span>
      <span
        v-if="dateLabel && categories.length"
        class="mx-2"
      >·</span>
      <span v-if="categories.length">{{ categories.join(' / ') }}</span>
    </p>
    <div
      v-if="post.meta?.image"
      class="flex justify-center"
    >
      <img
        :src="String(post.meta.image)"
        :alt="post.title"
        class="h-auto max-w-full rounded-lg shadow-lg"
      >
    </div>
    <slot />
  </article>
</template>
