import {stringify} from 'qs'
import {ModuleSlug} from '@/modules/slugs'

export const isAmsterdamNlUrl = (url: string) =>
  /^https?:\/\/([\w-.]+.)?amsterdam\.nl/.test(url)

export const addAppParamsToUrl = (url: string, slug?: ModuleSlug) => {
  if (!isAmsterdamNlUrl(url)) {
    return url
  }

  const appParams = stringify({
    app_from: 1,
    app_module: slug,
  })

  return `${url}${url.includes('?') ? '&' : '?'}${appParams}`
}
