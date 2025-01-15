import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ModuleSlug} from '@/modules/slugs'
import {OpenWasteContainerRouteName} from '@/modules/waste-container/routes'

export const AddWasteCardButton = () => {
  const {navigate} = useNavigation()

  return (
    <Button
      iconName="add"
      label="Afvalpas toevoegen"
      onPress={() =>
        navigate(ModuleSlug['waste-container'], {
          screen: OpenWasteContainerRouteName.addWasteCard,
        })
      }
      testID="WasteGuideAddWasteCardButton"
      variant="secondary"
    />
  )
}
