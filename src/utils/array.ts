export const excludeListItemsFromList = <T>(listA: T[], listB: T[]) => {
  return listA.filter(a => !listB.includes(a))
}
