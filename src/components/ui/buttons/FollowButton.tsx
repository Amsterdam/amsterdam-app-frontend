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

export const FollowButton = ({followed, onPress, ...otherProps}: Props) => {
  const {color} = useTheme()
  const sharedProps = {
    onPress: () => onPress(followed),
    ...otherProps,
  }

  return followed ? (
    <Button
      icon={<Checkmark fill={color.text.inverse} />}
      text="Volgend"
      variant="primary"
      width="auto"
      {...sharedProps}
    />
  ) : (
    <Button
      icon={<Enlarge fill={color.pressable.default.background} />}
      text="Volgen"
      variant="inverse"
      width="auto"
      {...sharedProps}
    />
  )
}
