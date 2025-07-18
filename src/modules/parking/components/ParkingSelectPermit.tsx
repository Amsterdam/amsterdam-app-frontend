import {useCallback} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useSetBottomSheetElementFocus} from '@/hooks/accessibility/useSetBottomSheetElementFocus'
import {AdditionalLoginButton} from '@/modules/parking/components/login/AdditionalLoginButton'
import {useSwitchPermit} from '@/modules/parking/hooks/useSwitchPermit'
import {useParkingAccounts} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {isEmptyObject} from '@/utils/object'

export const ParkingSelectPermit = () => {
  const {close} = useBottomSheet()
  const focusRef = useSetBottomSheetElementFocus()
  const switchPermit = useSwitchPermit()
  const parkingAccounts = useParkingAccounts()

  const onPress = useCallback(
    (reportCodeParkingAccount: string, reportCode: string) => {
      switchPermit(reportCodeParkingAccount, reportCode)

      close()
    },
    [close, switchPermit],
  )

  if (isEmptyObject(parkingAccounts)) {
    return <SomethingWentWrong testID="ParkingSelectPermitSomethingWentWrong" />
  }

  return (
    <Box grow>
      <Column gutter="md">
        <Title
          level="h3"
          ref={focusRef}
          text="Parkeervergunningen"
        />
        <Column>
          {Object.keys(parkingAccounts)
            .sort(a =>
              parkingAccounts[a].scope === ParkingPermitScope.permitHolder
                ? -1
                : 1,
            )
            .map((reportCodeParkingAccount, accountIndex) => {
              const scope = parkingAccounts[reportCodeParkingAccount].scope

              return parkingAccounts[reportCodeParkingAccount].permits?.map(
                (
                  {permit_name, report_code, permit_zone, permit_type},
                  permitIndex,
                ) => (
                  <TopTaskButton
                    iconName={
                      scope === ParkingPermitScope.visitor
                        ? 'person'
                        : 'documentCheckmark'
                    }
                    iconSize="lg"
                    key={
                      scope === ParkingPermitScope.visitor
                        ? `visitor-${permit_name}`
                        : `holder-${permit_name}`
                    }
                    onPress={() =>
                      onPress(reportCodeParkingAccount, report_code.toString())
                    }
                    testID={`ParkingSelectPermit${permit_type}-${accountIndex}-${permitIndex}TopTaskButton`}
                    title={
                      scope === ParkingPermitScope.visitor
                        ? `Op bezoek ${permit_zone.name} - ${report_code}`
                        : permit_name
                    }
                  />
                ),
              )
            })}
          <AdditionalLoginButton
            testID="ParkingSelectPermitLoginTopTaskButton"
            title="Inloggen"
          />
        </Column>
      </Column>
    </Box>
  )
}
