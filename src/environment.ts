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

export const environmentAzureLabels = {
  [EnvironmentAzure.developmentAzure]: 'Development (Azure)',
  [EnvironmentAzure.testAzure]: 'Test (Azure)',
  [EnvironmentAzure.acceptanceAzure]: 'Acceptance (Azure)',
  [EnvironmentAzure.productionAzure]: 'Production (Azure)',
}

const getEnvForApiUrl = (environment: Environment) => {
  switch (environment) {
    case Environment.acceptance:
      return 'test-'
    case Environment.custom:
      return 'test-'
    case Environment.development:
      return 'dev-'
    case Environment.production:
      return ''
    default:
      return ''
  }
}
const getEnvForAzureApiUrl = (environment: EnvironmentAzure) => {
  switch (environment) {
    case EnvironmentAzure.acceptanceAzure:
      return 'acc.'
    case EnvironmentAzure.developmentAzure:
      return 'ontw.'
    case EnvironmentAzure.productionAzure:
      return ''
    case EnvironmentAzure.testAzure:
      return 'test.'
    default:
      return ''
  }
}

const fitSlugToApi = (slug: ModuleSlug | 'modules') =>
  slug === ModuleSlug['construction-work'] || slug === ModuleSlug.contact
    ? 'backend'
    : slug

const externalApiUrls: Record<string, string> = {
  [ModuleSlug.address]: 'https://api.pdok.nl/bzk/locatieserver/search/v3_1',
}

const getApiUrl = (
  environment: Environment | EnvironmentAzure,
  custom: typeof customDefaultUrls,
  slug: ModuleSlug | 'modules',
) => {
  if (slug in externalApiUrls) {
    return externalApiUrls[slug]
  }

  if (environment === Environment.custom && slug in custom) {
    return custom[slug as keyof typeof customDefaultUrls]
  }

  let env

  if (
    Object.values(EnvironmentAzure).includes(environment as EnvironmentAzure)
  ) {
    env = getEnvForAzureApiUrl(environment as EnvironmentAzure)

    return `https://${env}app.amsterdam.nl/${slug}/api/v1`
  } else {
    env = getEnvForApiUrl(environment as Environment)

    return `https://api-${env}${fitSlugToApi(slug)}.app-amsterdam.nl/api/v1`
  }
}

export const getApi = (
  environment: Environment | EnvironmentAzure,
  custom: typeof customDefaultUrls,
  slug: ModuleSlug | 'modules',
) => getApiUrl(environment, custom, slug)
