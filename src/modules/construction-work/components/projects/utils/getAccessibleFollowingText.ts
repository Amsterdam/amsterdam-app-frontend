export const getAccessibleFollowingText = (
  followed: boolean,
  numArticles: number | undefined,
) => {
  if (!followed) {
    return
  }

  if (numArticles) {
    return `${numArticles} berichten`
  }

  return 'Volgend'
}
