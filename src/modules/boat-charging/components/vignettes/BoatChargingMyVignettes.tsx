import {EmptyList} from '@/components/features/EmptyList'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BoatChargingMyVignettesLogin} from '@/modules/boat-charging/components/vignettes/BoatChargingMyVignettesLogin'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'

export const BoatChargingMyVignettes = () => {
  const {isLoggedIn} = useIsLoggedIn()
  const {navigate} = useNavigation()

  if (!isLoggedIn) {
    return <BoatChargingMyVignettesLogin />
  }

  return (
    <>
      <EmptyList
        testID="BoatChargingMyVignettesEmptyList"
        text="Voeg een vignet toe om uw boot te kunnen laden"
        title="Geen vignetten"
      />
      <Button
        icon={{name: 'plus-circle', isFilled: true}}
        label="Vignet toevoegen"
        onPress={() => {
          navigate(BoatChargingRouteName.addVignet)
        }}
        testID="BoatChargingMyVignettesEmptyListAddVignetButton"
      />
    </>
  )
}
