<script setup lang="ts">
import type { SharedUiUploadWrapperPayload } from './types'

interface Props {
  enabled?: boolean
  maxFileSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  enabled: true,
  maxFileSize: () => 10 * 1024 * 1024,
})

const emit = defineEmits<{
  upload: [payload: SharedUiUploadWrapperPayload]
}>()

const uploading = defineModel<boolean>('uploading', { default: false })

const { t } = useI18n()
const { error } = useNotify()

const isDragOver = ref(false)
const dragCounter = ref(0)

const isValidFile = (file: File): boolean => {
  const isValidMimeType = file.type.startsWith('image/')
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico']
  const fileName = file.name.toLowerCase()
  const isValidExtension = validExtensions.some(ext => fileName.endsWith(ext))

  if (!isValidMimeType && !isValidExtension) {
    error(t('ui.input.file.errors.invalid_type', { accept: 'image/*' }))
    return false
  }

  if (file.size > props.maxFileSize) {
    const maxSizeMB = (props.maxFileSize / (1024 * 1024)).toFixed(2)
    error(t('ui.input.file.errors.too_large', { maxSize: maxSizeMB, unit: t('ui.input.file.size_unit') }))
    return false
  }

  return true
}

const resetDragState = () => {
  dragCounter.value = 0
  isDragOver.value = false
}

const handleMouseLeave = () => {
  if (!props.enabled) {
    return
  }
  resetDragState()
}

const handleFileDrop = (event: DragEvent) => {
  if (!props.enabled) {
    return
  }

  event.preventDefault()
  isDragOver.value = false
  dragCounter.value = 0

  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    const file = files[0]
    if (!file || !isValidFile(file)) {
      return
    }
    emit('upload', { source: 'file', file })
    return
  }

  const url = event.dataTransfer?.getData('text/uri-list')?.trim()
  if (url) {
    emit('upload', { source: 'url', url })
    return
  }

  error(t('ui.input.file.errors.drop_no_data'))
}

const handleDragOver = (event: DragEvent) => {
  if (!props.enabled) {
    return
  }
  event.preventDefault()
  event.stopPropagation()
}

const handleDragEnter = (event: DragEvent) => {
  if (!props.enabled) {
    return
  }
  event.preventDefault()
  event.stopPropagation()
  dragCounter.value++
  isDragOver.value = true
}

const handleDragLeave = (event: DragEvent) => {
  if (!props.enabled) {
    return
  }
  event.preventDefault()
  event.stopPropagation()
  dragCounter.value--
  if (dragCounter.value === 0) {
    isDragOver.value = false
  }
}
</script>

<template>
    <div
        class="relative overflow-hidden transition-all duration-200"
        :class="[
            enabled && isDragOver ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : '',
        ]"
        @dragenter="handleDragEnter"
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
        @mouseleave="handleMouseLeave"
        @drop="handleFileDrop"
    >
        <slot />

        <div
            v-if="uploading && enabled"
            class="absolute inset-0 flex items-center justify-center z-10"
        >
            <div class="flex flex-col items-center gap-2 text-center">
                <div class="animate-spin h-8 w-8 border border-current border-t-transparent rounded-full" />
                <p class="text-sm font-medium">
                    {{ t('ui.input.file.uploading') }}
                </p>
            </div>
        </div>

        <div
            v-if="isDragOver && !uploading && enabled"
            class="absolute inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center z-10"
        >
            <div class="flex flex-col items-center gap-2 text-center text-primary">
                <Icon
                    name="lucide:image"
                    size="32"
                    class="opacity-70"
                />
                <p class="text-sm font-medium">
                    {{ t('ui.input.file.drop_zone_text') }}
                </p>
            </div>
        </div>
    </div>
</template>
