export const excludeListItemsFromList = (
  listA: unknown[],
  listB: unknown[],
) => {
  return listA.filter(a => !listB.includes(a))
}
