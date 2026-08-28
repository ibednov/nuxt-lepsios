export const useTermWindow = (opts?: { onClose?: () => void }) => {
  const maximized = useState('term-max', () => false)
  const minimized = useState('term-min', () => false)

  const restore = () => {
    minimized.value = false
  }

  const close = () => {
    minimized.value = false
    maximized.value = false
    opts?.onClose?.()
  }

  const minimize = () => {
    minimized.value = true
  }

  const toggleMax = () => {
    minimized.value = false
    maximized.value = !maximized.value
  }

  return { maximized, minimized, close, minimize, restore, toggleMax }
}
