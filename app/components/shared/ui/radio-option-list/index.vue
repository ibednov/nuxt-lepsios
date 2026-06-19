<script setup lang="ts">
interface RadioOption {
  value: string
  label: string
  hint?: string
}

defineProps<{
  options: RadioOption[]
}>()

const modelValue = defineModel<string>({ required: true })
</script>

<template>
    <div class="overflow-hidden rounded-2xl bg-accent-foreground/10">
        <button
            v-for="option in options"
            :key="option.value"
            type="button"
            class="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-accent-foreground/5"
            @click="modelValue = option.value"
        >
            <div class="flex min-w-0 items-center gap-3">
                <slot
                    name="leading"
                    :option="option"
                />
                <div class="min-w-0">
                    <div class="truncate">
                        {{ option.label }}
                    </div>
                    <div
                        v-if="option.hint"
                        class="truncate text-sm text-muted-foreground"
                    >
                        {{ option.hint }}
                    </div>
                </div>
            </div>

            <span
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2"
                :class="modelValue === option.value
                    ? 'border-accent-foreground'
                    : 'border-muted-foreground'"
            >
                <span
                    v-if="modelValue === option.value"
                    class="h-2.5 w-2.5 rounded-full bg-accent-foreground"
                />
            </span>
        </button>
    </div>
</template>
