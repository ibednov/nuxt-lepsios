<script setup lang="ts">
interface Props {
  class?: string
  accept?: string
  maxSize?: number
  currentImageUrl?: string
  currentImageName?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  accept: 'image/*',
  maxSize: 10 * 1024 * 1024,
})

const emit = defineEmits<{
  fileSelected: [file: File]
}>()

const { t } = useI18n()
const { error, success } = useNotify()
const modelValue = defineModel<File | null>('modelValue', { default: null })

const fileInputRef = ref<HTMLInputElement | null>(null)
const isDragOver = ref(false)

const fileName = computed(() => modelValue.value?.name || '')
const fileSize = computed(() => {
  if (!modelValue.value) {
    return ''
  }
  const sizeInMB = (modelValue.value.size / (1024 * 1024)).toFixed(2)
  return `${sizeInMB} MB`
})

const isValidFile = (file: File): boolean => {
  if (props.accept !== '*' && !file.type.match(props.accept.replace('*', '.*'))) {
    error(t('ui.input.file.errors.invalid_type', { accept: props.accept }))
    return false
  }

  if (file.size > props.maxSize) {
    const maxSizeMB = (props.maxSize / (1024 * 1024)).toFixed(2)
    error(t('ui.input.file.errors.too_large', { maxSize: maxSizeMB, unit: t('ui.input.file.size_unit') }))
    return false
  }

  return true
}

const handleFileSelect = async (files: FileList | null) => {
  if (!files || files.length === 0) {
    return
  }

  const file = files[0]
  if (!file || !isValidFile(file)) {
    return
  }

  modelValue.value = file
  emit('fileSelected', file)
}

const openFileDialog = () => {
  fileInputRef.value?.click()
}

const removeFile = () => {
  modelValue.value = null
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
  const files = event.dataTransfer?.files
  if (files) {
    handleFileSelect(files)
  }
}

const handlePaste = async (event: ClipboardEvent) => {
  if (event.clipboardData?.files && event.clipboardData.files.length > 0) {
    await handleFileSelect(event.clipboardData.files)
    return
  }

  if (event.clipboardData?.items) {
    for (let i = 0; i < event.clipboardData.items.length; i++) {
      const item = event.clipboardData.items[i]
      if (item && item.type.includes('image')) {
        const blob = item.getAsFile()
        if (blob) {
          const file = new File([blob], `pasted-image-${Date.now()}.png`, { type: blob.type })
          success(t('ui.input.file.errors.pasted_from_clipboard'))
          await handleFileSelect([file] as any)
          break
        }
      }
    }
  }
}
</script>

<template>
    <div class="flex flex-col gap-2">
        <input
            ref="fileInputRef"
            type="file"
            :accept="props.accept"
            class="hidden"
            @change="(e) => handleFileSelect((e.target as HTMLInputElement).files)"
        >

        <div
            v-if="props.currentImageUrl && !modelValue"
            class="flex items-center gap-3 p-3 bg-muted rounded-md"
        >
            <img
                :src="props.currentImageUrl"
                :alt="props.currentImageName || 'Current image'"
                class="w-12 h-12 object-cover rounded-md"
            >
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium">
                    {{ t('ui.input.file.current_image') }}
                </p>
                <p class="text-xs text-muted-foreground truncate">
                    {{ props.currentImageName }}
                </p>
            </div>
            <div class="flex items-center gap-1">
                <InputGroupButton
                    size="icon-xs"
                    variant="ghost"
                    @click.stop="openFileDialog"
                >
                    <Icon
                        name="lucide:upload"
                        class="h-3 w-3"
                    />
                </InputGroupButton>
            </div>
        </div>

        <div
            v-if="modelValue"
            class="flex items-center gap-2 p-2 bg-muted rounded-md"
        >
            <Icon
                name="lucide:file"
                class="h-4 w-4 text-muted-foreground"
            />
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">
                    {{ fileName }}
                </p>
                <p class="text-xs text-muted-foreground">
                    {{ fileSize }}
                </p>
            </div>
            <div class="flex items-center gap-1">
                <InputGroupButton
                    size="icon-xs"
                    variant="ghost"
                    @click.stop="openFileDialog"
                >
                    <Icon
                        name="lucide:upload"
                        class="h-3 w-3"
                    />
                </InputGroupButton>
                <InputGroupButton
                    size="icon-xs"
                    variant="ghost"
                    @click.stop="removeFile"
                >
                    <Icon
                        name="lucide:x"
                        class="h-3 w-3"
                    />
                </InputGroupButton>
            </div>
        </div>

        <div
            class="relative border-2 border-dashed rounded-md transition-colors cursor-pointer"
            :class="[
                isDragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50',
                props.class,
            ]"
            tabindex="0"
            @dragover="handleDragOver"
            @dragleave="handleDragLeave"
            @drop="handleDrop"
            @paste="handlePaste"
            @click="openFileDialog"
        >
            <div class="flex items-center justify-center p-6">
                <div class="text-center">
                    <Icon
                        name="lucide:upload"
                        class="mx-auto h-12 w-12 text-muted-foreground mb-4"
                    />
                    <p class="text-sm text-muted-foreground mb-2">
                        {{ t('ui.input.file.drop_zone_text') }}
                    </p>
                    <p class="text-xs text-muted-foreground mb-1">
                        {{ t('ui.input.file.paste_hint') }}
                    </p>
                    <p class="text-xs text-muted-foreground">
                        {{ props.accept === 'image/*' ? t('ui.input.file.supported_images') : `${t('ui.input.file.type_prefix')} ${props.accept}` }}
                        ({{ t('global.max_prefix') }} {{ (props.maxSize / (1024 * 1024)).toFixed(0) }}{{ t('ui.input.file.size_unit') }})
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
