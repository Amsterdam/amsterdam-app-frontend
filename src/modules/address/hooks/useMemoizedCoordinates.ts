import {useMemo} from 'react'
import {Coordinates} from '@/modules/address//types'

export const useMemoizedCoordinates = (coordinates?: Coordinates) =>
  useMemo(() => {
    if (coordinates?.lat === undefined || coordinates?.lon === undefined) {
      return
    }

    return {lat: coordinates.lat, lon: coordinates.lon} as Coordinates
  }, [coordinates?.lat, coordinates?.lon])
