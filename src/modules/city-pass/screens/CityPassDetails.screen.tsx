import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {useRoute} from '@/hooks/navigation/useRoute'
import SportsImage from '@/modules/city-pass/assets/sports.svg'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'
import {CityPassDetails} from '@/modules/city-pass/components/details/CityPassDetails'
import {CityPassRouteName} from '@/modules/city-pass/routes'

export const CityPassDetailsScreen = () => {
  const {
    params: {passNumber},
  } = useRoute<CityPassRouteName.cityPassDetails>()

  return (
    <CityPassLoginBoundaryScreen testID="CityPassCityPassScreen">
      <CityPassDetails passNumber={passNumber} />
      <FigureWithFacadesBackground testID="CityPassStartImage">
        <SportsImage />
      </FigureWithFacadesBackground>
    </CityPassLoginBoundaryScreen>
  )
}
