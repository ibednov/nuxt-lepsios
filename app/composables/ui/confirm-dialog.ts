// Singleton state для глобального диалога подтверждения
const globalState = {
  isOpen: ref(false),
  title: ref(''),
  description: ref<string | undefined>(undefined),
  resolveRef: ref<((value: boolean) => void) | null>(null),
}

export const useConfirmDialog = () => {
  const confirm = (confirmTitle: string, confirmDescription?: string): Promise<boolean> => new Promise((resolve) => {
    // Сначала устанавливаем title и description
    globalState.title.value = confirmTitle
    globalState.description.value = confirmDescription
    globalState.resolveRef.value = resolve
    // Затем в nextTick устанавливаем isOpen, чтобы Vue успел обновить DOM
    nextTick(() => {
      globalState.isOpen.value = true
    })
  })

  const handleConfirm = () => {
    const resolve = globalState.resolveRef.value
    // Резолвим Promise
    if (resolve) {
      resolve(true)
      globalState.resolveRef.value = null
    }
    // Закрываем диалог - это вызовет реактивное обновление
    globalState.isOpen.value = false
    // Очищаем состояние после небольшой задержки для завершения анимации
    setTimeout(() => {
      globalState.title.value = ''
      globalState.description.value = undefined
    }, 300)
  }

  const handleCancel = () => {
    const resolve = globalState.resolveRef.value
    // Резолвим Promise
    if (resolve) {
      resolve(false)
      globalState.resolveRef.value = null
    }
    // Закрываем диалог - это вызовет реактивное обновление
    globalState.isOpen.value = false
    // Очищаем состояние после небольшой задержки для завершения анимации
    setTimeout(() => {
      globalState.title.value = ''
      globalState.description.value = undefined
    }, 300)
  }

  return {
    isOpen: globalState.isOpen,
    title: globalState.title,
    description: globalState.description,
    confirm,
    handleConfirm,
    handleCancel,
  }
}
