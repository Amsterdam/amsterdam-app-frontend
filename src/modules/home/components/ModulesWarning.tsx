import {Button} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Warning} from '@/components/ui/feedback'
import {Gutter} from '@/components/ui/layout'

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
      />
    )}
  </Box>
)
