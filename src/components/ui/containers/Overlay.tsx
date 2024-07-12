import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  backgroundColor: string
  children: ReactNode
  closeButtonWidth?: number
  onClose: () => void
}

export const Overlay = ({
  backgroundColor,
  children,
  closeButtonWidth,
  onClose,
}: Props) => {
  const styles = useThemable(theme => createStyles(theme, closeButtonWidth))

  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={[StyleSheet.absoluteFill, styles.container, {backgroundColor}]}>
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

const createStyles = ({z}: Theme, closeButtonWidth: number | undefined) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: z.overlay,
    },
    closeButtonInnerContainer: {
      width: closeButtonWidth,
    },
  })
