import {AddressState} from '@/modules/address/slice'
import {AddressCity} from '@/modules/address/types'
import {PersistedStateTransformer} from '@/store/types'

type OldAdressState = {
  adres: string
  bagNummeraanduidingId: string
  bag_huisletter: string
  bag_toevoeging: string
  centroid?: [number, number]
  coordinates?: {
    lat: number
    lon: number
  }
  huisnummer: number
  postcode: string
  straatnaam: string
  woonplaats: AddressCity
}

export const persistedStateTransformers: PersistedStateTransformer<
  OldAdressState,
  AddressState
>[] = [
  {
    // Transform old state using Dutch keys and centroid rather than coordinates
    appVersion: '0.36.0',
    transform: oldAddressState => {
      const {
        adres,
        bag_toevoeging,
        bagNummeraanduidingId,
        woonplaats,
        centroid,
        coordinates,
        huisnummer,
        postcode,
        straatnaam,
      } = oldAddressState

      return {
        address: {
          addressText: adres,
          addition: bag_toevoeging,
          bagId: bagNummeraanduidingId,
          city: woonplaats,
          coordinates: coordinates ?? {
            lat: centroid?.[1] ?? 0,
            lon: centroid?.[0] ?? 0,
          },
          number: huisnummer,
          postcode,
          street: straatnaam,
        },
      }
    },
  },
]
