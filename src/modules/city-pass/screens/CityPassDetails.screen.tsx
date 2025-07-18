import {NavigationProps} from '@/app/navigation/types'
import {Tip} from '@/components/features/product-tour/types'
import {Screen} from '@/components/features/screen/Screen'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import SportsImage from '@/modules/city-pass/assets/sports.svg'
import {CityPassDetails} from '@/modules/city-pass/components/details/CityPassDetails'
import {CityPassDetailsMenu} from '@/modules/city-pass/components/details/CityPassDetailsMenu'
import {CityPassRouteName} from '@/modules/city-pass/routes'

type Props = NavigationProps<CityPassRouteName.cityPassDetails>

export const CityPassDetailsScreen = ({route}: Props) => {
  const {params} = route
  const {passNumber} = params || {}

  return (
    <Screen
      stickyHeader={<CityPassDetailsMenu passNumber={passNumber} />}
      testID="CityPassCityPassScreen"
      trackScroll={[Tip.cityPassSecurityCode]}>
      <CityPassDetails passNumber={passNumber} />
      <FigureWithFacadesBackground testID="CityPassStartImage">
        <SportsImage />
      </FigureWithFacadesBackground>
    </Screen>
  )
}
