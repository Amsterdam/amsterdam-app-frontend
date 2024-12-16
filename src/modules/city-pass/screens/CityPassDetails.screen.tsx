import {Tip} from '@/components/features/product-tour/types'
import {Screen} from '@/components/features/screen/Screen'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {useRoute} from '@/hooks/navigation/useRoute'
import SportsImage from '@/modules/city-pass/assets/sports.svg'
import {CityPassDetails} from '@/modules/city-pass/components/details/CityPassDetails'
import {CityPassRouteName} from '@/modules/city-pass/routes'

export const CityPassDetailsScreen = () => {
  const {
    params: {passNumber},
  } = useRoute<CityPassRouteName.cityPassDetails>()

  return (
    <Screen
      testID="CityPassCityPassScreen"
      trackScroll={[Tip.cityPassSecurityCode]}>
      <CityPassDetails passNumber={passNumber} />
      <FigureWithFacadesBackground testID="CityPassStartImage">
        <SportsImage />
      </FigureWithFacadesBackground>
    </Screen>
  )
}
