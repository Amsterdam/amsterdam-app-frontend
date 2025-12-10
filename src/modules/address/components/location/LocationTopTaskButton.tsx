import {StatefulTopTaskButton} from '@/components/ui/buttons/StatefulTopTaskButton'
import {type TestProps} from '@/components/ui/types'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useLocation} from '@/modules/address/slice'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {type LogProps} from '@/processes/piwik/types'
import {Permissions} from '@/types/permissions'

type Props = {
  hasTitleIcon?: boolean
  highAccuracyPurposeKey?: HighAccuracyPurposeKey
  onPress: () => void
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
  hasTitleIcon,
  onPress,
  testID,
  ...props
}: Props) => {
  const {hasPermission} = usePermission(Permissions.location)
  const {isGettingLocation, getLocationIsError, location} = useLocation()

  return (
    <StatefulTopTaskButton
      iconName="mapLocationIos"
      iconSize="lg"
      isError={getLocationIsError}
      isLoading={isGettingLocation}
      logName={`${testID}${hasPermission && location ? 'SelectLocation' : 'AddLocation'}`}
      onPress={onPress}
      testID={testID}
      text={getText(!!isGettingLocation, hasPermission, location?.addressLine1)}
      title="Mijn huidige locatie"
      titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
      {...props}
    />
  )
}
