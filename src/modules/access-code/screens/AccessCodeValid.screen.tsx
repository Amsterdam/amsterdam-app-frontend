import {useEffect} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {SuccessIcon} from '@/components/ui/media/icons/SuccessIcon'
import {Title} from '@/components/ui/text/Title'
import {useUnsetCode} from '@/modules/access-code/hooks/useUnsetCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {ModuleSlug} from '@/modules/slugs'

type Props = NavigationProps<AccessCodeRouteName.validAccessCode>

export const AccessCodeValidScreen = ({navigation}: Props) => {
  const {navigate} = navigation
  const unsetCode = useUnsetCode()

  useEffect(() => {
    const listener = navigation.addListener('blur', unsetCode)

    return () => {
      listener()
    }
  }, [navigation, unsetCode])

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
            <SuccessIcon />
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
