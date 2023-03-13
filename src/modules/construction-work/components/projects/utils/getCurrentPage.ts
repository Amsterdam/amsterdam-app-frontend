export const getCurrentPage = (
  viewableItemIndex: number | undefined,
  itemsPerRow: number,
  pageSize: number,
) => Math.floor(((viewableItemIndex ?? 0) * itemsPerRow + 1) / pageSize) + 1
