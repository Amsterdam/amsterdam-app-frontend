import {Button} from '@/components/ui/buttons/Button'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useParkingAccount} from '@/modules/parking/slice'

export const ParkingAccountCredentials = () => {
  const {reportCode} = useParkingAccount() ?? {}
  const {navigate} = useNavigation()

  return (
    <Column gutter="lg">
      <Title
        level="h2"
        text="Inloggegevens"
      />
      <Column gutter="sm">
        <SingleSelectable>
          <Row align="between">
            <Phrase>Meldcode</Phrase>
            <Phrase emphasis="strong">{reportCode}</Phrase>
          </Row>
        </SingleSelectable>
        <SingleSelectable>
          <Row align="between">
            <Phrase>Pincode</Phrase>
            <Phrase emphasis="strong">****</Phrase>
          </Row>
        </SingleSelectable>
      </Column>
      <Button
        label="Wijzig pincode"
        onPress={() => navigate(ParkingRouteName.accountChangePinCode)}
        testID="ParkingAccountCredentialsChangePinCodeButton"
        variant="secondary"
      />
    </Column>
  )
}
