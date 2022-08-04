import simplur from 'simplur'

export const getAccessibleFollowingText = (
  followed: boolean,
  numOfUnreadArticles: number,
) => {
  if (!followed) {
    return
  }

  if (numOfUnreadArticles) {
    return simplur`${numOfUnreadArticles} Bericht[|en]`
  }

  return 'Volgend'
}
