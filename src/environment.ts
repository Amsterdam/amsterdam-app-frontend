/* eslint-disable typescript-sort-keys/string-enum */
import {ModuleSlug} from '@/modules/slugs'
import {customDefaultUrls} from '@/store/slices/environment'

export enum Environment {
  development = 'Development',
  acceptance = 'Acceptance',
  production = 'Production',
  custom = 'Custom',
}

export enum EnvironmentAzure {
  developmentAzure = 'DevelopmentAzure',
  testAzure = 'TestAzure',
  acceptanceAzure = 'AcceptanceAzure',
  productionAzure = 'ProductionAzure',
}

export enum GlobalApiSlug {
  modules = 'modules',
}

export type ApiSlug = GlobalApiSlug | ModuleSlug

export const editableApiSlug = {
  constructionWork: ModuleSlug['construction-work'],
  contact: ModuleSlug.contact,
  modules: GlobalApiSlug.modules,
} as const

export type EnvUrlMap = Partial<Record<Environment | EnvironmentAzure, string>>

export const environmentAzureLabels = {
  [EnvironmentAzure.developmentAzure]: 'Development (Azure)',
  [EnvironmentAzure.testAzure]: 'Test (Azure)',
  [EnvironmentAzure.acceptanceAzure]: 'Acceptance (Azure)',
  [EnvironmentAzure.productionAzure]: 'Production (Azure)',
}

const getEnvForApiUrl = (environment: Environment) => {
  switch (environment) {
    case Environment.acceptance:
    case Environment.custom:
      return 'test'
    case Environment.development:
      return 'dev'
    case Environment.production:
    default:
      return ''
  }
}
const getEnvForAzureApiUrl = (environment: EnvironmentAzure) => {
  switch (environment) {
    case EnvironmentAzure.acceptanceAzure:
      return 'acc'
    case EnvironmentAzure.developmentAzure:
      return 'ontw'
    case EnvironmentAzure.testAzure:
      return 'test'
    case EnvironmentAzure.productionAzure:
    default:
      return ''
  }
}

// Should no longer be necessary after backend is moved to Azure Cloud
export const getApiSlugAndPath = (slug: ApiSlug) => ({
  apiSlug:
    slug === ModuleSlug['construction-work'] || slug === ModuleSlug.contact
      ? 'backend'
      : slug,
  path: slug === ModuleSlug.contact ? '/contact' : '',
})

/**
 * @deprecated as this should be proxied by our own backend
 */
const externalApiUrls: Record<string, string> = {
  [ModuleSlug.address]: 'https://api.pdok.nl/bzk/locatieserver/search/v3_1',
}

const getApiUrl = (
  environment: Environment | EnvironmentAzure,
  custom: typeof customDefaultUrls,
  slug: ApiSlug,
) => {
  if (environment === Environment.custom && slug in custom) {
    return custom[slug as keyof typeof customDefaultUrls]
  }

  if (
    Object.values(EnvironmentAzure).includes(environment as EnvironmentAzure)
  ) {
    const env = getEnvForAzureApiUrl(environment as EnvironmentAzure)
    const interPunction =
      environment === EnvironmentAzure.productionAzure ? '' : '.'

    return `https://${env}${interPunction}app.amsterdam.nl/${slug}/api/v1`
  } else {
    if (externalApiUrls[slug]) {
      return externalApiUrls[slug]
    }

    const env = getEnvForApiUrl(environment as Environment)
    const interPunction = environment === Environment.production ? '' : '-'
    const {apiSlug, path} = getApiSlugAndPath(slug)

    return `https://api-${env}${interPunction}${apiSlug}.app-amsterdam.nl/api/v1${path}`
  }
}

export const getApi = (
  environment: Environment | EnvironmentAzure,
  custom: typeof customDefaultUrls,
  slug: ApiSlug,
) => getApiUrl(environment, custom, slug)
