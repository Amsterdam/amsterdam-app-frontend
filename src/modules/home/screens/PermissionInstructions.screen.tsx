import {useEffect, useCallback} from 'react'
import {Linking} from 'react-native'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {ModalHeader} from '@/components/ui/containers/ModalHeader'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useAppState} from '@/hooks/useAppState'
import {HomeModalName} from '@/modules/home/routes'

type Props = NavigationProps<HomeModalName.permissionInstructions>

export const PermissionInstructionsScreen = ({navigation, route}: Props) => {
  const {
    params: {
      IconComponent,
      iconName,
      paragraph,
      permission,
      screenTitle,
      title,
    },
  } = route
  const {hasPermission, requestPermission} = usePermission(permission)

  useEffect(() => {
    if (!hasPermission) {
      return
    }

    navigation.pop()
  }, [hasPermission, navigation])

  useAppState({
    onForeground: useCallback(() => {
      void requestPermission()
    }, [requestPermission]),
  })

  return (
    <Screen
      stickyFooter={
        <Box>
          <Button
            label="Ga naar Instellingen"
            onPress={() => Linking.openSettings()}
            testID="PermissionInstructionModalCloseButton"
          />
        </Box>
      }
      stickyHeader={
        <ModalHeader
          testID="PermissionInstructionModalHeader"
          title={screenTitle}
        />
      }
      testID="PermissionInstructionScreen">
      <Box
        insetHorizontal="md"
        insetVertical="xxl">
        <Column gutter="lg">
          <Row align="center">
            {!!iconName && (
              <Icon
                name={iconName}
                size="xxl"
                testID="PermissionInstructionScreenIcon"
              />
            )}
            {!!IconComponent && <IconComponent />}
          </Row>
          <Column gutter="md">
            <Title
              text={title}
              textAlign="center"
            />
            <Paragraph
              textAlign="center"
              variant="intro">
              {paragraph}
            </Paragraph>
          </Column>
        </Column>
      </Box>
    </Screen>
  )
}
