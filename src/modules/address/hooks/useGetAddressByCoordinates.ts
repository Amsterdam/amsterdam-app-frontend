import {useCallback, useState} from 'react'
import {useAddressForCoordinates} from '@/modules/address/hooks/useAddressForCoordinates'
import {useGetCurrentCoordinates} from '@/modules/address/hooks/useGetCurrentCoordinates'
import {Coordinates} from '@/modules/address/types'

export const useGetAddressByCoordinates = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | undefined>()
  const getCurrentCoordinates = useGetCurrentCoordinates()
  const {data, ...rest} = useAddressForCoordinates(coordinates)

  const getCoordinates = useCallback(() => {
    void getCurrentCoordinates().then(setCoordinates)
  }, [getCurrentCoordinates])

  return {
    address: data,
    getCoordinates,
    ...rest,
  }
}
