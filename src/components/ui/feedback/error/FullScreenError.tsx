import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {FullScreenErrorContent} from '@/components/ui/feedback/error/Content'
import {FullScreenErrorHeader} from '@/components/ui/feedback/error/Header'
import {FullScreenErrorProps} from '@/components/ui/feedback/error/types'
import {Column} from '@/components/ui/layout/Column'
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
  ...columnProps
}: FullScreenErrorProps) => {
  const {isPortrait} = useDeviceContext()

  return (
    <Column
      grow={1}
      {...columnProps}>
      {!!isPortrait && (
        <FullScreenErrorHeader
          error={error}
          isPortrait={isPortrait}
          testID={testID + 'Header'}
          text={text}
          title={title}
          TopComponent={TopComponent}
        />
      )}
      <FullScreenErrorContent
        error={error}
        Image={Image}
        isPortrait={isPortrait}
        testID={testID + 'Content'}
        text={text}
        title={title}
        TopComponent={TopComponent}
        withFacadesBackground={withFacadesBackground}
      />
      <Box inset="md">
        <Button
          accessibilityLabel={buttonAccessibilityLabel}
          label={buttonLabel}
          onPress={onPress}
          testID={testID + 'Button'}
        />
      </Box>
    </Column>
  )
}
