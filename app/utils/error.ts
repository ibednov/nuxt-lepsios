const OFETCH_HTTP_MESSAGE = /^\[[A-Z]+\]\s+"/

const readPayloadMessage = (payload: unknown): string | undefined => {
  if (!payload || typeof payload !== 'object') {
    return undefined
  }

  const message = (payload as { message?: unknown }).message
  if (typeof message === 'string' && message.length > 0) {
    return message
  }

  if (Array.isArray(message) && typeof message[0] === 'string' && message[0].length > 0) {
    return message[0]
  }

  return undefined
}

export const handleErrorFromResponse = (error: unknown): string | undefined => {
  if (!error || typeof error !== 'object') {
    return undefined
  }

  const apiError = error as {
    data?: unknown
    error?: { data?: unknown, message?: unknown }
    message?: unknown
    response?: { _data?: unknown, data?: unknown }
  }

  const serverMessage = readPayloadMessage(apiError.error?.data)
    ?? readPayloadMessage(apiError.error)
    ?? readPayloadMessage(apiError.data)
    ?? readPayloadMessage(apiError.response?._data)
    ?? readPayloadMessage(apiError.response?.data)

  if (serverMessage !== undefined) {
    return serverMessage
  }

  if (typeof apiError.message === 'string' && apiError.message.length > 0 && !OFETCH_HTTP_MESSAGE.test(apiError.message)) {
    return apiError.message
  }

  return undefined
}
