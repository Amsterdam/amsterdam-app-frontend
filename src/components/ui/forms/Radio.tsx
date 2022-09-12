import {useRadio} from '@react-native-aria/radio'
import React, {ReactNode, SVGProps, useContext, useRef} from 'react'
import {Pressable, PressableProps, StyleSheet, View} from 'react-native'
import CircleIcon from '@/assets/icons/circle.svg'
import {RadioContext} from '@/components/ui/forms/'
import {Theme, useThemable} from '@/themes'

type Props = {
  children: ReactNode
  isChecked: boolean
  value: string
}

export const Radio = (props: Props) => {
  const iconProps = useThemable(createIconProps)
  const styles = useThemable(createStyles)

  const contextState = useContext(RadioContext)
  const inputRef = useRef(null)
  const {inputProps} = useRadio(props, contextState, inputRef)
  const {checked: isChecked} = inputProps

  return (
    <Pressable
      {...(inputProps as PressableProps)}
      accessibilityRole="radio"
      accessibilityState={{selected: isChecked}}
      style={[styles.radioButton]}>
      <View
        style={[styles.outerCircle, isChecked && styles.outerCircleChecked]}>
        {!!isChecked && (
          <CircleIcon {...iconProps} style={styles.innerCircle} />
        )}
      </View>
      <View style={styles.text}>{props.children}</View>
    </Pressable>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.control.checked.background,
})

const outerCircleSize = 20
const innerCircleSize = 12

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    radioButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    outerCircle: {
      alignItems: 'center',
      justifyContent: 'center',
      width: outerCircleSize,
      aspectRatio: 1,
      marginRight: size.spacing.md,
      backgroundColor: color.control.default.background,
      borderColor: color.control.default.border,
      borderRadius: outerCircleSize / 2,
      borderStyle: 'solid',
      borderWidth: StyleSheet.hairlineWidth,
    },
    outerCircleChecked: {
      borderColor: color.control.checked.border,
    },
    innerCircle: {
      width: innerCircleSize,
      aspectRatio: 1,
    },
    text: {
      flexShrink: 1,
    },
  })
