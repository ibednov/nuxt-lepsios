export const formatPrice = (price: number | null | undefined) => {
  if (price == null || Number.isNaN(price)) {
    return null
  }

  if (Number.isInteger(price)) {
    return price.toString()
  }
  return price.toFixed(1).replace(',', '.')
}
