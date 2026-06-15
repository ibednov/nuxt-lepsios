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

  // 1. Пробуем найти ссылку внутри текста (например, "привет вот ссылка https://...")
  const foundUrl = extractUrl(rawString)

  if (foundUrl && foundUrl !== rawString) {
    info(t('ui.input.link.trimmed_to_url'))
  }

  let cleanUrl: string

  if (foundUrl) {
    // Если ссылка найдена, используем её
    cleanUrl = foundUrl
  }
  else {
    // Если ссылки нет, считаем, что пользователь вводит домен вручную
    // Убираем возможный мусор, оставляем только то, что похоже на домен/путь
    // (тут можно добавить дополнительную валидацию, если нужно)
    cleanUrl = rawString
  }

  // Нормализация: убираем текущий протокол, чтобы не было двойного https://https://...
  const withoutProtocol = cleanUrl.replace(/^https?:\/\//i, '').trim()

  if (!withoutProtocol) {
    modelValue.value = null
    return
  }

  // Всегда сохраняем с https://
  modelValue.value = `https://${withoutProtocol}`
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
