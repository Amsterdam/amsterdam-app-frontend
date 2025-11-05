import {useEffect, useOptimistic, useTransition} from 'react'
import {ActionButton} from '@/components/ui/buttons/ActionButton'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {parkingModule} from '@/modules/parking'
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'
import {useLoginSteps} from '@/modules/parking/hooks/useLoginSteps'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useParkingAccount} from '@/modules/parking/slice'
import {
  ParkingPermitScope,
  PermitType,
  type ParkingPermit,
} from '@/modules/parking/types'
import {ModuleSlug} from '@/modules/slugs'
import {useGetCachedServerModule} from '@/store/slices/modules'

const ALLOWED_PERMIT_TYPES = [
  PermitType.kraskaartvergunning,
  PermitType.bezoekersvergunning,
  PermitType['GA-bezoekerskaart'],
]

const ParkingActionButtonContent = ({
  cachedPermits = [],
}: {
  cachedPermits?: ParkingPermit[]
}) => {
  const {navigate} = useNavigation()
  const {isInactive} = useGetCachedServerModule(parkingModule.slug)
  const {permits} = useGetPermits(isInactive)

  const [optimisticPermits, setPermits] = useOptimistic(
    permits ?? cachedPermits,
    (_, newPermits: ParkingPermit[]) => newPermits,
  )

  const [_, startTransition] = useTransition()

  useEffect(() => {
    if (Array.isArray(permits)) {
      startTransition(() => {
        setPermits(permits)
      })
    }
  }, [permits, setPermits])

  return (
    optimisticPermits?.length === 1 &&
    ALLOWED_PERMIT_TYPES.includes(optimisticPermits[0].permit_type) && (
      <Column>
        <ActionButton
          disabled={!permits}
          iconName="parkingSession"
          isModuleInactive={isInactive}
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
  const parkingAccount = useParkingAccount()

  if (
    !accessCode ||
    parkingAccount?.scope !== ParkingPermitScope.permitHolder ||
    isLoginStepsActive
  ) {
    return null
  }

  return <ParkingActionButtonContent cachedPermits={parkingAccount?.permits} />
}
