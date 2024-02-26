import {useCallback} from 'react'
import {Button, ButtonProps} from '@/components/ui/buttons/Button'
import {LogProps} from '@/processes/piwik/types'

type Props = {
  followed: boolean
  onPress: (followed: boolean) => void
} & Omit<ButtonProps, 'onPress' | 'style'> &
  LogProps

export const FollowButton = ({
  followed,
  onPress,
  ...otherButtonProps
}: Props) => {
  const follow = useCallback(() => onPress(false), [onPress])
  const unfollow = useCallback(() => onPress(true), [onPress])

  if (followed) {
    return (
      <Button
        iconName="checkmark"
        label="Volgend"
        onPress={unfollow}
        variant="primary"
        {...otherButtonProps}
      />
    )
  }

  return (
    <Button
      iconName="enlarge"
      label="Volgen"
      onPress={follow}
      variant="secondary"
      {...otherButtonProps}
    />
  )
}
