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

const data = defineModel<FieldDataInterface | undefined>()
</script>

<template>
    <template v-if="data">
        <shared-ui-field-type-group
            v-if="data.type === 'group' && data.fields"
            v-model="data"
            :is-show-label="isShowLabel"
            @complete="$emit('complete')"
            @update:error="$emit('update:error', $event)"
        />

        <shared-ui-field-type-repeater
            v-else-if="data.type === 'repeater' && data.fields"
            v-model="data"
            :is-show-label="isShowLabel"
            @complete="$emit('complete')"
            @update:error="$emit('update:error', $event)"
        />

        <shared-ui-field-item
            v-else
            v-model="data"
            :is-show-label="isShowLabel"
            @complete="$emit('complete')"
            @update:error="$emit('update:error', $event)"
        />
    </template>
</template>
