import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {ModalHeader} from '@/components/ui/containers/ModalHeader'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import CodeInvalidSVG from '@/modules/access-code/assets/code-invalid.svg'
import {ModuleSlug} from '@/modules/slugs'

export const AccessCodeInvalidScreen = () => (
  <Screen
    stickyFooter={
      <Box>
        <Button
          label="Toegangscode opnieuw instellen"
          testID="AccessCodeInvalidScreenButton"
        />
      </Box>
    }
    stickyHeader={
      <ModalHeader
        navigationResetRouteName={ModuleSlug.user}
        testID="AccessCodeInvalidScreenHeaderTitle"
        title="Toegangscode onjuist"
      />
    }
    testID="AccessCodeInvalidScreen">
    <Box
      insetHorizontal="md"
      insetTop="xxl">
      <Column
        align="center"
        grow={1}
        gutter="lg">
        <Row align="center">
          <CodeInvalidSVG />
        </Row>
        <Title
          level="h2"
          testID="AccessCodeInvalidScreenScreen"
          text="U heeft te vaak een onjuiste toegangscode ingevoerd."
          textAlign="center"
        />
      </Column>
    </Box>
  </Screen>
)
