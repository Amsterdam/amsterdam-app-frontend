import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useSetBottomSheetElementFocus} from '@/hooks/accessibility/useSetBottomSheetElementFocus'
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'

export const ParkingSelectPermit = () => {
  const focusRef = useSetBottomSheetElementFocus()
  const {isLoading, permits} = useGetPermits()

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
          {permits.map(permit => (
            <TopTaskButton
              iconName="documentCheckmark"
              key={permit.permit_name}
              testID="ParkingSelectPermitTopTaskButton"
              title={permit.permit_name}
            />
          ))}
        </Column>
      </Column>
    </Box>
  )
}
