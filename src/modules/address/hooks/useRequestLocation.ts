import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useCallback, useEffect, useState} from 'react'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useGetCurrentPosition} from '@/hooks/useGetCurrentPosition'
import {useGetAddressForCoordinatesQuery} from '@/modules/address/service'
import {addLastKnownLocationAddress} from '@/modules/address/slice'
import {transformAddressApiResponse} from '@/modules/address/utils/transformAddressApiResponse'
import {setAlert} from '@/store/slices/alert'

const alertConfig = {
  testID: 'RequestLocationFailedAlert',
  closeType: AlertCloseType.withoutButton,
  content: {
    text: 'Het is niet gelukt uw locatie op te vragen.',
    title: 'Opvragen locatie mislukt',
  },
  variant: AlertVariant.negative,
  withIcon: false,
}

export const useRequestLocation = () => {
  const getCurrentPosition = useGetCurrentPosition()
  const [coordinates, setCoordinates] = useState<[number, number]>()
  const dispatch = useDispatch()

  const {data, isError} = useGetAddressForCoordinatesQuery(
    coordinates ? {lat: coordinates[0], lon: coordinates[1]} : skipToken,
  )

  useEffect(() => {
    if (data?.response.docs[0]) {
      dispatch(
        addLastKnownLocationAddress(
          transformAddressApiResponse(data?.response.docs[0]),
        ),
      )
    }
  }, [data, dispatch])

  useEffect(() => {
    if (isError) {
      dispatch(setAlert(alertConfig))
    }
  }, [isError, dispatch])

  return useCallback(() => {
    setCoordinates(undefined)
    getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        setCoordinates([latitude, longitude])
      },
      () => {
        dispatch(setAlert(alertConfig))
      },
    )
  }, [dispatch, getCurrentPosition])
}
