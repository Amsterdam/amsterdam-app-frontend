import simplur from 'simplur'

export const getAccessibleFollowingText = (
  followed: boolean,
  numArticles: number | undefined,
) => {
  if (!followed) {
    return
  }

  if (numArticles) {
    return simplur`${numArticles} Bericht[|en]`
  }

  return 'Volgend'
}
