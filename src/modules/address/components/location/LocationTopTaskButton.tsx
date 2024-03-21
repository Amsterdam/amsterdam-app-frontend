import {useEffect, useState} from 'react'
import {StatefulTopTaskButton} from '@/components/ui/buttons/StatefulTopTaskButton'
import {type TestProps} from '@/components/ui/types'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useGetAddressByCoordinates} from '@/modules/address/hooks/useGetAddressByCoordinates'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
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
  const [hasTechnicalError, setHasTechnicalError] = useState(false)

  const {
    getCoordinates: getCurrentCoordinates,
    firstAddress: address,
    isGettingAddressForCoordinates,
  } = useGetAddressByCoordinates(highAccuracyPurposeKey)

  const {hasPermission} = usePermission(Permissions.location)

  useEffect(() => {
    setHasTechnicalError(false)

    if (!hasPermission || isGettingAddressForCoordinates) {
      return
    }

    getCurrentCoordinates().catch(error => {
      const isTechnicalError = getPropertyFromMaybeObject(
        error,
        'isTechnicalError',
      )

      if (isTechnicalError) {
        setHasTechnicalError(true)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRequestPermission])

  const isLoading = isGettingAddressForCoordinates && hasPermission

  return (
    <StatefulTopTaskButton
      iconName="location"
      isError={hasTechnicalError}
      isLoading={isLoading}
      logName={`${testID}${hasPermission && address ? 'SelectLocation' : 'AddLocation'}`}
      onPress={onPress}
      testID={testID}
      text={getText(isLoading, hasPermission, address?.addressLine1)}
      title="Mijn huidige locatie"
      titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
      {...props}
    />
  )
}
