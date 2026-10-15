import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'

export const BoatChargingAddVignetHeaderButton = () => {
  const {navigate} = useNavigation()

  return (
    <IconButton
      accessibilityLabel="Voeg een vignet toe"
      //   disabled={isLoading} // TODO: add call
      icon={
        <Icon
          color="link"
          isFilled
          name="plus-circle"
          size="lgx"
          testID="BoatChargingAddVignetHeaderButtonIcon"
        />
      }
      onPress={() => {
        navigate(BoatChargingRouteName.addVignet)
      }}
      testID="BoatChargingAddVignetHeaderButton"
    />
  )
}
