export enum VoteEndpointName {
  locations = 'locations',
}

export type PollingStation = {
  address1: string
  address2: string
  categories: VoteCategory[]
  id: number
  isOpen: boolean
  lastUpdate: {
    state: number
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

export enum VoteCategory {
  disabledParking = 'disabled_parking',
  ptWheelchair = 'pt_wheelchair',
  pysicalLimitation = 'pysical_limitation',
  visionImpaired = 'vision_impaired',
}

export type PollingStationsResponse = PollingStation[]

export enum PollingStationsListBottomSheetVariant {
  address = 'address',
  pollingStation = 'pollingStation',
}
