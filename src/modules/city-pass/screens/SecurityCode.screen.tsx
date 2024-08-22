import {NavigationProps} from '@/app/navigation/types'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'
import {SecurityCode} from '@/modules/city-pass/components/SecurityCode'
import {CityPassRouteName} from '@/modules/city-pass/routes'

type Props = NavigationProps<CityPassRouteName.securityCode>

export const SecurityCodeScreen = ({route}: Props) => {
  const {id} = route.params ?? {}

  return id ? (
    <CityPassLoginBoundaryScreen testID="CityPassSecurityCodeScreen">
      <SecurityCode id={id} />
    </CityPassLoginBoundaryScreen>
  ) : null
}
