<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

export type FieldInputTextVariant = 'default' | 'drawer' | 'inline'

interface Props {
  variant?: FieldInputTextVariant
  label?: string
  placeholder?: string
  type?: string
  maxlength?: number
  inputClass?: HTMLAttributes['class']
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  type: 'text',
})

const modelValue = defineModel<string>({ required: true })
</script>

<template>
    <div
        v-if="variant === 'drawer'"
        class="flex flex-col gap-2"
    >
        <Label
            v-if="label"
            class="text-sm text-tertiary"
        >
            {{ label }}
        </Label>
        <Input
            v-model="modelValue"
            :type="type"
            :placeholder="placeholder"
            :maxlength="maxlength"
            :disabled="disabled"
            :class="cn('h-12 rounded-2xl border-0 bg-lepsios-field px-4', inputClass)"
        />
    </div>

    <Input
        v-else
        v-model="modelValue"
        :type="type"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :disabled="disabled"
        :class="cn(
            variant === 'inline'
                ? 'h-12 rounded-full border-0 bg-lepsios-field px-4'
                : undefined,
            inputClass,
        )"
    />
</template>
