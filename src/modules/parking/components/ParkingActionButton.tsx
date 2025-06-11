import {ActionButton} from '@/components/ui/buttons/ActionButton'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'
import {useLoginSteps} from '@/modules/parking/hooks/useLoginSteps'
import {useParkingAccount} from '@/modules/parking/hooks/useParkingAccount'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingPermitScope, PermitType} from '@/modules/parking/types'
import {ModuleSlug} from '@/modules/slugs'

const ALLOWED_PERMIT_TYPES = [
  PermitType.kraskaartvergunning,
  PermitType.bezoekersvergunning,
  PermitType['GA-bezoekerskaart'],
]

const ParkingActionButtonContent = () => {
  const {navigate} = useNavigation()
  const {permits} = useGetPermits()

  return (
    permits?.length === 1 &&
    ALLOWED_PERMIT_TYPES.includes(permits[0].permit_type) && (
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
  const {parkingAccount} = useParkingAccount()

  if (
    !accessCode ||
    parkingAccount?.scope !== ParkingPermitScope.permitHolder ||
    isLoginStepsActive
  ) {
    return null
  }

  return <ParkingActionButtonContent />
}
