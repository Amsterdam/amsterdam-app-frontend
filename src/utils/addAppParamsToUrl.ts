import {stringify} from 'qs'
import {ModuleSlug} from '@/modules/slugs'

export const isAmsterdamNlUrl = (url: string) =>
  /^(?:https?:\/\/)?(?:[^./]+\.)?amsterdam\.nl/.test(url)

export const addAppParamsToUrl = (url: string, slug?: ModuleSlug) => {
  if (!isAmsterdamNlUrl(url)) {
    return url
  }

  const [baseUrl, queryString] = url.split('?')

  const params = stringify({
    app_from: 1,
    app_module: slug,
  })

  const urlWithAppParams = `${baseUrl}?${params}`

  if (!queryString) {
    return urlWithAppParams
  }

  return `${urlWithAppParams}&${queryString}`
}
