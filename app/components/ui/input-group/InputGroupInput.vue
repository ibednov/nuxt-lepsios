<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Input } from '~/components/ui/input'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  modelValue?: string | number
  type?: string
  placeholder?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()
</script>

<template>
    <Input
        data-slot="input-group-control"
        :model-value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :class="cn(
            'flex-1 rounded-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-transparent ring-offset-transparent dark:bg-transparent',
            props.class,
        )"
        @update:model-value="emits('update:modelValue', $event)"
    />
</template>
