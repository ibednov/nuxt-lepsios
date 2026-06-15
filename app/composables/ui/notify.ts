import type { NotifyFromApiErrorOptions, NotifyOptions } from '~/interfaces/composables/notify'
import { toast } from 'vue-sonner'

export const useNotify = () => {
  const base = (
    type: 'default' | 'success' | 'error' | 'info' | 'warning',
    title: string,
    options?: NotifyOptions,
  ) => {
    const config: Parameters<typeof toast>[1] = {
      ...options?.rawOptions,
      description: options?.description,
      action: options?.action?.label
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    }

    if (type === 'success') {
      return toast.success(title, config)
    }

    if (type === 'error') {
      return toast.error(title, config)
    }

    if (type === 'info') {
      return toast.info(title, config)
    }

    if (type === 'warning') {
      return toast.warning(title, config)
    }

    return toast(title, config)
  }

  const notify = (title: string, options?: NotifyOptions) =>
    base('default', title, options)

  const success = (title: string, options?: NotifyOptions) =>
    base('success', title, options)

  const error = (title: string, options?: NotifyOptions) =>
    base('error', title, options)

  const info = (title: string, options?: NotifyOptions) =>
    base('info', title, options)

  const warning = (title: string, options?: NotifyOptions) =>
    base('warning', title, options)

  const fromApiError = (err: unknown, options?: NotifyFromApiErrorOptions) => {
    const anyError = err as any
    const backendMessage: string | undefined = anyError?.message
    const statusCode: number | undefined = anyError?.statusCode ?? anyError?.status

    if (backendMessage && backendMessage.trim()) {
      return error(backendMessage)
    }

    if (options?.fallback) {
      return error(options.fallback)
    }

    if (options?.titleWithDescription) {
      const { title, description } = options.titleWithDescription
      return error(title, { description })
    }

    if (statusCode && options?.statusMessages?.[statusCode]) {
      return error(options.statusMessages[statusCode]!)
    }

    if (options?.genericMessage) {
      return error(options.genericMessage)
    }

    return error('')
  }

  const promise = <T>(
    fn: () => Promise<T>,
    messages: {
      loading: string
      success: string | ((data: T) => string)
      error: string
    },
  ) => {
    const toStr = (msg: string | ((data: T) => string), data?: T): string =>
      typeof msg === 'function' ? msg(data as T) : msg

    return toast.promise<T>(fn, {
      loading: toStr(messages.loading),
      success: (data: T) => toStr(messages.success, data),
      error: toStr(messages.error),
    })
  }

  return {
    notify,
    success,
    error,
    info,
    warning,
    fromApiError,
    promise,
  }
}
