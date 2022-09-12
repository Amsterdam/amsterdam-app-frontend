import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import Enlarge from '@amsterdam/asc-assets/static/icons/Enlarge.svg'
import React, {SVGProps} from 'react'
import {PressableProps} from 'react-native'
import {Button, ButtonProps} from '@/components/ui/buttons'
import {Theme, useThemable} from '@/themes'

type Props = {
  followed: boolean
} & Omit<PressableProps, 'style' | 'onPress'> & {
    onPress: (followed: boolean) => void
  }

export const FollowButton = ({followed, onPress}: Props) => {
  const iconProps = useThemable(createIconProps(followed))

  const buttonProps: ButtonProps = followed
    ? {
        icon: <Checkmark {...iconProps} />,
        label: 'Volgend',
        variant: 'primary',
      }
    : {
        icon: <Enlarge {...iconProps} />,
        label: 'Volgen',
        variant: 'secondary',
      }

  return <Button onPress={() => onPress(followed)} {...buttonProps} />
}

const createIconProps =
  (followed: Props['followed']) =>
  ({color}: Theme): SVGProps<unknown> => ({
    fill: color.text[followed ? 'inverse' : 'link'],
  })
