export enum WasteContainerEndpointName {
  getWasteCard = 'getWasteCard',
}

export type WasteContainerApi = {
  getWasteCard: {
    params: {
      house_number?: string
      postal_code: string
    }
    response: {
      district: string
      has_container: boolean
      pass_number: string
    }
  }
}
