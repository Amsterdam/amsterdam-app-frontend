enum Environment {
  Development,
  Acceptance,
}

type EnvironmentConfig = {
  apiUrl: string
  name: string
}

const environments: Record<Environment, EnvironmentConfig> = {
  [Environment.Development]: {
    apiUrl: 'http://localhost:8000/api/v1',
    name: 'development',
  },
  [Environment.Acceptance]: {
    apiUrl: 'https://api.backend.luscinia-solutions.com/api/v1',
    name: 'acceptance',
  },
}

export const getEnvironment = () => {
  return environments[environment]
}

const environment: Environment = Environment.Development
