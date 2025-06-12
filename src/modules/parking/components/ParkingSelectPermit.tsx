import {useCallback} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useSetBottomSheetElementFocus} from '@/hooks/accessibility/useSetBottomSheetElementFocus'
import {AdditionalLoginButton} from '@/modules/parking/components/login/AdditionalLoginButton'
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'
import {useParkingAccount} from '@/modules/parking/hooks/useParkingAccount'
import {useSecurePermitHolders} from '@/modules/parking/hooks/useSecurePermitHolders'
import {useCurrentParkingPermitName} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ParkingSelectPermit = () => {
  const {close} = useBottomSheet()
  const focusRef = useSetBottomSheetElementFocus()
  const {isLoading, permits} = useGetPermits()
  const {setCurrentPermitName} = useCurrentParkingPermitName()
  const {parkingAccount} = useParkingAccount()
  const {permitHolders, isLoading: isLoadingPermitHolders} =
    useSecurePermitHolders()
  const hasPermitHolderAccount = permitHolders.length > 0

  const onPress = useCallback(
    (permitName: string) => {
      setCurrentPermitName(permitName)
      close()
    },
    [close, setCurrentPermitName],
  )

  if (isLoading) {
    return <PleaseWait testID="ParkingSelectPermitPleaseWait" />
  }

  if (!permits || permits.length === 0) {
    return <SomethingWentWrong testID="ParkingSelectPermitSomethingWentWrong" />
  }

  return (
    <Box grow>
      <Column gutter="md">
        <Title
          accessibilityHint="Parkeeraccount kiezen"
          level="h3"
          ref={focusRef}
          text="Parkeeraccount kiezen"
        />
        <Column>
          {permits.map(({permit_name, report_code, permit_zone}) => (
            <TopTaskButton
              iconName={
                parkingAccount?.scope === ParkingPermitScope.visitor
                  ? 'person'
                  : 'documentCheckmark'
              }
              iconSize="lg"
              key={permit_name}
              onPress={() => onPress(permit_name)}
              testID={`ParkingSelectPermit${permit_name}TopTaskButton`}
              title={
                parkingAccount?.scope === ParkingPermitScope.visitor
                  ? `Op bezoek ${permit_zone.name} - ${report_code}`
                  : permit_name
              }
            />
          ))}
          {!isLoadingPermitHolders && !hasPermitHolderAccount && (
            <AdditionalLoginButton
              testID="ParkingSelectPermitLoginPermitHolderTopTaskButton"
              title="Inloggen als vergunninghouder"
            />
          )}
          <AdditionalLoginButton
            testID="ParkingSelectPermitLoginVisitorTopTaskButton"
            title="Inloggen als bezoeker"
          />
        </Column>
      </Column>
    </Box>
  )
}
