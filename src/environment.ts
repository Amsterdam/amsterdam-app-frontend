export enum Environment {
  Development,
  Acceptance,
  Production,
  Custom,
}

export type EnvironmentConfig = {
  apiUrl: string
  atlasUrl: string
  bulkyWasteFormUrl: string
  modulesApiUrl: string
  name: 'development' | 'acceptance' | 'production' | 'custom'
  signalsBaseUrl: string
}

export const environments: Record<Environment, EnvironmentConfig> = {
  [Environment.Development]: {
    apiUrl: 'http://localhost:8000/api/v1',
    atlasUrl: 'https://api.data.amsterdam.nl/atlas',
    bulkyWasteFormUrl:
      'https://formulieren.amsterdam.nl/TriplEforms/Directregelen/formulier/nl-NL/evAmsterdam/grofafval.aspx',
    modulesApiUrl: 'https://api-test-modules.luscinia-solutions.com/api/v1',
    name: 'development',
    signalsBaseUrl: 'https://acc.app.meldingen.amsterdam.nl',
  },
  [Environment.Acceptance]: {
    apiUrl: 'https://api-test-backend.luscinia-solutions.com/api/v1',
    atlasUrl: 'https://api.data.amsterdam.nl/atlas',
    bulkyWasteFormUrl:
      'https://formulieren.amsterdam.nl/TriplEforms/Directregelen/formulier/nl-NL/evAmsterdam/grofafval.aspx',
    modulesApiUrl: 'https://api-test-modules.luscinia-solutions.com/api/v1',
    name: 'acceptance',
    signalsBaseUrl: 'https://acc.app.meldingen.amsterdam.nl',
  },
  [Environment.Production]: {
    apiUrl: 'https://api-backend.luscinia-solutions.com/api/v1',
    atlasUrl: 'https://api.data.amsterdam.nl/atlas',
    bulkyWasteFormUrl:
      'https://formulieren.amsterdam.nl/TriplEforms/Directregelen/formulier/nl-NL/evAmsterdam/grofafval.aspx',
    modulesApiUrl: 'https://api-test-modules.luscinia-solutions.com/api/v1',
    name: 'production',
    signalsBaseUrl: 'https://app.meldingen.amsterdam.nl',
  },
  [Environment.Custom]: {
    apiUrl: 'https://api.backend.luscinia-solutions.com/api/v1',
    atlasUrl: 'https://api.data.amsterdam.nl/atlas',
    bulkyWasteFormUrl:
      'https://formulieren.amsterdam.nl/TriplEforms/Directregelen/formulier/nl-NL/evAmsterdam/grofafval.aspx',
    modulesApiUrl: 'https://api-modules.luscinia-solutions.com/api/v1',
    name: 'custom',
    signalsBaseUrl: 'https://acc.app.meldingen.amsterdam.nl',
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
