import {type TestProps} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {RequestTopTaskButton} from '@/modules/address/components/location/RequestTopTaskButton'
import {AddressRouteName} from '@/modules/address/routes'
import {useLocationType} from '@/modules/address/slice'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'

type Props = {highAccuracyPurposeKey?: HighAccuracyPurposeKey} & TestProps

export const ShareLocationTopTaskButton = ({
  highAccuracyPurposeKey,
  testID,
}: Props) => {
  const locationType = useLocationType()
  const {navigate} = useNavigation()

  const TopTaskButton =
    typeof locationType === 'undefined'
      ? RequestTopTaskButton
      : locationType === 'address'
        ? AddressTopTaskButton
        : LocationTopTaskButton

  return (
    <TopTaskButton
      hasTitleIcon
      onPress={() => {
        navigate(ModuleSlug.address, {
          screen: AddressRouteName.chooseAddress,
          params: {
            highAccuracyPurposeKey,
          },
        })
      }}
      testID={testID}
    />
  )
}
