import {ActionButton} from '@/components/ui/buttons/ActionButton'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useLoginSteps} from '@/modules/parking/hooks/useLoginSteps'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingPermitScope, PermitType} from '@/modules/parking/types'
import {ModuleSlug} from '@/modules/slugs'

export const ParkingActionButton = () => {
  const {navigate} = useNavigation()
  const {accessCode} = useGetSecureAccessCode()
  const {permits} = useGetPermits()
  const {isLoginStepsActive} = useLoginSteps()
  const {secureParkingAccount} = useGetSecureParkingAccount()

  if (
    !accessCode ||
    secureParkingAccount?.scope !== ParkingPermitScope.permitHolder ||
    isLoginStepsActive ||
    !permits ||
    permits.length !== 1 ||
    permits[0].permit_type !== PermitType.bezoekersvergunning
  ) {
    return null
  }

  return (
    <Column>
      <ActionButton
        accessibilityLabel="Actieknop. Parkeersessie starten"
        iconName="parkingSession"
        label={
          <Column halign="center">
            <Phrase
              color="link"
              emphasis="strong">
              Parkeersessie
            </Phrase>
            <Phrase
              color="link"
              emphasis="strong">
              starten
            </Phrase>
          </Column>
        }
        onPress={() => {
          navigate(ModuleSlug.parking, {screen: ParkingRouteName.startSession})
        }}
        testID="ParkingActionButton"
      />
      <Gutter height="lg" />
    </Column>
  )
}
