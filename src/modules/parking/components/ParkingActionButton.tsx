import {ActionButton} from '@/components/ui/buttons/ActionButton'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'
import {useLoginSteps} from '@/modules/parking/hooks/useLoginSteps'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useCurrentParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope, PermitType} from '@/modules/parking/types'
import {ModuleSlug} from '@/modules/slugs'

const ParkingActionButtonContent = () => {
  const {navigate} = useNavigation()
  const {permits} = useGetPermits()

  return (
    permits?.length === 1 &&
    (permits[0].permit_type === PermitType.bezoekersvergunning ||
      permits[0].permit_type === PermitType?.['GA-bezoekerskaart']) && (
      <Column>
        <ActionButton
          iconName="parkingSession"
          label={'Parkeersessie\nstarten'}
          onPress={() => {
            navigate(ModuleSlug.parking, {
              screen: ParkingRouteName.startSession,
            })
          }}
          testID="ParkingActionButton"
        />
        <Gutter height="lg" />
      </Column>
    )
  )
}

export const ParkingActionButton = () => {
  const {accessCode} = useGetSecureAccessCode()
  const {isLoginStepsActive} = useLoginSteps()
  const secureParkingAccount = useCurrentParkingAccount()

  if (
    !accessCode ||
    secureParkingAccount?.currentAccountType !==
      ParkingPermitScope.permitHolder ||
    isLoginStepsActive
  ) {
    return null
  }

  return <ParkingActionButtonContent />
}
