enum Environment {
  Development,
  Acceptance,
  Production,
}

type EnvironmentConfig = {
  allowClearingAsyncStorage: Boolean
  apiUrl: string
  bulkyWasteFormUrl: string
  debug: boolean
  name: 'development' | 'acceptance' | 'production'
  signalsBaseUrl: string
}

const environments: Record<Environment, EnvironmentConfig> = {
  [Environment.Development]: {
    allowClearingAsyncStorage: true,
    apiUrl: 'http://localhost:8000/api/v1',
    bulkyWasteFormUrl:
      'https://formulieren.amsterdam.nl/TriplEforms/Directregelen/formulier/nl-NL/evAmsterdam/grofafval.aspx',
    debug: true,
    name: 'development',
    signalsBaseUrl: 'https://acc.app.meldingen.amsterdam.nl',
  },
  [Environment.Acceptance]: {
    allowClearingAsyncStorage: false,
    apiUrl: 'https://api.backend.luscinia-solutions.com/api/v1',
    bulkyWasteFormUrl:
      'https://formulieren.amsterdam.nl/TriplEforms/Directregelen/formulier/nl-NL/evAmsterdam/grofafval.aspx',
    debug: false,
    name: 'acceptance',
    signalsBaseUrl: 'https://acc.app.meldingen.amsterdam.nl',
  },
  [Environment.Production]: {
    allowClearingAsyncStorage: false,
    apiUrl: 'https://api.backend.luscinia-solutions.com/api/v1',
    bulkyWasteFormUrl:
      'https://formulieren.amsterdam.nl/TriplEforms/Directregelen/formulier/nl-NL/evAmsterdam/grofafval.aspx',
    debug: false,
    name: 'production',
    signalsBaseUrl: 'https://app.meldingen.amsterdam.nl',
  },
}

export const getEnvironment = () => {
  return environments[environment]
}

const environment: Environment = Environment.Acceptance
