import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {ReactNode} from 'react'
import {RootStackParamList} from '@/app/navigation'
import {Pressable} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Title} from '@/components/ui/text'

type Props = {
  icon: ReactNode
  label: string
  name?: keyof RootStackParamList
}

export const ModuleButton = ({icon, label, name}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'HomeModule'>>()

  return (
    <Pressable
      inset="md"
      onPress={name ? () => navigation.navigate(name) : undefined}>
      <Row gutter="md" valign="center">
        {icon}
        <Title level="h5" text={label} />
      </Row>
    </Pressable>
  )
}
