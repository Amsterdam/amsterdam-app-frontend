import {useCallback} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useSetBottomSheetElementFocus} from '@/hooks/accessibility/useSetBottomSheetElementFocus'
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'
import {
  useCurrentParkingAccount,
  useCurrentParkingPermitName,
} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ParkingSelectPermit = () => {
  const {close} = useBottomSheet()
  const focusRef = useSetBottomSheetElementFocus()
  const {isLoading, permits} = useGetPermits()
  const {setCurrentPermitName} = useCurrentParkingPermitName()
  const {currentAccountType} = useCurrentParkingAccount()

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
              iconName="documentCheckmark"
              key={permit_name}
              onPress={() => onPress(permit_name)}
              testID={`ParkingSelectPermit${permit_name}TopTaskButton`}
              title={
                currentAccountType === ParkingPermitScope.visitor
                  ? `Op bezoek ${permit_zone.name} - ${report_code}`
                  : permit_name
              }
            />
          ))}
        </Column>
      </Column>
    </Box>
  )
}
