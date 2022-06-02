export enum Environment {
  Development = 0,
  Acceptance = 1,
  Production = 2,
  Custom = 3,
}

export type EnvironmentConfig = {
  apiUrl: string
  atlasUrl: string
  bulkyWasteFormUrl: string
  modulesApiUrl: string
  name: 'Development' | 'Acceptance' | 'Production' | 'Custom'
  signalsBaseUrl: string
}

enum ApiUrls {
  apiLocal = 'http://localhost:8000/api/v1',
  apiAcc = 'https://api-test-backend.luscinia-solutions.com/api/v1',
  apiProd = 'https://api-backend.luscinia-solutions.com/api/v1',
  modulesApiLocal = 'http://localhost:9000/api/v1',
  modulesApiAcc = 'https://api-test-modules.luscinia-solutions.com/api/v1',
  modulesApiProd = 'https://api-modules.luscinia-solutions.com/api/v1',
}

enum ExternalApiUrls {
  atlasProd = 'https://api.data.amsterdam.nl/atlas',
  bulkyWasteFormProd = 'https://formulieren.amsterdam.nl/TriplEforms/Directregelen/formulier/nl-NL/evAmsterdam/grofafval.aspx',
  signalsBaseAcc = 'https://acc.app.meldingen.amsterdam.nl',
  signalsBaseProd = 'https://app.meldingen.amsterdam.nl',
}

export const environments: Record<Environment, EnvironmentConfig> = {
  [Environment.Development]: {
    name: 'Development',
    apiUrl: ApiUrls.apiLocal,
    atlasUrl: ExternalApiUrls.atlasProd,
    bulkyWasteFormUrl: ExternalApiUrls.bulkyWasteFormProd,
    modulesApiUrl: ApiUrls.modulesApiLocal,
    signalsBaseUrl: ExternalApiUrls.signalsBaseAcc,
  },
  [Environment.Acceptance]: {
    name: 'Acceptance',
    apiUrl: ApiUrls.apiAcc,
    atlasUrl: ExternalApiUrls.atlasProd,
    bulkyWasteFormUrl: ExternalApiUrls.bulkyWasteFormProd,
    modulesApiUrl: ApiUrls.modulesApiAcc,
    signalsBaseUrl: ExternalApiUrls.signalsBaseAcc,
  },
  [Environment.Production]: {
    name: 'Production',
    apiUrl: ApiUrls.apiProd,
    atlasUrl: ExternalApiUrls.atlasProd,
    bulkyWasteFormUrl: ExternalApiUrls.bulkyWasteFormProd,
    modulesApiUrl: ApiUrls.modulesApiProd,
    signalsBaseUrl: ExternalApiUrls.signalsBaseProd,
  },
  [Environment.Custom]: {
    name: 'Custom',
    apiUrl: ApiUrls.apiLocal,
    atlasUrl: ExternalApiUrls.atlasProd,
    bulkyWasteFormUrl: ExternalApiUrls.bulkyWasteFormProd,
    modulesApiUrl: ApiUrls.modulesApiLocal,
    signalsBaseUrl: ExternalApiUrls.signalsBaseAcc,
  },
}

export const getEnvironment = (
  environment: Environment,
  custom: Partial<EnvironmentConfig> = {},
) => {
  if (environment === Environment.Custom) {
    return {...environments[environment], ...custom}
  }

  return environments[environment]
}
