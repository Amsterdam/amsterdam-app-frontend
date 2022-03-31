export const isEmptyObject = (value: Object) => {
  for (var key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      return false
    }
  }
  return true
}
