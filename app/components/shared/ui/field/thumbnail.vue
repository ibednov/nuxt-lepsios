<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { FieldThumbnailOption } from '~/interfaces/common/field'
import { cn } from '~/lib/utils'

defineProps<{
  label?: string
  options: FieldThumbnailOption[]
  disabled?: boolean
}>()

const modelValue = defineModel<string>({ required: true })
</script>

<template>
    <div class="flex flex-col gap-3">
        <Label
            v-if="label"
            class="text-sm text-tertiary"
        >
            {{ label }}
        </Label>

        <div
            class="flex gap-2 overflow-x-auto pb-1"
            :class="{ 'pointer-events-none opacity-50': disabled }"
        >
            <button
                v-for="option in options"
                :key="option.id"
                type="button"
                class="size-16 shrink-0 overflow-hidden rounded-xl transition-all"
                :class="modelValue === option.id
                    ? 'ring-2 ring-accent-foreground ring-offset-2 ring-offset-background'
                    : 'opacity-80'"
                :disabled="disabled"
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
