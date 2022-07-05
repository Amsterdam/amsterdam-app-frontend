import React, {useState} from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {Text} from '@/components/ui'
import {Theme, useThemable} from '@/themes'

export type SubmitButtonProps = {
  onPress: () => void
  text: string
}

export const SubmitButton = (props: SubmitButtonProps) => {
  const [buttonHeight, setButtonHeight] = useState<number>(0)
  const styles = useThemable(createStyles(buttonHeight))

  return (
    <Pressable
      onLayout={e => setButtonHeight(e.nativeEvent.layout.height)}
      onPress={props.onPress}
      accessibilityRole="button"
      style={styles.button}>
      <Text inverse>{props.text}</Text>
      <View style={styles.pointedEnd} />
    </Pressable>
  )
}

const createStyles =
  (buttonHeight: number) =>
  ({color, size, text}: Theme) => {
    const arrowWidth = 15
    const verticalPadding = (44 - text.fontSize.body * text.lineHeight.body) / 2 // Design system: button height must be 44

    return StyleSheet.create({
      button: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: color.pressable.secondary.background,
        paddingLeft: size.spacing.md,
        paddingRight: arrowWidth + size.spacing.md,
        paddingVertical: verticalPadding,
      },
      pointedEnd: {
        position: 'absolute',
        width: 0,
        height: 0,
        backgroundColor: color.box.background.white,
        borderTopColor: 'transparent',
        borderTopWidth: buttonHeight && buttonHeight / 2,
        borderRightColor: 'transparent',
        borderRightWidth: 0,
        borderBottomColor: 'transparent',
        borderBottomWidth: buttonHeight && buttonHeight / 2,
        borderLeftColor: color.pressable.secondary.background,
        borderLeftWidth: arrowWidth,
      },
    })
  }
