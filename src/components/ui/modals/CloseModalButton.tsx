import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {Box} from '@/components/ui'
import {Button} from '@/components/ui/buttons'

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
