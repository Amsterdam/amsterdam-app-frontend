import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {Track} from '@/components/ui/layout/Track'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'

type Props = NavigationProps<ReportProblemRouteName.reportProblem>

export const ReportProblemScreen = ({navigation}: Props) => (
  <Screen testID="ReportProblemScreen">
    <Box>
      <Title
        testID="ReportProblemScreenTitle"
        text="Melding openbare ruimte en overlast"
      />
      <Gutter height="md" />
      <Track gutter="lg">
        <Column
          flex={2}
          gutter="md">
          <Paragraph>
            Ziet u op straat of in een park iets waarvan u wilt dat het gemaakt
            of opgeruimd wordt, dan kunt u dat bij de gemeente melden. U kunt
            ook een gevaarlijke verkeerssituatie of overlast van personen en
            horeca aan ons doorgeven.
          </Paragraph>
        </Column>
        <Column
          flex={1}
          gutter="md">
          <Row
            gutter="md"
            wrap>
            <Column grow={1}>
              <Button
                label="Doe een melding"
                onPress={() =>
                  navigation.navigate(
                    ReportProblemRouteName.reportProblemWebView,
                  )
                }
                testID="ReportProblemButton"
              />
            </Column>
          </Row>
        </Column>
      </Track>
    </Box>
  </Screen>
)
