import {SearchField} from '@/components/ui/forms/SearchField'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'

export const SearchFieldNavigator = () => {
  const navigation = useNavigation<ConstructionWorkRouteName>()

  return (
    <SearchField
      onFocus={() => navigation.navigate(ConstructionWorkRouteName.search)}
      placeholder="Zoek in werkzaamheden"
      testID="ConstructionWorkProjectsNavigatorSearchField"
    />
  )
}
