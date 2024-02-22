import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Track} from '@/components/ui/layout/Track'
import {TestProps} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'

type Props = {
  label: string
} & TestProps

export const CloseModalButton = ({label, testID}: Props) => {
  const navigation = useNavigation()

  return (
    <Box>
      <Track>
        <Button
          label={label}
          onPress={navigation.goBack}
          testID={testID}
        />
      </Track>
    </Box>
  )
}
