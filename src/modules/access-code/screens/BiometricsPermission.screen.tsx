import {useCallback} from 'react'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {capitalizeString} from '@/utils/capitalizeString'

export const BiometricsPermissionScreen = () => {
  const {biometricsLabel, isLoading, setUseBiometrics} =
    useAccessCodeBiometrics()

  const onPress = useCallback(
    (permission: boolean) => {
      setUseBiometrics(permission)
    },
    [setUseBiometrics],
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
              label={`${capitalizeString(biometricsLabel ?? '')} instellen`}
              onPress={() => onPress(true)}
              testID="AccessCodeBiometricsPermissionScreenAcceptButton"
            />
            <Button
              label="Nee, bedankt"
              onPress={() => onPress(false)}
              testID="AccessCodeBiometricsPermissionScreenDeclineButton"
              variant="secondary"
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
              name="faceId"
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
