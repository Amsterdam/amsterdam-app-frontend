import {Button, ButtonProps} from '@/components/ui/buttons/Button'

type Props = {
  followed: boolean
  onPress: (followed: boolean) => void
} & Omit<ButtonProps, 'onPress' | 'style'>

export const FollowButton = ({
  followed,
  onPress,
  testID,
  ...otherButtonProps
}: Props) => {
  const defaultButtonProps: ButtonProps = followed
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

  return (
    <Button
      onPress={() => onPress(followed)}
      testID={testID}
      {...defaultButtonProps}
      {...otherButtonProps}
    />
  )
}
