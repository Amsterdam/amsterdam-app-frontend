import React, {useState} from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {color, font, size} from '../../tokens'
import {Text} from './'

type Props = {
  onPress: () => void
  text: string
}

const arrowWidth = 15
const verticalPadding = (44 - font.height.p1) / 2 // Design system: button height must be 44

export const SubmitButton = (props: Props) => {
  const [buttonHeight, setButtonHeight] = useState<number>()

  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      backgroundColor: color.touchable.secondary,
      paddingLeft: size.spacing.md,
      paddingRight: arrowWidth + size.spacing.md,
      paddingVertical: verticalPadding,
    },
    pointedEnd: {
      position: 'absolute',
      width: 0,
      height: 0,
      backgroundColor: color.background.white,
      borderTopColor: 'transparent',
      borderTopWidth: buttonHeight && buttonHeight / 2,
      borderRightColor: 'transparent',
      borderRightWidth: 0,
      borderBottomColor: 'transparent',
      borderBottomWidth: buttonHeight && buttonHeight / 2,
      borderLeftColor: color.touchable.secondary,
      borderLeftWidth: arrowWidth,
    },
  })

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
