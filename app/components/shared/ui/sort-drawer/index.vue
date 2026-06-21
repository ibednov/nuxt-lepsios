<script setup lang="ts">
interface SortOption {
  value: string
  label: string
  hint?: string
}

interface ComponentProps {
  title: string
  options: SortOption[]
}

defineProps<ComponentProps>()

const modelValue = defineModel<string>({ required: true })
</script>

<template>
    <container-modal-drawer :title="title">
        <template #trigger>
            <slot name="trigger" />
        </template>

        <template #default="{ close }">
            <shared-ui-radio-option-list
                v-model="modelValue"
                :options="options"
                radio-position="right"
                @update:model-value="close()"
            />
        </template>
    </container-modal-drawer>
</template>
