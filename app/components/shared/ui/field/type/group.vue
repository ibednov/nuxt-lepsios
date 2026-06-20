<script setup lang="ts">
import type { FieldDataInterface } from '~/interfaces/common/field'

interface Props {
  isShowLabel?: boolean
}

withDefaults(defineProps<Props>(), {
  isShowLabel: true,
})

defineEmits<{
  'complete': []
  'update:error': [error: string | null]
}>()

const data = defineModel<FieldDataInterface>()
</script>

<template>
    <shared-ui-field-group
        v-if="data?.appearance === 'drawer'"
        :class="data.class"
    >
        <template
            v-for="(field, index) in data.fields"
            :key="field.key || index"
        >
            <shared-ui-field-item
                v-model="data.fields![index]"
                :is-show-label="isShowLabel"
                @complete="$emit('complete')"
                @update:error="$emit('update:error', $event)"
            />

            <div
                v-if="index < data.fields!.length - 1"
                class="mx-4 h-px bg-border/40"
            />
        </template>
    </shared-ui-field-group>

    <div
        v-else
        class="flex flex-col gap-3"
        :class="data?.class"
    >
        <Label
            v-if="isShowLabel && data?.label"
            class="!text-ms font-medium"
        >
            {{ data.label }}
        </Label>
        <div :class="data?.fieldsContainerClass || 'flex flex-col gap-4'">
            <shared-ui-field-item
                v-for="(field, index) in data?.fields"
                :key="field.key || index"
                v-model="data!.fields![index]"
                :is-show-label="isShowLabel"
                @complete="$emit('complete')"
                @update:error="$emit('update:error', $event)"
            />
        </div>
    </div>
</template>
