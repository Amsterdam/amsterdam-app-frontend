import {useLayoutEffect} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Fraction} from '@/modules/waste-guide/components/Fraction'
import {useGetWasteGuide} from '@/modules/waste-guide/hooks/useGetWasteGuide'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'

type Props = NavigationProps<WasteGuideRouteName.wasteGuideFraction>

export const WasteGuideFractionScreen = ({navigation, route}: Props) => {
  const {fractionCode} = route.params
  const {wasteGuide} = useGetWasteGuide()
  const fraction = wasteGuide?.waste_types.find(
    wasteType => wasteType.code === fractionCode,
  )

  useLayoutEffect(() => {
    if (!fraction) {
      return
    }

    navigation.setOptions({
      headerTitle: fraction.label,
    })
  }, [fraction, navigation])

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
