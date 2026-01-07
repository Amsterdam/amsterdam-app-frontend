export const removeItemFromArray = <T>(draft: T[], item: T) => {
  const itemIndex = draft.indexOf(item)

  if (itemIndex !== -1) {
    draft.splice(itemIndex, 1)
  }
}
