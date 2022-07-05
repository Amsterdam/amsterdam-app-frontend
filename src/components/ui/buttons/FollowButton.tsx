import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import Enlarge from '@amsterdam/asc-assets/static/icons/Enlarge.svg'
import React from 'react'
import {PressableProps} from 'react-native'
import {Button, ButtonProps} from '@/components/ui/buttons'
import {useTheme} from '@/themes'

type Props = {
  followed: boolean
} & Omit<PressableProps, 'style' | 'onPress'> & {
    onPress: (followed: boolean) => void
  }

export const FollowButton = ({followed, onPress}: Props) => {
  const {color} = useTheme()
  const buttonProps: ButtonProps = followed
    ? {
        icon: <Checkmark fill={color.text.inverse} />,
        label: 'Volgend',
        variant: 'primary',
      }
    : {
        icon: <Enlarge fill={color.pressable.default.background} />,
        label: 'Volgen',
        variant: 'secondary',
      }

  return <Button onPress={() => onPress(followed)} {...buttonProps} />
}
