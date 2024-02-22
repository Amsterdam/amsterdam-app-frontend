import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {StylisticSearchField} from '@/components/ui/forms/SearchField'
import {TestProps} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'

type Props = TestProps

export const SearchFieldNavigator = ({testID}: Props) => {
  const navigation = useNavigation<ConstructionWorkRouteName>()

  return (
    <PressableBase
      accessibilityRole="button"
      onPress={() => navigation.navigate(ConstructionWorkRouteName.search)}
      testID={testID}>
      <StylisticSearchField
        label="Zoek in werkzaamheden"
        testID={`${testID}SearchField`}
      />
    </PressableBase>
  )
}
