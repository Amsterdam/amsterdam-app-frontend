import {stringify} from 'qs'
import {ModuleSlug} from '@/modules/slugs'

const ignoreList = [
  'https://maps.amsterdam.nl/tuinkorven', // can be removed after fixing bug 107182
]

export const shouldIgnore = (url: string) => {
  for (const ignoreUrl of ignoreList) {
    if (url.startsWith(ignoreUrl)) {
      return true
    }
  }

  return false
}

export const isAmsterdamNlUrl = (url: string) =>
  /^https?:\/\/([\w-.]+.)?amsterdam\.nl/.test(url)

export const addAppParamsToUrl = (url: string, slug?: ModuleSlug) => {
  if (!isAmsterdamNlUrl(url) || shouldIgnore(url)) {
    return url
  }

  const appParams = stringify({
    app_from: 1,
    app_module: slug,
  })

  const [baseUrl, hash] = url.split('#')
  const hashString = hash ? `#${hash}` : ''
  const queryString = `${baseUrl.includes('?') ? '&' : '?'}${appParams}`

  return `${baseUrl}${queryString}${hashString}`
}
