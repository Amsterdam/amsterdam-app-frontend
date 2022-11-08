import React from 'react'
import {PressableProps} from 'react-native'
import {Button, ButtonProps} from '@/components/ui/buttons'

type Props = {
  followed: boolean
} & Omit<PressableProps, 'style' | 'onPress'> & {
    onPress: (followed: boolean) => void
  }

export const FollowButton = ({followed, onPress}: Props) => {
  const buttonProps: ButtonProps = followed
    ? {
        iconName: 'checkmark',
        label: 'Volgend',
        variant: 'primary',
      }
    : {
        iconName: 'enlarge',
        label: 'Volgen',
        variant: 'secondary',
      }

  return <Button onPress={() => onPress(followed)} {...buttonProps} />
}
