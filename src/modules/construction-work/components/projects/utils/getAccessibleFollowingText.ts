import simplur from 'simplur'

export const getAccessibleFollowingText = (
  followed: boolean,
  unreadArticlesLength: number,
) => {
  if (!followed) {
    return
  }

  if (unreadArticlesLength) {
    return simplur`${unreadArticlesLength} Bericht[|en]`
  }

  return 'Volgend'
}
