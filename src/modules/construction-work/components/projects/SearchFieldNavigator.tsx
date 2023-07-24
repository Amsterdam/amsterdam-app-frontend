import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParams} from '@/app/navigation/types'
import {SearchField} from '@/components/ui/forms'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'

export const SearchFieldNavigator = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, ConstructionWorkRouteName>
    >()

  return (
    <SearchField
      onFocus={() => navigation.navigate(ConstructionWorkRouteName.search)}
      placeholder="Zoek in werkzaamheden"
      testID="ConstructionWorkProjectsNavigatorSearchField"
    />
  )
}
