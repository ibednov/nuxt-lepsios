<script setup lang="ts">
import { InputGroup, InputGroupAddon, InputGroupInput } from '~/components/ui/input-group'

interface Props {
  placeholder?: string
  id?: string
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  id: 'link-input',
})

const { t } = useI18n()

const modelValue = defineModel<string | null>('modelValue', { default: null })

const { info } = useNotify()

// Функция для извлечения первой ссылки из "грязной" строки

// Убираем протокол из отображаемого значения
const displayValue = computed(() => {
  const value = modelValue.value
  if (!value || value === null || value === '') {
    return ''
  }
  const url = String(value).trim()
  if (!url) {
    return ''
  }
  // Убираем http:// или https:// в начале
  const withoutProtocol = url.replace(/^https?:\/\//i, '').trim()
  return withoutProtocol
})

// Добавляем протокол при сохранении, если его нет
const handleInput = (value: string | number) => {
  const rawString = String(value || '').trim()

  if (!rawString) {
    modelValue.value = null
    return
  }

  const foundUrl = extractUrl(rawString)
  const typedURL = rawString.replace(/「[^」]{0,200}」/g, '').trim()

  if (foundUrl && foundUrl !== rawString && foundUrl !== typedURL) {
    info(t('ui.input.link.trimmed_to_url'))
  }

  const cleanUrl = foundUrl || typedURL
  const withoutProtocol = cleanUrl.replace(/^https?:\/\//i, '').trim()

  if (!withoutProtocol) {
    modelValue.value = null
    return
  }

  modelValue.value = withShareProductTitle(`https://${withoutProtocol}`, rawString)
}
</script>

<template>
    <div class="grid w-full">
        <ButtonGroup class="!gap-0 w-full">
            <ButtonGroupText
                as-child
                class="text-xs"
            >
                <Label for="url">https://</Label>
            </ButtonGroupText>
            <InputGroup>
                <InputGroupInput
                    :id="props.id"
                    :model-value="displayValue"
                    :placeholder="props.placeholder"
                    @update:model-value="handleInput"
                />
                <InputGroupAddon align="inline-end">
                    <Icon name="lucide:link-2" />
                </InputGroupAddon>
            </InputGroup>
        </ButtonGroup>
    </div>
</template>
