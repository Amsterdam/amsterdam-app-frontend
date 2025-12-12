import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {CityPassBottomSheetVariant} from '@/modules/city-pass/bottomsheet/bottomsheetVariants'
import {CityPasses} from '@/modules/city-pass/components/card-display/CityPasses'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {useOpenBottomsheetIfSurveyShouldShow} from '@/modules/survey/exports/useOpenBottomsheetIfSurveyShouldShow'

type Props = NavigationProps<CityPassRouteName.cityPasses>

export const CityPassesScreen = ({route}: Props) => {
  const {index} = route.params || {}
  const openSurveyBottomsheet = useOpenBottomsheetIfSurveyShouldShow(
    'city-pass-show-pass',
  )

  useBlurEffect(() => {
    setTimeout(
      () => openSurveyBottomsheet(CityPassBottomSheetVariant.survey),
      500,
    )
  })

  return (
    <Screen
      scroll={false}
      testID="CityPassCityPassesScreen">
      <CityPasses index={index} />
    </Screen>
  )
}
