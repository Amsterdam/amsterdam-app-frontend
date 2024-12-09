import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import CodeInvalidSVG from '@/modules/access-code/assets/code-invalid.svg'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {ModuleSlug} from '@/modules/slugs'

export const AccessCodeInvalidScreen = () => {
  const {navigate} = useNavigation()

  return (
    <Screen
      stickyFooter={
        <Box>
          <Button
            label="Toegangscode opnieuw instellen"
            onPress={() =>
              navigate(ModuleSlug['city-pass'], {
                screen: CityPassRouteName.loginSteps,
              })
            }
            testID="AccessCodeInvalidScreenButton"
          />
        </Box>
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
          <Paragraph textAlign="center">
            U moet opnieuw inloggen om een nieuwe toegangscode te kiezen.
          </Paragraph>
        </Column>
      </Box>
    </Screen>
  )
}
