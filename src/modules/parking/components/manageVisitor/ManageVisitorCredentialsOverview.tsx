import {Button} from '@/components/ui/buttons/Button'
import {CopyButton} from '@/components/ui/buttons/CopyButton'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'

export const ManageVisitorCredentialsOverview = () => {
  const {navigate} = useNavigation()
  const currentPermit = useCurrentParkingPermit()

  if (!currentPermit.visitor_account) {
    return null
  }

  return (
    <Column gutter="lg">
      <Title text="Inloggegevens" />
      <Column gutter="no">
        <Row
          align="between"
          flex={1}>
          <Phrase>Meldcode</Phrase>
          <Phrase emphasis="strong">
            {currentPermit.visitor_account.report_code}
          </Phrase>
        </Row>
        <Row
          align="between"
          flex={1}>
          <Phrase>Pincode</Phrase>
          <Phrase emphasis="strong">{currentPermit.visitor_account.pin}</Phrase>
        </Row>
      </Column>
      <CopyButton
        label="Inloggegevens kopiëren"
        testID="ParkingManageVisitorCopyCredentialsButton"
        textToCopy={`Meldcode: ${currentPermit.visitor_account.report_code}, Pincode: ${currentPermit.visitor_account.pin}`}
      />
      <Button
        label="Pincode wijzigen"
        onPress={() => navigate(ParkingRouteName.manageVisitorChangePinCode)}
        testID="ParkingManageVisitorChangePincodeButton"
        variant="secondary"
      />
    </Column>
  )
}
