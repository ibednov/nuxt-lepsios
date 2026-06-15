export const sortArray = (array: any[], key: string, order: 'asc' | 'desc' = 'asc') => {
  if (!array) {
    return []
  }
  const newArray = [...array]
  return newArray.sort((a, b) => {
    if (a[key] === b[key]) {
      return 0
    }
    return (a[key] < b[key] ? -1 : 1) * (order === 'asc' ? 1 : -1)
  })
}
