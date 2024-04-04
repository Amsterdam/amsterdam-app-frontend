import {useState, useCallback, useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useGetCoordinates} from '@/modules/address/hooks/useGetCoordinates'
import {useLocation, setGetLocationIsError} from '@/modules/address/slice'
import {Coordinates} from '@/modules/address/types'
import {getPropertyFromMaybeObject} from '@/utils/object'

export const useGetCoordinatesForLocationQuery = () => {
  const dispatch = useDispatch()
  const [coordinatesForLocationQuery, setCoordinatesForLocationQuery] =
    useState<Coordinates | undefined>()
  const [isGettingCoordinates, setIsGettingCoordinates] = useState(false)
  const {getLocation, highAccuracyPurposeKey} = useLocation()
  const getCoordinates = useGetCoordinates(highAccuracyPurposeKey)

  const getCoordinatesForLocationQuery = useCallback(async () => {
    try {
      setIsGettingCoordinates(true)
      const coordinates = await getCoordinates()

      setCoordinatesForLocationQuery(coordinates)
    } catch (error) {
      const isTechnicalError = getPropertyFromMaybeObject(
        error,
        'isTechnicalError',
      )

      if (isTechnicalError) {
        dispatch(setGetLocationIsError(true))
      }
    } finally {
      setIsGettingCoordinates(false)
    }
  }, [dispatch, getCoordinates])

  useEffect(() => {
    if (getLocation) {
      void getCoordinatesForLocationQuery()
    }
  }, [getCoordinatesForLocationQuery, getLocation])

  return {
    coordinatesForLocationQuery,
    isGettingCoordinates,
  }
}
