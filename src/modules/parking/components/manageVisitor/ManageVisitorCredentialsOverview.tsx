import {Button} from '@/components/ui/buttons/Button'
import {CopyButton} from '@/components/ui/buttons/CopyButton'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ManageVisitorRemoveAccountButton} from '@/modules/parking/components/manageVisitor/ManageVisitorRemoveAccountButton'
import {useCurrentParkingApiVersion} from '@/modules/parking/hooks/useCurrentParkingApiVersion'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingApiVersion} from '@/modules/parking/types'

export const ManageVisitorCredentialsOverview = () => {
  const {navigate} = useNavigation()
  const currentPermit = useCurrentParkingPermit()
  const apiVersion = useCurrentParkingApiVersion()

  if (!currentPermit.visitor_account) {
    return null
  }

  return (
    <Column gutter="lg">
      <Title text="Inloggegevens" />
      <Column gutter="no">
        <SingleSelectable>
          <Row
            align="between"
            flex={1}>
            <Phrase>Meldcode</Phrase>
            <Phrase emphasis="strong">
              {currentPermit.visitor_account.report_code}
            </Phrase>
          </Row>
        </SingleSelectable>
        <SingleSelectable>
          <Row
            align="between"
            flex={1}>
            <Phrase>Pincode</Phrase>
            <Phrase emphasis="strong">
              {currentPermit.visitor_account.pin}
            </Phrase>
          </Row>
        </SingleSelectable>
      </Column>
      <CopyButton
        label="Inloggegevens kopiëren"
        testID="ParkingManageVisitorCopyCredentialsButton"
        textToCopy={`Meldcode: ${currentPermit.visitor_account.report_code}, Pincode: ${currentPermit.visitor_account.pin}`}
      />
      {apiVersion !== ParkingApiVersion.v1 ? (
        <Button
          label="Pincode wijzigen"
          onPress={() => navigate(ParkingRouteName.manageVisitorChangePinCode)}
          testID="ParkingManageVisitorChangePincodeButton"
          variant="secondary"
        />
      ) : (
        <ManageVisitorRemoveAccountButton />
      )}
    </Column>
  )
}
