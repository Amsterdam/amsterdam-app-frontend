import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import Enlarge from '@amsterdam/asc-assets/static/icons/Enlarge.svg'
import React from 'react'
import {PressableProps} from 'react-native'
import {Button} from '@/components/ui/buttons'
import {useTheme} from '@/themes'

type Props = {
  followed: boolean
} & Omit<PressableProps, 'style' | 'onPress'> & {
    onPress: (followed: boolean) => void
  }

export const FollowButton = ({followed, onPress}: Props) => {
  const {color} = useTheme()

  return (
    <Button
      width="auto"
      onPress={() => onPress(followed)}
      {...(followed
        ? {
            icon: <Checkmark fill={color.text.inverse} />,
            text: 'Volgend',
            variant: 'primary',
          }
        : {
            icon: <Enlarge fill={color.pressable.default.background} />,
            text: 'Volgen',
            variant: 'inverse',
          })}
    />
  )
}
