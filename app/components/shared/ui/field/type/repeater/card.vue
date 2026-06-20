<script setup lang="ts">
import type { FieldDataInterface } from '~/interfaces/common/field'

interface Props {
  isShowLabel?: boolean
  items: Record<string, any>[]
  itemFields: FieldDataInterface[][]
  shouldShowField: (itemIndex: number, fieldKey: string | undefined) => boolean
  getItemTitle: (label: string | undefined, index: number) => string
}

withDefaults(defineProps<Props>(), {
  isShowLabel: true,
})

defineEmits<{
  'complete': []
  'update:error': [error: string | null]
  'add-item': []
  'remove-item': [index: number]
  'update-field': [itemIndex: number, field: FieldDataInterface, value: unknown]
}>()

const data = defineModel<FieldDataInterface>()
</script>

<template>
    <div
        class="flex flex-col gap-4"
        :class="data?.class"
    >
        <Label v-if="isShowLabel && data?.label">
            {{ data.label }}
        </Label>
        <div
            v-auto-animate
            class="flex flex-col gap-4"
        >
            <Card
                v-for="(_item, itemIndex) in items"
                :key="`repeater-item-${itemIndex}`"
            >
                <CardHeader>
                    <div class="flex items-center justify-between">
                        <CardTitle class="text-sm">
                            {{ getItemTitle(data?.label, Number(itemIndex)) }}
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            type="button"
                            @click="$emit('remove-item', Number(itemIndex))"
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
                        v-for="(field, fieldIndex) in data?.fields"
                        :key="field.key || fieldIndex"
                    >
                        <template v-if="shouldShowField(Number(itemIndex), field.key)">
                            <shared-ui-field
                                v-if="field.type === 'repeater'"
                                :model-value="itemFields[Number(itemIndex)]?.[Number(fieldIndex)]"
                                @update:model-value="$emit('update-field', itemIndex, field, $event)"
                                @complete="$emit('complete')"
                                @update:error="$emit('update:error', $event)"
                            />
                            <shared-ui-field-item
                                v-else
                                :model-value="itemFields[Number(itemIndex)]?.[Number(fieldIndex)]"
                                @update:model-value="$emit('update-field', itemIndex, field, $event)"
                                @complete="$emit('complete')"
                                @update:error="$emit('update:error', $event)"
                            />
                        </template>
                    </template>
                </CardContent>
            </Card>

            <div class="flex justify-between gap-3">
                <Label
                    v-if="data?.addButtonText"
                    class="text-sm"
                >
                    {{ data.addButtonText }}
                </Label>
                <Button
                    variant="outline"
                    type="button"
                    class="w-full"
                    @click="$emit('add-item')"
                >
                    <Icon
                        name="lucide:plus"
                        size="16"
                    />
                    {{ data?.addButtonText || 'Добавить' }}
                </Button>
            </div>
        </div>
    </div>
</template>
