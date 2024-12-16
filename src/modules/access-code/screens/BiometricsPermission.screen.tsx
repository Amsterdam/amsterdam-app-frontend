import {useCallback, useMemo} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {mapBiometricsAuthenticationTypeToLabel} from '@/modules/access-code/utils/mapValidationTypeToLabel'
import {capitalizeString} from '@/utils/capitalizeString'

type Props = NavigationProps<AccessCodeRouteName.biometricsPermission>

export const BiometricsPermissionScreen = ({navigation}: Props) => {
  const {biometricsAuthenticationType, isLoading, setUseBiometrics} =
    useAccessCodeBiometrics()

  const onPress = useCallback(
    (permission: boolean) => {
      setUseBiometrics(permission)
      navigation.pop(3)
    },
    [navigation, setUseBiometrics],
  )

  const biometricsLabel = useMemo(
    () => mapBiometricsAuthenticationTypeToLabel(biometricsAuthenticationType),
    [biometricsAuthenticationType],
  )

  if (isLoading) {
    return null
  }

  return (
    <Screen
      stickyFooter={
        <Box>
          <Column gutter="sm">
            <Button
              label="Nee, bedankt"
              onPress={() => onPress(false)}
              testID="AccessCodeBiometricsPermissionScreenButtonDecline"
              variant="secondary"
            />
            <Button
              label={`${capitalizeString(biometricsLabel ?? '')} instellen`}
              onPress={() => onPress(true)}
              testID="AccessCodeBiometricsPermissionScreenButtonAccept"
            />
          </Column>
        </Box>
      }
      testID="BiometricsPermissionScreen">
      <Box
        insetHorizontal="md"
        insetTop="xxl">
        <Column
          align="center"
          grow={1}
          gutter="lg">
          <Row align="center">
            <Icon
              name="lock"
              size="xxl"
              testID="BiometricsPermissionScreenIcon"
            />
          </Row>
          <Title
            level="h2"
            testID="BiometricsPermissionScreenTitle"
            text={`De volgende keer sneller toegang met ${biometricsLabel}?`}
            textAlign="center"
          />
        </Column>
      </Box>
    </Screen>
  )
}
