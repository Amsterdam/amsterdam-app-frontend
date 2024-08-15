/* eslint-disable typescript-sort-keys/string-enum */
import {API_KEY_ACC, API_KEY_DEV, API_KEY_PROD, API_KEY_TEST} from '@env'
import {ModuleSlug} from '@/modules/slugs'

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

export type EnvUrlMap = Record<Environment, string>

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
  if (environment === Environment.custom && slug in (custom ?? {})) {
    return custom[slug as keyof typeof customDefaultUrls]
  }

  const env = getEnvForApiUrl(environment)
  const interPunction = environment === Environment.production ? '' : '.'

  return `https://${env}${interPunction}app.amsterdam.nl/${slug}${apiVersionPath}`
}

export const customDefaultUrls = {
  [editableApiSlug.constructionWork]:
    'http://localhost:8000/construction-work/api/v1',
  [editableApiSlug.contact]: 'http://localhost:8000/contact/api/v1',
  [editableApiSlug.modules]: 'http://localhost:9000/modules/api/v1',
}

export const apiKeyForEnvironment: EnvUrlMap = {
  [Environment.development]: API_KEY_DEV ?? '',
  [Environment.test]: API_KEY_TEST ?? '',
  [Environment.acceptance]: API_KEY_ACC ?? '',
  [Environment.production]: API_KEY_PROD ?? '',
  [Environment.custom]: API_KEY_DEV ?? '',
}
