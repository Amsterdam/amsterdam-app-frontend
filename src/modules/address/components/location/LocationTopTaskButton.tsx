import {useCallback, useEffect, useState} from 'react'
import {StatefulTopTaskButton} from '@/components/ui/buttons/StatefulTopTaskButton'
import {type TestProps} from '@/components/ui/types'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useAddressForCoordinates} from '@/modules/address/hooks/useAddressForCoordinates'
import {useGetCurrentCoordinates} from '@/modules/address/hooks/useGetCurrentCoordinates'
import {addLastKnownCoordinates} from '@/modules/address/slice'
import {Coordinates, HighAccuracyPurposeKey} from '@/modules/address/types'
import {type LogProps} from '@/processes/piwik/types'
import {Permissions} from '@/types/permissions'
import {getPropertyFromMaybeObject} from '@/utils/object'

type Props = {
  hasTitleIcon?: boolean
  highAccuracyPurposeKey?: HighAccuracyPurposeKey
  onPress: () => void
  shouldRequestPermission?: boolean
} & TestProps &
  LogProps

const getText = (
  loading: boolean,
  hasPermission: boolean,
  addressLine1?: string,
) => {
  if (loading) {
    return '...'
  }

  if (addressLine1 && hasPermission) {
    return `In de buurt van ${addressLine1}`
  }

  return 'Geef uw locatie door'
}

export const LocationTopTaskButton = ({
  shouldRequestPermission,
  hasTitleIcon,
  highAccuracyPurposeKey,
  onPress,
  testID,
  ...props
}: Props) => {
  const dispatch = useDispatch()
  const [currentCoordinates, setCurrentCoordinates] = useState<Coordinates>()
  const [requestingCurrentCoordinates, setRequestingCurrentCoordinates] =
    useState(false)
  const [hasTechnicalError, setHasTechnicalError] = useState(false)
  const {firstAddress: address, isFetching: addressForCoordinatesIsFetching} =
    useAddressForCoordinates({coordinates: currentCoordinates})

  // TODO: switch to useGetAddressByCoordinates
  const getCurrentCoordinates = useGetCurrentCoordinates(highAccuracyPurposeKey)

  const {hasPermission, requestPermission: requestLocationPermission} =
    usePermission(Permissions.location)

  const getCoordinates = useCallback(async () => {
    try {
      setRequestingCurrentCoordinates(true)

      const coordinates = await getCurrentCoordinates()

      if (coordinates) {
        dispatch(addLastKnownCoordinates(coordinates))
      }

      setCurrentCoordinates(coordinates)
    } catch (error) {
      const isTechnicalError = getPropertyFromMaybeObject(
        error,
        'isTechnicalError',
      )

      if (isTechnicalError) {
        setHasTechnicalError(true)
      }
    } finally {
      setRequestingCurrentCoordinates(false)
    }
  }, [dispatch, getCurrentCoordinates])

  useEffect(() => {
    setHasTechnicalError(false)

    if (!hasPermission) {
      if (shouldRequestPermission) {
        void requestLocationPermission().then(granted => {
          if (granted) {
            void getCoordinates()
          }
        })
      }

      return
    }

    if (!requestingCurrentCoordinates) {
      void getCoordinates()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRequestPermission])

  const isLoading =
    (addressForCoordinatesIsFetching || requestingCurrentCoordinates) &&
    hasPermission

  return (
    <StatefulTopTaskButton
      iconName="location"
      isError={hasTechnicalError}
      isLoading={isLoading}
      logName={`${testID}${hasPermission && currentCoordinates ? 'SelectLocation' : 'AddLocation'}`}
      onPress={onPress}
      testID={testID}
      text={getText(isLoading, hasPermission, address?.addressLine1)}
      title="Mijn huidige locatie"
      titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
      {...props}
    />
  )
}
