<script setup lang="ts">
import type { FieldDataInterface, FieldOption } from '~/interfaces/common/field'

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

const repeaterItems = computed(() => {
  if (data.value?.type === 'repeater') {
    return Array.isArray(data.value.value) ? [...data.value.value] : []
  }
  return []
})

const repeaterItemFields = computed(() => {
  if (data.value?.type !== 'repeater' || !data.value.fields) {
    return []
  }

  const items = repeaterItems.value
  return items.map((item: Record<string, unknown>) =>
    data.value!.fields!.map((field) => {
      const fieldKey = field.key
      if (!fieldKey) {
        return { ...field }
      }

      let value: unknown

      if (field.type === 'tags') {
        value = Array.isArray(item[fieldKey]) ? item[fieldKey] : []
      }
      else if (field.type === 'repeater') {
        value = Array.isArray(item[fieldKey]) ? item[fieldKey] : []
        return { ...field, value, type: 'repeater' as const }
      }
      else if (field.valueType === 'number' || field.type === 'price') {
        value = item[fieldKey] ?? (field.valueType === 'number' ? 0 : null)
        return {
          ...field,
          value,
          ...(field.type === 'price' ? { currency: (item.currency as string | null) ?? null } : {}),
        }
      }
      else {
        value = item[fieldKey] ?? ''
      }

      return { ...field, value }
    }),
  )
})

const isDrawerRepeater = computed(() =>
  data.value?.type === 'repeater' && data.value.appearance === 'drawer',
)

const getOptionLabel = (
  options: FieldOption[] | undefined,
  value: string | number | null | undefined,
  fallback = '',
) => options?.find(option => option.value === value)?.label ?? fallback

const createRepeaterItem = () => ({
  ...(data.value?.defaultItem || {}),
})

const shouldShowField = (itemIndex: number, fieldKey: string | undefined) => {
  if (fieldKey !== 'variant') {
    return true
  }

  const item = repeaterItems.value[itemIndex]
  return !item?.type || item.type === 'physical'
}

const addRepeaterItem = () => {
  if (data.value?.type !== 'repeater' || !data.value.fields) {
    return
  }

  const newItem = createRepeaterItem()

  if (!data.value.defaultItem) {
    data.value.fields.forEach((field) => {
      if (!field.key) {
        return
      }

      if (field.type === 'tags' || field.type === 'repeater') {
        newItem[field.key] = []
      }
      else if (field.valueType === 'number') {
        newItem[field.key] = 0
      }
      else if (field.type === 'price' || field.key === 'variant') {
        newItem[field.key] = null
      }
      else {
        newItem[field.key] = ''
      }
    })
  }

  const currentItems = Array.isArray(data.value.value) ? data.value.value : []
  data.value = {
    ...data.value,
    value: [...currentItems, newItem],
  }
}

const removeRepeaterItem = (index: number) => {
  if (data.value?.type !== 'repeater' || !Array.isArray(data.value.value)) {
    return
  }

  if (isDrawerRepeater.value && data.value.value.length <= 1) {
    data.value = {
      ...data.value,
      value: [createRepeaterItem()],
    }
    return
  }

  const newItems = [...data.value.value]
  newItems.splice(index, 1)
  data.value = {
    ...data.value,
    value: newItems,
  }
}

const updateRepeaterField = (itemIndex: number, field: FieldDataInterface, val: unknown) => {
  const itemIdx = Number(itemIndex)
  const fieldKey = field.key

  if (!data.value || !fieldKey || !Array.isArray(data.value.value)) {
    return
  }

  let newValue: unknown
  if (val && typeof val === 'object' && 'value' in val) {
    if (field.type === 'repeater' || field.type === 'tags') {
      newValue = Array.isArray((val as { value: unknown }).value) ? (val as { value: unknown }).value : []
    }
    else {
      newValue = (val as { value: unknown }).value
    }
  }
  else {
    newValue = val
  }

  const currentItems = [...data.value.value]
  if (!currentItems[itemIdx]) {
    currentItems[itemIdx] = createRepeaterItem()
  }

  currentItems[itemIdx] = {
    ...currentItems[itemIdx],
    [fieldKey]: newValue,
    ...(field.type === 'price' && val && typeof val === 'object' && 'currency' in val
      ? { currency: (val as { currency?: string | null }).currency ?? null }
      : {}),
  }

  if (fieldKey === 'type' && newValue !== 'physical') {
    currentItems[itemIdx].variant = null
  }

  data.value = {
    ...data.value,
    value: currentItems,
  }
}

const updateDrawerRepeaterVariant = (itemIndex: number, field: FieldDataInterface, variant: string | number, close: () => void) => {
  updateRepeaterField(itemIndex, field, variant)
  close()
}

const getDrawerVariantLabel = (itemIndex: number, field: FieldDataInterface) => {
  const item = repeaterItems.value[itemIndex]
  return getOptionLabel(field.options, item?.[field.key!], field.placeholder)
}

const getItemTitle = (label: string | undefined, index: number) => `${label || 'Элемент'} ${index + 1}`
</script>

<template>
    <shared-ui-field-type-repeater-drawer
        v-if="isDrawerRepeater"
        v-model="data"
        :is-show-label="isShowLabel"
        :items="repeaterItems"
        :should-show-field="shouldShowField"
        :get-variant-label="getDrawerVariantLabel"
        @add-item="addRepeaterItem"
        @remove-item="removeRepeaterItem"
        @update-variant="updateDrawerRepeaterVariant"
        @update-value="(itemIndex, field, value) => updateRepeaterField(itemIndex, field, value)"
    />

    <shared-ui-field-type-repeater-card
        v-else
        v-model="data"
        :is-show-label="isShowLabel"
        :items="repeaterItems"
        :item-fields="repeaterItemFields"
        :should-show-field="shouldShowField"
        :get-item-title="getItemTitle"
        @add-item="addRepeaterItem"
        @remove-item="removeRepeaterItem"
        @update-field="updateRepeaterField"
        @complete="$emit('complete')"
        @update:error="$emit('update:error', $event)"
    />
</template>
