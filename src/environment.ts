/* eslint-disable typescript-sort-keys/string-enum */
import {ModuleSlug} from '@/modules/slugs'
import {customDefaultUrls} from '@/store/slices/environment'

export enum Environment {
  development = 'Development',
  test = 'Test',
  acceptance = 'Acceptance',
  production = 'Production',
  custom = 'Custom',
}

export enum GlobalApiSlug {
  modules = 'modules',
  admin = 'beheer',
}

export type ApiSlug = GlobalApiSlug | ModuleSlug

export const editableApiSlug = {
  constructionWork: ModuleSlug['construction-work'],
  contact: ModuleSlug.contact,
  modules: GlobalApiSlug.modules,
} as const

export type EnvUrlMap = Partial<Record<Environment, string>>

const getEnvForApiUrl = (environment: Environment) => {
  switch (environment) {
    case Environment.acceptance:
      return 'acc'
    case Environment.custom:
    case Environment.development:
      return 'ontw'
    case Environment.test:
      return 'test'
    case Environment.production:
    default:
      return ''
  }
}

export const getApi = (
  environment: Environment,
  custom: typeof customDefaultUrls,
  slug: ApiSlug,
  apiVersionPath = '/api/v1',
) => {
  if (environment === Environment.custom && slug in custom) {
    return custom[slug as keyof typeof customDefaultUrls]
  }

  const env = getEnvForApiUrl(environment)
  const interPunction = environment === Environment.production ? '' : '.'

  return `https://${env}${interPunction}app.amsterdam.nl/${slug}${apiVersionPath}`
}
