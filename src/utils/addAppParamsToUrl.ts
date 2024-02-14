import {stringify} from 'qs'
import {ModuleSlug} from '@/modules/slugs'

export const isAmsterdamNlUrl = (url: string) =>
  /^(?:https?:\/\/)?(?:[^./]+\.)?amsterdam\.nl/.test(url)

export const addAppParamsToUrl = (url: string, slug?: ModuleSlug) => {
  if (!isAmsterdamNlUrl(url)) {
    return url
  }

  const [baseUrl, queryString, ...additionalQueryStrings] = url.split('?')

  if (additionalQueryStrings.length > 0) {
    return url
  }

  const appParams = stringify({
    app_from: 1,
    app_module: slug,
  })

  if (!queryString) {
    return `${baseUrl}?${appParams}`
  }

  return `${url}&${appParams}`
}
