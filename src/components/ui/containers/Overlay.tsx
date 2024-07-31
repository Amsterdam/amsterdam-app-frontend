import {ReactNode, useEffect} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useOverlay} from '@/store/slices/overlay'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  backgroundColor: string
  children: ReactNode
  /**
   * Used to outline close-button on top of another component
   */
  closeButtonContainerWidth?: number
  onClose: () => void
} & ViewProps

export const Overlay = ({
  backgroundColor,
  children,
  closeButtonContainerWidth,
  onClose,
  ...viewProps
}: Props) => {
  const dispatch = useDispatch()
  const {close, open} = useOverlay()
  const styles = useThemable(theme =>
    createStyles(theme, closeButtonContainerWidth),
  )

  useEffect(() => {
    open()

    return () => {
      close()
    }
  }, [close, dispatch, open])

  return (
    <Animated.View
      {...viewProps}
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={[
        viewProps.style,
        StyleSheet.absoluteFill,
        styles.container,
        {backgroundColor},
      ]}>
      <Column gutter="md">
        <Pressable
          onPress={onClose}
          testID="OverlayCloseButton"
          variant="transparent">
          <Row align="center">
            <View style={styles.closeButtonInnerContainer}>
              <Row
                gutter="md"
                valign="center">
                <Icon
                  color="inverse"
                  name="close"
                  size="lg"
                  testID="OverlayCloseButtonIcon"
                />
                <Phrase
                  color="inverse"
                  testID="OverlayCloseButtonPhrase">
                  Sluiten
                </Phrase>
              </Row>
            </View>
          </Row>
        </Pressable>
        {children}
      </Column>
    </Animated.View>
  )
}

const createStyles = (
  {z}: Theme,
  closeButtonContainerWidth: number | undefined,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: z.overlay,
    },
    closeButtonInnerContainer: {
      width: closeButtonContainerWidth,
    },
  })
