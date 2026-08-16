// Singleton state для глобального диалога подтверждения
const globalState = {
  isOpen: ref(false),
  title: ref(''),
  description: ref<string | undefined>(undefined),
  variant: ref<'default' | 'destructive'>('default'),
  resolveRef: ref<((value: boolean) => void) | null>(null),
}

export type ConfirmDialogVariant = 'default' | 'destructive'

export const useConfirmDialog = () => {
  const confirm = (
    confirmTitle: string,
    confirmDescription?: string,
    variant: ConfirmDialogVariant = 'default',
  ): Promise<boolean> => new Promise((resolve) => {
    globalState.title.value = confirmTitle
    globalState.description.value = confirmDescription
    globalState.variant.value = variant
    globalState.resolveRef.value = resolve
    nextTick(() => {
      globalState.isOpen.value = true
    })
  })

  const resetCopy = () => {
    globalState.title.value = ''
    globalState.description.value = undefined
    globalState.variant.value = 'default'
  }

  const handleConfirm = () => {
    const resolve = globalState.resolveRef.value
    if (resolve) {
      resolve(true)
      globalState.resolveRef.value = null
    }
    globalState.isOpen.value = false
    setTimeout(resetCopy, 300)
  }

  const handleCancel = () => {
    const resolve = globalState.resolveRef.value
    if (resolve) {
      resolve(false)
      globalState.resolveRef.value = null
    }
    globalState.isOpen.value = false
    setTimeout(resetCopy, 300)
  }

  return {
    isOpen: globalState.isOpen,
    title: globalState.title,
    description: globalState.description,
    variant: globalState.variant,
    confirm,
    handleConfirm,
    handleCancel,
  }
}
