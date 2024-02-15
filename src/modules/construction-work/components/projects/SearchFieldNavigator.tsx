import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {StylisticSearchField} from '@/components/ui/forms/SearchField'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'

export const SearchFieldNavigator = () => {
  const navigation = useNavigation<ConstructionWorkRouteName>()

  return (
    <PressableBase
      accessibilityRole="button"
      onPress={() => navigation.navigate(ConstructionWorkRouteName.search)}>
      <StylisticSearchField />
    </PressableBase>
  )
}
