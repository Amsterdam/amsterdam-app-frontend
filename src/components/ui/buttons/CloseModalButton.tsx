import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {Button} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'

type Props = {
  label: string
}

export const CloseModalButton = ({label}: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()

  return (
    <Box>
      <Button label={label} onPress={navigation.goBack} />
    </Box>
  )
}
