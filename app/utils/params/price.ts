export const formatPrice = (price: number | null) => {
  if (!price) {
    return null
  }

  if (Number.isInteger(price)) {
    return price.toString()
  }
  return price.toFixed(1).replace(',', '.')
}
