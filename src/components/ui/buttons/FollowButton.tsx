import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import Enlarge from '@amsterdam/asc-assets/static/icons/Enlarge.svg'
import React from 'react'
import {PressableProps} from 'react-native'
import {Button} from '@/components/ui/buttons'
import {useTheme} from '@/themes'

type Props = {
  following: boolean
} & Omit<PressableProps, 'style'>

export const FollowButton = ({following, ...otherProps}: Props) => {
  const {color} = useTheme()
  return following ? (
    <Button
      variant="primary"
      icon={<Checkmark fill={color.text.inverse} />}
      text="Volgend"
      width="auto"
      {...otherProps}
    />
  ) : (
    <Button
      variant="inverse"
      icon={<Enlarge fill={color.pressable.default.background} />}
      text="Volgen"
      width="auto"
      {...otherProps}
    />
  )
}
