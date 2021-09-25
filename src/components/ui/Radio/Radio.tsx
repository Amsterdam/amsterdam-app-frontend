import React, {useState} from 'react'
import {Pressable, StyleSheet} from 'react-native'
import {Center} from '..'
import CircleIcon from '../../../assets/icons/circle.svg'
import {color} from '../../../tokens'

type Props = {
  children: React.ReactNode
  value: string
}

export const Radio = ({children, value}: Props) => {
  console.log(value)
  const [isChecked, setIsChecked] = useState<boolean>()
  const handlePress = () => {
    !isChecked && setIsChecked(true)
  }
  return (
    <Pressable onPress={handlePress}>
      <Center style={styles.outerCircle}>
        <CircleIcon
          fill={color.background.darker}
          opacity={isChecked ? 1 : 0}
          style={styles.innerCircle}
        />
      </Center>
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  outerCircle: {
    flexDirection: 'row',
    width: 24,
    height: 24,
    borderColor: color.border.input,
    borderRadius: 50,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  innerCircle: {
    height: 16,
    width: 16,
  },
})
