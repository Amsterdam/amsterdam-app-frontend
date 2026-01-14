import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {CityPasses} from '@/modules/city-pass/components/card-display/CityPasses'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {useOpenSurveyOnBlur} from '@/modules/survey/exports/useOpenSurveyOnBlur'

type Props = NavigationProps<CityPassRouteName.cityPasses>

export const CityPassesScreen = ({route}: Props) => {
  const {index} = route.params || {}

  useOpenSurveyOnBlur('city-pass-show-pass')

  return (
    <Screen
      scroll={false}
      testID="CityPassCityPassesScreen">
      <CityPasses index={index} />
    </Screen>
  )
}
