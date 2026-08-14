import { toast } from 'vue-sonner'

export interface NotifyOptions {
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  rawOptions?: Parameters<typeof toast>[1]
}

export interface NotifyFromApiErrorOptions {
  /** Когда в теле ответа API нет поля message */
  fallback?: string
  titleWithDescription?: { title: string, description: string }
  statusMessages?: Record<number, string>
  genericMessage?: string
}
