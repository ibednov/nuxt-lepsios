<script setup lang="ts">
import type { FieldDataInterface } from '~/interfaces/common/field'

interface Props {
  isShowLabel?: boolean
}

withDefaults(defineProps<Props>(), {
  isShowLabel: true,
})

const emit = defineEmits<{
  'complete': []
  'update:error': [error: string | null]
}>()

const data = defineModel<FieldDataInterface | undefined>()

const emitUpdate = (newValue: any) => {
  if (data.value) {
    data.value = { ...data.value, value: newValue }
  }
}

const selectedOption = computed(() => {
  if (!data.value?.value || !data.value?.options) {
    return null
  }
  return data.value.options.find(option => option.value === data.value?.value)
})

const tagsValue = computed({
  get: () => {
    if (data.value?.type === 'tags') {
      return Array.isArray(data.value.value) ? data.value.value : []
    }
    return []
  },
  set: (val: string[]) => {
    emitUpdate(val)
  },
})

const switchValue = computed({
  get: () => {
    if (data.value?.type === 'switch') {
      return Boolean(data.value.value)
    }
    return false
  },
  set: (val: boolean) => {
    emitUpdate(val)
  },
})

const numberValue = computed({
  get: () => {
    if (data.value?.type === 'input' && data.value?.valueType === 'number') {
      return data.value.value ?? undefined
    }
    return undefined
  },
  set: (val: number | undefined) => {
    emitUpdate(val ? Number(val) : null)
  },
})

const priceCurrency = computed({
  get: () => data.value?.currency ?? null,
  set: (val: string | null) => {
    if (data.value) {
      data.value = { ...data.value, currency: val }
    }
  },
})
</script>

<template>
    <template v-if="data">
        <div class="flex flex-col gap-2">
            <Label v-if="isShowLabel">
                {{ data.label || data.placeholder }}
            </Label>
            <Input
                v-if="data && data.type === 'input' && data.valueType !== 'number'"
                :model-value="data.value ?? ''"
                :type="data.inputType || 'text'"
                :placeholder="data.placeholder"
                :class="data.class"
                :maxlength="data.maxLength"
                @update:model-value="emitUpdate"
            />
            <shared-ui-input-link
                v-if="data && data.type === 'link'"
                :id="data.key ? `link-${data.key}` : undefined"
                :model-value="data.value"
                :placeholder="data.placeholder"
                @update:model-value="emitUpdate"
            />
            <shared-ui-input-phone
                v-if="data && data.type === 'phone'"
                :id="data.key ? `phone-${data.key}` : undefined"
                :model-value="data.value"
                :placeholder="data.placeholder"
                :class="data.class"
                @update:model-value="emitUpdate"
            />
            <shared-ui-input-otp
                v-if="data && data.type === 'otp'"
                :id="data.key ? `otp-${data.key}` : undefined"
                :model-value="data.value"
                :length="data.length || 6"
                :placeholder="data.placeholder"
                :class="data.class"
                :has-error="!!data.error"
                @update:model-value="(val) => { emitUpdate(val); emit('update:error', null) }"
                @complete="emit('complete')"
            />
            <NumberField
                v-if="data && data.type === 'input' && data.valueType === 'number'"
                :model-value="numberValue ?? 0"
                :min="0"
                :class="data.class"
                @update:model-value="(val) => { numberValue = val ?? 0 }"
            >
                <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput :placeholder="data.placeholder" />
                    <NumberFieldIncrement />
                </NumberFieldContent>
            </NumberField>
            <shared-ui-datepicker
                v-if="data && data.type === 'date'"
                :model-value="data.value"
                :placeholder="data.placeholder"
                @update:model-value="emitUpdate"
            />
            <Textarea
                v-if="data && data.type === 'textarea'"
                :model-value="data.value ?? ''"
                :placeholder="data.placeholder"
                :class="data.class"
                @update:model-value="emitUpdate"
            />
            <Label
                v-if="data.type === 'text'"
                :class="data.class"
            >
                <span
                    v-if="!isShowLabel"
                    class="text-foreground/50 font-bold"
                >
                    {{ data.placeholder }}:
                </span>
                {{ data.value }}
            </Label>
            <Select
                v-if="data && data.type === 'select'"
                :model-value="data.value"
                :class="data.class"
                @update:model-value="emitUpdate"
            >
                <SelectTrigger class="w-full">
                    <SelectValue :placeholder="data.placeholder">
                        <template v-if="selectedOption">
                            <div class="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    class="text-xs"
                                >
                                    {{ selectedOption.value }}
                                </Badge>
                                <span>
                                    {{ selectedOption.label }}
                                </span>
                            </div>
                        </template>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem
                            v-for="option in data.options"
                            :key="option.value"
                            :value="option.value"
                        >
                            <div class="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    class="text-xs"
                                >
                                    {{ option.value }}
                                </Badge>
                                <span>
                                    {{ option.label }}
                                </span>
                            </div>
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <TagsInput
                v-if="data.type === 'tags'"
                v-model="tagsValue"
                v-auto-animate
                :class="data.class"
            >
                <TagsInputItem
                    v-for="item in tagsValue"
                    :key="item"
                    :value="item"
                >
                    <TagsInputItemText />
                    <TagsInputItemDelete />
                </TagsInputItem>
                <TagsInputInput :placeholder="data.placeholder" />
            </TagsInput>
            <div
                v-if="data.type === 'switch'"
                class="flex items-center space-x-2"
            >
                <Switch
                    :id="data.key"
                    v-model="switchValue"
                />
                <Label
                    v-if="isShowLabel"
                    :for="data.key"
                >
                    {{ data.label || data.placeholder }}
                </Label>
            </div>
            <shared-ui-input-price
                v-if="data && data.type === 'price'"
                :id="data.key ? `price-${data.key}` : undefined"
                v-model:currency="priceCurrency"
                :model-value="data.value"
                :options="data.options"
                :placeholder="data.placeholder"
                :class="data.class"
                @update:model-value="emitUpdate"
            />
            <shared-ui-input-file
                v-if="data && data.type === 'file'"
                :id="data.key ? `file-${data.key}` : undefined"
                :model-value="data.file || null"
                :placeholder="data.placeholder"
                :accept="data.accept"
                :max-size="data.maxSize"
                :current-image-url="data.currentImageUrl"
                :current-image-name="data.currentImageName"
                :class="data.class"
                @update:model-value="(val) => emitUpdate(val)"
            />
        </div>
    </template>
</template>
