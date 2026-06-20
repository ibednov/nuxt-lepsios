<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { FieldThumbnailOption } from '~/interfaces/common/field'
import { cn } from '~/lib/utils'

defineProps<{
  label?: string
  options: FieldThumbnailOption[]
}>()

const modelValue = defineModel<string>({ required: true })
</script>

<template>
    <div class="flex flex-col gap-3">
        <Label
            v-if="label"
            class="text-sm text-muted-foreground"
        >
            {{ label }}
        </Label>

        <div class="flex gap-2 overflow-x-auto pb-1">
            <button
                v-for="option in options"
                :key="option.id"
                type="button"
                class="size-16 shrink-0 overflow-hidden rounded-xl transition-all"
                :class="modelValue === option.id
                    ? 'ring-2 ring-accent-foreground ring-offset-2 ring-offset-background'
                    : 'opacity-80'"
                @click="modelValue = option.id"
            >
                <div
                    class="size-full"
                    :class="cn(option.class)"
                />
            </button>
        </div>
    </div>
</template>
