import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {SecurityCode} from '@/modules/city-pass/components/details/SecurityCode'
import {CityPassRouteName} from '@/modules/city-pass/routes'

type Props = NavigationProps<CityPassRouteName.securityCode>

export const SecurityCodeScreen = ({route}: Props) => {
  const {id} = route.params ?? {}

  return id ? (
    <Screen testID="CityPassSecurityCodeScreen">
      <SecurityCode id={id} />
    </Screen>
  ) : null
}
