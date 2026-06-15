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
  return items.map((item: any) =>
    data.value!.fields!.map((field: any) => {
      const fieldKey = field.key
      let value: any

      if (field.type === 'tags') {
        value = Array.isArray(item[fieldKey]) ? item[fieldKey] : []
      }
      else if (field.type === 'repeater') {
        value = Array.isArray(item[fieldKey]) ? item[fieldKey] : []
        return { ...field, value, type: 'repeater' }
      }
      else if (field.valueType === 'number' || field.type === 'price') {
        value = item[fieldKey] ?? (field.valueType === 'number' ? 0 : null)
        return {
          ...field,
          value,
          ...(field.type === 'price' ? { currency: item.currency ?? null } : {}),
        }
      }
      else {
        value = item[fieldKey] ?? ''
      }

      return { ...field, value }
    }),
  )
})

const shouldShowField = (itemIndex: number, fieldKey: string | undefined) => {
  if (fieldKey !== 'variant') {
    return true
  }

  const item = repeaterItems.value[itemIndex]
  return item?.type === 'physical'
}

const addRepeaterItem = () => {
  if (data.value?.type === 'repeater' && data.value.fields) {
    const newItem: any = {}
    data.value.fields.forEach((field) => {
      if (field.key) {
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
      }
    })

    if (data.value.key === 'delivery_points' && !newItem.type) {
      newItem.type = 'physical'
    }

    if (!data.value) {
      return
    }

    const currentItems = Array.isArray(data.value.value) ? data.value.value : []
    data.value = {
      ...data.value,
      value: [...currentItems, newItem],
    }
  }
}

const removeRepeaterItem = (index: number) => {
  if (data.value?.type === 'repeater' && Array.isArray(data.value.value)) {
    const newItems = [...data.value.value]
    newItems.splice(index, 1)
    data.value = {
      ...data.value,
      value: newItems,
    }
  }
}

const updateRepeaterField = (itemIndex: number, field: any, val: any) => {
  const itemIdx = Number(itemIndex)
  const fieldKey = field.key

  if (!data?.value || !fieldKey || !Array.isArray(data.value.value)) {
    return
  }

  let newValue: any
  if (val && typeof val === 'object' && 'value' in val) {
    if (field.type === 'repeater' || field.type === 'tags') {
      newValue = Array.isArray(val.value) ? val.value : []
    }
    else {
      newValue = val.value
    }
  }
  else {
    newValue = val
  }

  const currentItems = [...data.value.value]
  if (!currentItems[itemIdx]) {
    currentItems[itemIdx] = {}
  }

  currentItems[itemIdx] = {
    ...currentItems[itemIdx],
    [fieldKey]: newValue,
    ...(field.type === 'price' && val && typeof val === 'object' && 'currency' in val
      ? { currency: val.currency ?? null }
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

const getItemTitle = (label: string | undefined, index: number) => `${label || 'Элемент'} ${index + 1}`
</script>

<template>
    <template v-if="data">
        <template v-if="data.type === 'group' && data.fields">
            <div
                class="flex flex-col gap-3"
                :class="data.class"
            >
                <Label
                    v-if="isShowLabel && data.label"
                    class="!text-ms font-medium"
                >
                    {{ data.label }}
                </Label>
                <div :class="data.fieldsContainerClass || 'flex flex-col gap-4'">
                    <shared-ui-field-item
                        v-for="(field, index) in data.fields"
                        :key="field.key || index"
                        v-model="data.fields[index]"
                        @complete="$emit('complete')"
                        @update:error="$emit('update:error', $event)"
                    />
                </div>
            </div>
        </template>
        <template v-else-if="data.type === 'repeater' && data.fields">
            <div
                class="flex flex-col gap-4"
                :class="data.class"
            >
                <Label v-if="isShowLabel && data.label">
                    {{ data.label }}
                </Label>
                <div
                    v-auto-animate
                    class="flex flex-col gap-4"
                >
                    <Card
                        v-for="(_item, itemIndex) in repeaterItems"
                        :key="`repeater-item-${itemIndex}`"
                    >
                        <CardHeader>
                            <div class="flex items-center justify-between">
                                <CardTitle class="text-sm">
                                    {{ getItemTitle(data.label, Number(itemIndex)) }}
                                </CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    type="button"
                                    @click="removeRepeaterItem(Number(itemIndex))"
                                >
                                    <Icon
                                        name="lucide:trash"
                                        size="16"
                                    />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent class="flex flex-col gap-3">
                            <template
                                v-for="(field, fieldIndex) in data.fields"
                                :key="field.key || fieldIndex"
                            >
                                <template v-if="shouldShowField(Number(itemIndex), field.key)">
                                    <shared-ui-field
                                        v-if="field.type === 'repeater'"
                                        :model-value="repeaterItemFields[Number(itemIndex)]?.[Number(fieldIndex)]"
                                        @update:model-value="(val) => updateRepeaterField(itemIndex, field, val)"
                                        @complete="$emit('complete')"
                                        @update:error="$emit('update:error', $event)"
                                    />
                                    <shared-ui-field-item
                                        v-else
                                        :model-value="repeaterItemFields[Number(itemIndex)]?.[Number(fieldIndex)]"
                                        @update:model-value="(val) => updateRepeaterField(itemIndex, field, val)"
                                        @complete="$emit('complete')"
                                        @update:error="$emit('update:error', $event)"
                                    />
                                </template>
                            </template>
                        </CardContent>
                    </Card>

                    <div class="flex justify-between gap-3">
                        <Label
                            v-if="data.addButtonText"
                            class="text-sm"
                        >
                            {{ data.addButtonText }}
                        </Label>
                        <Button
                            variant="outline"
                            type="button"
                            class="w-full"
                            @click="addRepeaterItem"
                        >
                            <Icon
                                name="lucide:plus"
                                size="16"
                            />
                            {{ data.addButtonText || 'Добавить' }}
                        </Button>
                    </div>
                </div>
            </div>
        </template>
        <shared-ui-field-item
            v-else
            v-model="data"
            :is-show-label="isShowLabel"
            @complete="$emit('complete')"
            @update:error="$emit('update:error', $event)"
        />
    </template>
</template>
