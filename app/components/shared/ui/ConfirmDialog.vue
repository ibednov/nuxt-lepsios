<script setup lang="ts">
interface Props {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: undefined,
  cancelText: undefined,
  variant: 'default',
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const { t } = useI18n()

const isOpenModel = defineModel<boolean>('open', { default: false })

watch(isOpenModel, (newVal, oldVal) => {
  if (!newVal && oldVal) {
    // Даем время на завершение анимации закрытия, затем очищаем
    nextTick(() => {
      setTimeout(() => {
        // Принудительно сбрасываем все стили body
        const body = document.body
        body.style.pointerEvents = ''
        body.style.overflow = ''
        body.style.paddingRight = ''

        // Удаляем все оставшиеся элементы диалога из DOM
        const portals = document.querySelectorAll('[data-portal]')
        portals.forEach((portal) => {
          const overlay = portal.querySelector('[data-slot="dialog-overlay"]')
          if (overlay && !overlay.closest('[data-state="open"]')) {
            portal.remove()
          }
        })
      }, 300)
    })
  }
}, { immediate: true })

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}

const confirmButtonText = computed(() => props.confirmText || t('global.confirm.confirm'))
const cancelButtonText = computed(() => props.cancelText || t('global.confirm.cancel'))
</script>

<template>
    <Dialog v-model:open="isOpenModel">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{{ title }}</DialogTitle>
                <DialogDescription v-if="description">
                    {{ description }}
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button
                    variant="outline"
                    @click="handleCancel"
                >
                    {{ cancelButtonText }}
                </Button>
                <Button
                    :variant="variant === 'destructive' ? 'destructive' : 'default'"
                    @click="handleConfirm"
                >
                    {{ confirmButtonText }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
