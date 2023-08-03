import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParams} from '@/app/navigation/types'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Track} from '@/components/ui/layout/Track'
import {TestProps} from '@/components/ui/types'

type Props = {
  label: string
} & Required<TestProps>

export const CloseModalButton = ({label, testID}: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()

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
