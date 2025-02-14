import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {SuccessIcon} from '@/components/ui/media/icons/SuccessIcon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'

type Props = NavigationProps<AccessCodeRouteName.accessCodeInvalid>

export const AddWasteCardSuccessScreen = ({navigation: {navigate}}: Props) => (
  <Screen
    stickyFooter={
      <Box>
        <Button
          label="Gereed"
          onPress={() => navigate(WasteGuideRouteName.wasteGuide)}
          testID="AddWasteCardSuccessScreenConfirmButton"
        />
      </Box>
    }
    testID="AddWasteCardSuccessScreen">
    <Box
      insetHorizontal="md"
      insetTop="xxl">
      <Column
        align="center"
        grow={1}
        gutter="lg">
        <Row align="center">
          <SuccessIcon />
        </Row>
        <Title
          level="h2"
          testID="AddWasteCardSuccessScreenTitle"
          text="Uw afvalpas staat nu in de app"
          textAlign="center"
        />
        <Paragraph textAlign="center">
          U kunt de afvalpas vanaf nu gebruiken om de gfe/t-container in uw
          buurt te openen.
        </Paragraph>
      </Column>
    </Box>
  </Screen>
)
