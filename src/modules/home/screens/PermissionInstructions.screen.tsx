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
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useAppState} from '@/hooks/useAppState'
import {AddressModalName} from '@/modules/address/routes'
import {HomeModalName} from '@/modules/home/routes'

type Props = NavigationProps<HomeModalName.permissionInstructions>

export const PermissionInstructionsScreen = ({route}: Props) => {
  const {
    params: {icon, paragraph, permission, screenTitle, title},
  } = route
  const {hasPermission, requestPermission} = usePermission(permission)

  const {getState, reset} = useNavigation<AddressModalName>()

  useEffect(() => {
    if (!hasPermission) {
      return
    }

    const {index, routes, key, routeNames, type} = getState()

    reset({
      index: index - 1,
      routes: routes.slice(0, -1),
      stale: false,
      key,
      routeNames,
      type,
    })
  }, [getState, hasPermission, reset])

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
            <Icon
              name={icon}
              size="xxl"
              testID="PermissionInstructionScreenIcon"
            />
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
