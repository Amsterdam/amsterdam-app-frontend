import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {FailedIcon} from '@/components/ui/media/icons/FailedIcon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {ModuleSlug} from '@/modules/slugs'

type Props = NavigationProps<AccessCodeRouteName.accessCodeInvalid>

export const AccessCodeInvalidScreen = ({navigation: {navigate}}: Props) => (
  <Screen
    stickyFooter={
      <Box>
        <Button
          label="Toegangscode opnieuw instellen"
          onPress={() =>
            navigate(ModuleSlug['city-pass'], {
              screen: CityPassRouteName.restartLogin,
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
          <FailedIcon />
        </Row>
        <Title
          level="h2"
          testID="AccessCodeInvalidScreenTitle"
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
