import {useLayoutEffect} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Fraction} from '@/modules/waste-guide/components/Fraction'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'

type Props = NavigationProps<WasteGuideRouteName.wasteGuideFraction>

export const WasteGuideFractionScreen = ({navigation, route}: Props) => {
  const {fraction} = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: fraction.label,
    })
  }, [fraction.label, navigation])

  if (!fraction) {
    return null
  }

  return (
    <Screen testID="WasteGuideFractionScreen">
      <Box>
        <Fraction
          fraction={fraction}
          testID="WasteGuideFraction"
        />
      </Box>
    </Screen>
  )
}
