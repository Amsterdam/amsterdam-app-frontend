import {Screen} from '@/components/features/screen/Screen'
import {FullScreenErrorContent} from '@/components/features/screen/error/Content'
import {FullScreenErrorHeader} from '@/components/features/screen/error/Header'
import {FullScreenErrorProps} from '@/components/features/screen/error/types'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {useDeviceContext} from '@/hooks/useDeviceContext'

export const FullScreenError = ({
  buttonAccessibilityLabel,
  buttonLabel,
  error,
  text,
  Image,
  onPress,
  testID,
  title,
  TopComponent,
  withFacadesBackground = true,
  ...screenProps
}: FullScreenErrorProps) => {
  const {isPortrait} = useDeviceContext()

  return (
    <Screen
      stickyFooter={
        <Box inset="md">
          <Button
            accessibilityLabel={buttonAccessibilityLabel}
            label={buttonLabel}
            onPress={onPress}
            testID={testID + 'Button'}
          />
        </Box>
      }
      stickyHeader={
        !!isPortrait && (
          <FullScreenErrorHeader
            error={error}
            isPortrait={isPortrait}
            testID={testID}
            text={text}
            title={title}
            TopComponent={TopComponent}
          />
        )
      }
      testID={testID}
      {...screenProps}>
      <FullScreenErrorContent
        error={error}
        Image={Image}
        isPortrait={isPortrait}
        testID={testID}
        text={text}
        title={title}
        TopComponent={TopComponent}
        withFacadesBackground={withFacadesBackground}
      />
    </Screen>
  )
}
