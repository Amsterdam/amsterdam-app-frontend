import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Warning} from '@/components/ui/feedback/Warning'
import {Gutter} from '@/components/ui/layout/Gutter'

type Props = {
  onRetry?: () => void
  text: string
}

export const ModulesWarning = ({onRetry, text}: Props) => (
  <Box>
    <Warning
      text={text}
      title="Fout"
    />
    <Gutter height="md" />
    {!!onRetry && (
      <Button
        label="Probeer opnieuw"
        onPress={onRetry}
        testID="HomeModulesWarningRetryButton"
      />
    )}
  </Box>
)
