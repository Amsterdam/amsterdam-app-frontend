import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {OpenWasteContainerRouteName} from '@/modules/open-waste-container/routes'
import {ModuleSlug} from '@/modules/slugs'

export const AddWasteCardButton = () => {
  const {navigate} = useNavigation()

  return (
    <Button
      iconName="add"
      label="Afvalpas toevoegen"
      onPress={() =>
        navigate(ModuleSlug['open-waste-container'], {
          screen: OpenWasteContainerRouteName.addWasteCard,
        })
      }
      testID="WasteGuideAddWasteCardButton"
      variant="secondary"
    />
  )
}
