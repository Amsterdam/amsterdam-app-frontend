import {skipToken} from '@reduxjs/toolkit/query'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useModuleBasedSelectedAddress} from '@/modules/address/hooks/useModuleBasedSelectedAddress'
import {ModuleSlug} from '@/modules/slugs'
import {WasteContainerRouteName} from '@/modules/waste-container/routes'
import {useGetWasteCardQuery} from '@/modules/waste-container/service'
import {ReduxKey} from '@/store/types/reduxKey'

export const AddWasteCardButton = () => {
  const {navigate} = useNavigation()
  const {address} = useModuleBasedSelectedAddress(ReduxKey.wasteGuide)

  const {data} = useGetWasteCardQuery(
    address?.postcode
      ? {
          postal_code: address?.postcode,
        }
      : skipToken,
  )

  return data?.has_container ? (
    <Button
      iconName="add"
      label="Afvalpas toevoegen"
      onPress={() =>
        navigate(ModuleSlug['waste-container'], {
          screen: WasteContainerRouteName.addWasteCard,
        })
      }
      testID="WasteGuideAddWasteCardButton"
      variant="secondary"
    />
  ) : null
}
