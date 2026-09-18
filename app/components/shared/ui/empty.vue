<script setup lang="ts">
withDefaults(defineProps<{
  titleText?: string
  descriptionText?: string
  buttonText?: string
  variant?: 'default' | 'term' | 'alert'
}>(), {
  variant: 'term',
})

const emit = defineEmits(['buttonClick'])
</script>

<template>
  <Alert
    v-if="variant === 'alert'"
    class="border-dashed"
  >
    <AlertTitle v-if="titleText">
      {{ titleText }}
    </AlertTitle>
    <AlertDescription v-if="descriptionText">
      {{ descriptionText }}
    </AlertDescription>
    <Button
      v-if="buttonText"
      class="mt-3"
      variant="default"
      @click="emit('buttonClick')"
    >
      {{ buttonText }}
    </Button>
  </Alert>

  <div
    v-else
    class="flex min-h-80 flex-col items-center justify-center gap-6 px-4 py-16 text-center sm:min-h-96 sm:px-8"
    :class="variant === 'term'
      ? 'border border-[color:color-mix(in_srgb,var(--lepsios-term-accent,var(--home-accent))_22%,transparent)]'
      : 'rounded-xl border p-6'"
  >
    <div class="flex max-w-xl flex-col gap-3">
      <h2
        class="text-2xl font-semibold tracking-[-0.04em]"
        :class="variant === 'term' ? 'text-[color:color-mix(in_srgb,var(--lepsios-term-accent,var(--home-accent))_18%,var(--foreground))]' : ''"
      >
        {{ titleText }}
      </h2>
      <p class="text-sm leading-relaxed text-foreground/55 sm:text-base">
        {{ descriptionText }}
      </p>
    </div>
    <Button
      v-if="buttonText"
      :variant="variant === 'term' ? 'term' : 'default'"
      @click="emit('buttonClick')"
    >
      {{ buttonText }}
    </Button>
  </div>
</template>
