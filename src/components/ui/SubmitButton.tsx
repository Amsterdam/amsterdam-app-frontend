import React, {useState} from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {color, size} from '../../tokens'
import {Text} from '.'

type Props = {
  onPress: () => void
  text: string
}

const arrowWidth = 18

export const SubmitButton = (props: Props) => {
  const [buttonHeight, setButtonHeight] = useState<number>()
  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      backgroundColor: color.touchable.secondary,
      paddingLeft: size.spacing.md,
      paddingRight: arrowWidth + size.spacing.sm,
      paddingVertical: size.spacing.md,
    },
    pointedEnd: {
      position: 'absolute',
      width: 0,
      height: 0,
      backgroundColor: color.background.lighter,
      borderTopColor: 'transparent',
      borderTopWidth: buttonHeight && buttonHeight / 2, // the + 2 might be because of the demi font-family
      borderRightColor: 'transparent',
      borderRightWidth: 0,
      borderBottomColor: 'transparent',
      borderBottomWidth: buttonHeight && buttonHeight / 2, // the + 2 might be because of the demi font-family
      borderLeftColor: color.touchable.secondary,
      borderLeftWidth: arrowWidth,
    },
  })
  return (
    <Pressable
      onLayout={e => setButtonHeight(e.nativeEvent.layout.height)}
      onPress={props.onPress}
      style={styles.button}>
      <Text inverse>{props.text}</Text>
      <View style={styles.pointedEnd} />
    </Pressable>
  )
}
