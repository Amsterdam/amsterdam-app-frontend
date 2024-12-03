import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import CodeValidSVG from '@/modules/access-code/assets/code-valid.svg'
import {ModuleSlug} from '@/modules/slugs'

export const AccessCodeValidScreen = () => {
  const {navigate} = useNavigation()

  return (
    <Screen
      stickyFooter={
        <Box>
          <Button
            label="Gereed"
            onPress={() => navigate(ModuleSlug.user)}
            testID="AccessCodeValidScreenButton"
          />
        </Box>
      }
      testID="AccessCodeValidScreen">
      <Box
        insetHorizontal="md"
        insetTop="xxl">
        <Column
          align="center"
          grow={1}
          gutter="lg">
          <Row align="center">
            <CodeValidSVG />
          </Row>
          <Title
            level="h2"
            testID="AccessCodeValidScreenScreen"
            text="Uw toegangscode is opgeslagen."
            textAlign="center"
          />
        </Column>
      </Box>
    </Screen>
  )
}
