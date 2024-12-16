import {Screen} from '@/components/features/screen/Screen'
import {useRoute} from '@/hooks/navigation/useRoute'
import {SecurityCode} from '@/modules/city-pass/components/details/SecurityCode'

export const SecurityCodeScreen = () => {
  const route = useRoute()
  const {id} = route.params ?? {}

  return id ? (
    <Screen testID="CityPassSecurityCodeScreen">
      <SecurityCode id={id} />
    </Screen>
  ) : null
}
