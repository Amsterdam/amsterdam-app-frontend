export const getDomainName = (url?: string | null) => {
  if (!url) {
    return null
  }

  const regex = /https?:\/\/([^/?]+)/
  const match = RegExp(regex).exec(url)

  if (match?.[1]) {
    return match[1]
  } else {
    return url
  }
}
