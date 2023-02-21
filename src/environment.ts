export enum Environment {
  acceptance = 'Acceptance',
  custom = 'Custom',
  development = 'Development',
  production = 'Production',
}

export type EnvironmentConfig = {
  apiUrl: string
  atlasUrl: string
  bulkyWasteFormUrl: string
  releaseApiUrl: string
  signalsBaseUrl: string
}

enum ApiUrls {
  apiAcc = 'https://api-test-backend.luscinia-solutions.com/api/v1',
  apiLocal = 'http://localhost:8000/api/v1',
  apiProd = 'https://api-backend.luscinia-solutions.com/api/v1',
  releaseApiAcc = 'https://api-test-modules.luscinia-solutions.com/api/v1',
  releaseApiLocal = 'http://localhost:9000/api/v1',
  releaseApiProd = 'https://api-modules.luscinia-solutions.com/api/v1',
}

enum ExternalApiUrls {
  atlasProd = 'https://api.data.amsterdam.nl/atlas',
  bulkyWasteFormProd = 'https://formulieren.amsterdam.nl/TriplEforms/Directregelen/formulier/nl-NL/evAmsterdam/grofafval.aspx',
  signalsBaseAcc = 'https://acc.app.meldingen.amsterdam.nl',
  signalsBaseProd = 'https://app.meldingen.amsterdam.nl',
}

export const environments: Record<Environment, EnvironmentConfig> = {
  [Environment.development]: {
    apiUrl: ApiUrls.apiLocal,
    atlasUrl: ExternalApiUrls.atlasProd,
    bulkyWasteFormUrl: ExternalApiUrls.bulkyWasteFormProd,
    releaseApiUrl: ApiUrls.releaseApiLocal,
    signalsBaseUrl: ExternalApiUrls.signalsBaseAcc,
  },
  [Environment.acceptance]: {
    apiUrl: ApiUrls.apiAcc,
    atlasUrl: ExternalApiUrls.atlasProd,
    bulkyWasteFormUrl: ExternalApiUrls.bulkyWasteFormProd,
    releaseApiUrl: ApiUrls.releaseApiAcc,
    signalsBaseUrl: ExternalApiUrls.signalsBaseAcc,
  },
  [Environment.production]: {
    apiUrl: ApiUrls.apiProd,
    atlasUrl: ExternalApiUrls.atlasProd,
    bulkyWasteFormUrl: ExternalApiUrls.bulkyWasteFormProd,
    releaseApiUrl: ApiUrls.releaseApiProd,
    signalsBaseUrl: ExternalApiUrls.signalsBaseProd,
  },
  [Environment.custom]: {
    apiUrl: ApiUrls.apiLocal,
    atlasUrl: ExternalApiUrls.atlasProd,
    bulkyWasteFormUrl: ExternalApiUrls.bulkyWasteFormProd,
    releaseApiUrl: ApiUrls.releaseApiLocal,
    signalsBaseUrl: ExternalApiUrls.signalsBaseAcc,
  },
}

export const getEnvironment = (
  environment: Environment,
  custom: Partial<EnvironmentConfig> = {},
) => {
  if (environment === Environment.custom) {
    return {...environments[environment], ...custom}
  }

  return environments[environment]
}
