import {Pressable} from 'react-native'
import {StylisticSearchField} from '@/components/ui/forms/SearchField'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'

export const SearchFieldNavigator = () => {
  const navigation = useNavigation<ConstructionWorkRouteName>()

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => navigation.navigate(ConstructionWorkRouteName.search)}>
      <StylisticSearchField />
    </Pressable>
  )
}
