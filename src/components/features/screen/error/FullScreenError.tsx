import {Screen} from '@/components/features/screen/Screen'
import {Content} from '@/components/features/screen/error/Content'
import {Header} from '@/components/features/screen/error/Header'
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
  withBottomInset,
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
          <Box
            insetHorizontal="md"
            insetVertical="lg">
            <Header
              error={error}
              isPortrait={isPortrait}
              testID={testID}
              text={text}
              title={title}
              TopComponent={TopComponent}
            />
          </Box>
        )
      }
      testID={testID}
      withBottomInset={withBottomInset}>
      <Content
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
