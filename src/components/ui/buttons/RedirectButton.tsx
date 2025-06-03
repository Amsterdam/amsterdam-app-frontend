import {Button, ButtonVariant} from '@/components/ui/buttons/Button'
import {TestProps} from '@/components/ui/types'
import {useOpenRedirect} from '@/hooks/linking/useOpenRedirect'
import {RedirectKey} from '@/modules/redirects/types'

type Props = {
  accessibilityHint?: string
  label: string
  redirectKey: RedirectKey
  variant?: ButtonVariant
} & TestProps

export const RedirectButton = ({
  label,
  redirectKey,
  testID,
  variant,
  accessibilityHint,
}: Props) => {
  const {openRedirect, isLoading, isError} = useOpenRedirect()

  return (
    <Button
      accessibilityHint={accessibilityHint}
      accessibilityRole="link"
      isError={isError}
      isLoading={isLoading}
      label={label}
      onPress={() => openRedirect(redirectKey)}
      testID={testID}
      variant={variant}
    />
  )
}
