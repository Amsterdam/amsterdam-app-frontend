export enum ElectionsEndpointName {
  pollingStations = 'pollingStations',
}

export enum ElectionsState {
  calm = 1,
  medium = 2,
  busy = 3,
  unknown = 0,
}

export type PollingStation = {
  address1: string
  address2: string
  categories: ElectionsCategory[]
  id: number
  isOpen: boolean
  lastUpdate: {
    state: ElectionsState
    time: string | null
  }
  name: string
  numbers: string[]
  openingTimes: number[][]
  position: {
    lat: number
    lng: number
  }
}

export enum ElectionsCategory {
  disabledParking = 'disabled_parking',
  hearingImpaired = 'hearing_impaired',
  ptWheelchair = 'pt_wheelchair',
  pysicalLimitation = 'pysical_limitation',
  readingAid = 'reading_aid',
  visionImpaired = 'vision_impaired',
  wheelchairHelp = 'wheelchair_help',
}

export type PollingStationsResponse = PollingStation[]
