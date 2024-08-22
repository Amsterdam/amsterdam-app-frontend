import {parse} from 'picoquery'

export const getValueFromUrlParam = (url: string, key: string) => {
  if (!url || !key) {
    return null
  }

  const params = url.substring(url.indexOf('?') + 1)

  return parse(params)[key] ?? null
}
