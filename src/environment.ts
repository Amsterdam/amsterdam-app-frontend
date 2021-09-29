enum Environment {
  Development,
  Acceptance,
}

type EnvironmentConfig = {
  apiUrl: string
  allowClearingAddress: Boolean
  bulkyWasteFormUrl: string
  name: 'development' | 'acceptance'
}

const environments: Record<Environment, EnvironmentConfig> = {
  [Environment.Development]: {
    apiUrl: 'http://localhost:8000/api/v1',
    allowClearingAddress: true,
    bulkyWasteFormUrl:
      'https://formulieren.amsterdam.nl/TriplEforms/Directregelen/formulier/nl-NL/evAmsterdam/grofafval.aspx',
    name: 'development',
  },
  [Environment.Acceptance]: {
    apiUrl: 'https://api.backend.luscinia-solutions.com/api/v1',
    allowClearingAddress: false,
    bulkyWasteFormUrl:
      'https://formulieren.amsterdam.nl/TriplEforms/Directregelen/formulier/nl-NL/evAmsterdam/grofafval.aspx',
    name: 'acceptance',
  },
}

export const getEnvironment = () => {
  return environments[environment]
}

const environment: Environment = Environment.Acceptance
