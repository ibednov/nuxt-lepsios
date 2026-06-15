export const handleErrorFromResponse = (error: any) => {
  if (error.status === 'error') {
    const message = error.error.data.message
    if (Array.isArray(message)) {
      return message[0]
    }
    return message
  }
  return error
}
