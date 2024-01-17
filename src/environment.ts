export enum Environment {
  acceptance = 'Acceptance',
  custom = 'Custom',
  development = 'Development',
  production = 'Production',
}

export type EnvironmentConfig = {
  addressUrl: string
  apiUrl: string
  bulkyWasteAppointmentUrl: string
  complaintUrl: string
  makeAppointmentWeespUrl: string
  modulesApiUrl: string
  reportProblemAmsterdamUrl: string
  seenonsScheduleWastePickupUrl: string
  wasteCollectionPointsUrl: string
  wasteContainersUrl: string
  wasteGuideUrl: string
}

enum ApiUrls {
  apiAcc = 'https://api-test-backend.app-amsterdam.nl/api/v1',
  apiCustomDefault = 'http://localhost:8000/api/v1',
  apiDev = 'https://api-dev-backend.app-amsterdam.nl/api/v1',
  apiProd = 'https://api-backend.app-amsterdam.nl/api/v1',
  modulesApiAcc = 'https://api-test-modules.app-amsterdam.nl/api/v1',
  modulesApiCustomDefault = 'http://localhost:9000/api/v1',
  modulesApiDev = 'https://api-dev-modules.app-amsterdam.nl/api/v1',
  modulesApiProd = 'https://api-modules.app-amsterdam.nl/api/v1',
  wasteGuideApiAcc = 'https://api-test-waste-guide.app-amsterdam.nl/api/v1',
  wasteGuideApiProd = 'https://api-waste-guide.app-amsterdam.nl/api/v1',
}

enum ExternalApiUrls {
  addressProd = 'https://api.pdok.nl/bzk/locatieserver/search/v3_1',
}

enum ExternalWebUrls {
  bulkyWasteAppointmentProd = 'https://formulieren.amsterdam.nl/TriplEforms/Directregelen/formulier/nl-NL/evAmsterdam/grofafval.aspx',
  complaintProd = 'https://formulieren.amsterdam.nl/tripleforms/DirectRegelen/formulier/nl-NL/evAmsterdam/Klachtenformulier.aspx',
  makeAppointmentWeespProd = 'https://formulieren.amsterdam.nl/TriplEforms/DirectRegelen/formulier/nl-NL/evAmsterdam/afspraakmakenweesp.aspx',
  reportProblemAmsterdamAcc = 'https://acc.app.meldingen.amsterdam.nl',
  reportProblemAmsterdamProd = 'https://app.meldingen.amsterdam.nl',
  seenonsScheduleWastePickupProd = 'https://afvalopafspraak.app.seenons.com',
  wasteCollectionPointsProd = 'https://kaart.amsterdam.nl/afvalpunten',
  wasteContainersProd = 'https://kaart.amsterdam.nl/afvalcontainers',
}

const sharedEnvironmentConfig: Pick<
  EnvironmentConfig,
  | 'addressUrl'
  | 'bulkyWasteAppointmentUrl'
  | 'complaintUrl'
  | 'makeAppointmentWeespUrl'
  | 'seenonsScheduleWastePickupUrl'
  | 'wasteCollectionPointsUrl'
  | 'wasteContainersUrl'
> = {
  addressUrl: ExternalApiUrls.addressProd,
  bulkyWasteAppointmentUrl: ExternalWebUrls.bulkyWasteAppointmentProd,
  complaintUrl: ExternalWebUrls.complaintProd,
  makeAppointmentWeespUrl: ExternalWebUrls.makeAppointmentWeespProd,
  seenonsScheduleWastePickupUrl: ExternalWebUrls.seenonsScheduleWastePickupProd,
  wasteCollectionPointsUrl: ExternalWebUrls.wasteCollectionPointsProd,
  wasteContainersUrl: ExternalWebUrls.wasteContainersProd,
}

export const environments: Record<Environment, EnvironmentConfig> = {
  [Environment.development]: {
    ...sharedEnvironmentConfig,
    apiUrl: ApiUrls.apiDev,
    modulesApiUrl: ApiUrls.modulesApiDev,
    reportProblemAmsterdamUrl: ExternalWebUrls.reportProblemAmsterdamAcc,
    wasteGuideUrl: ApiUrls.wasteGuideApiAcc,
  },
  [Environment.acceptance]: {
    ...sharedEnvironmentConfig,
    apiUrl: ApiUrls.apiAcc,
    modulesApiUrl: ApiUrls.modulesApiAcc,
    reportProblemAmsterdamUrl: ExternalWebUrls.reportProblemAmsterdamAcc,
    wasteGuideUrl: ApiUrls.wasteGuideApiAcc,
  },
  [Environment.production]: {
    ...sharedEnvironmentConfig,
    apiUrl: ApiUrls.apiProd,
    modulesApiUrl: ApiUrls.modulesApiProd,
    reportProblemAmsterdamUrl: ExternalWebUrls.reportProblemAmsterdamProd,
    wasteGuideUrl: ApiUrls.wasteGuideApiProd,
  },
  [Environment.custom]: {
    ...sharedEnvironmentConfig,
    apiUrl: ApiUrls.apiCustomDefault,
    modulesApiUrl: ApiUrls.modulesApiCustomDefault,
    reportProblemAmsterdamUrl: ExternalWebUrls.reportProblemAmsterdamAcc,
    wasteGuideUrl: ApiUrls.wasteGuideApiAcc,
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
