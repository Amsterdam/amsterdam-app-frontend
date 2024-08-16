export const getValueFromUrlParam = (url: string, key: string) => {
  if (!url || !key) {
    return null
  }

  const urlNew = new URL(decodeURI(url))

  return urlNew.searchParams.get(key)
}
