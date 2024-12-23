import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {CityPasses} from '@/modules/city-pass/components/card-display/CityPasses'
import {CityPassRouteName} from '@/modules/city-pass/routes'

type Props = NavigationProps<CityPassRouteName.cityPasses>

export const CityPassesScreen = ({route}: Props) => {
  const {index} = route.params || {}

  return (
    <Screen testID="CityPassCityPassesScreen">
      <CityPasses index={index} />
    </Screen>
  )
}
