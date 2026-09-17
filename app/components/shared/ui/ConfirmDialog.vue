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

const cleanupDialogArtifacts = () => {
  // Даём время на анимацию закрытия, затем чистим body/orphan portals
  nextTick(() => {
    setTimeout(() => {
      const body = document.body
      body.style.pointerEvents = ''
      body.style.overflow = ''
      body.style.paddingRight = ''

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

const onOpenUpdate = (open: boolean) => {
  const wasOpen = isOpenModel.value
  isOpenModel.value = open
  if (!open && wasOpen) {
    cleanupDialogArtifacts()
  }
}

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
    <Dialog
        :open="isOpenModel"
        @update:open="onOpenUpdate"
    >
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
