import {useRadio} from '@react-native-aria/radio'
import React, {useContext, useRef} from 'react'
import {Pressable, PressableProps, StyleSheet, View} from 'react-native'
import CircleIcon from '../../../assets/icons/circle.svg'
import {color, size} from '../../../tokens'
import {Center} from '../../ui/layout'
import {RadioContext} from './'

type Props = {
  children: React.ReactNode
  isChecked: boolean
  isFirst?: boolean
  value: string
}

export const Radio = (props: Props) => {
  const contextState = useContext(RadioContext)
  let inputRef = useRef(null)
  const {inputProps} = useRadio(props, contextState, inputRef)
  const {checked: isChecked} = inputProps

  return (
    <Pressable
      {...(inputProps as PressableProps)}
      accessibilityRole="radio"
      style={[styles.radioButton, props.isFirst && styles.firstRadioButton]}>
      <Center style={styles.outerCircle}>
        <CircleIcon
          fill={color.background.darker}
          opacity={isChecked ? 1 : 0}
          style={styles.innerCircle}
        />
      </Center>
      <View style={styles.text}>{props.children}</View>
    </Pressable>
  )
}

const outerCircleSize = 20

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: color.border.input,
    paddingVertical: size.spacing.sm,
  },
  firstRadioButton: {
    borderTopWidth: 1,
    borderTopColor: color.border.input,
  },
  outerCircle: {
    width: outerCircleSize,
    height: outerCircleSize,
    marginRight: size.spacing.sm,
    borderColor: color.border.input,
    borderRadius: outerCircleSize / 2,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  innerCircle: {
    height: 12,
    width: 12,
  },
  text: {
    flexShrink: 1,
  },
})
