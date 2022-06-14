import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {ReactNode} from 'react'
import {RootStackParamList} from '../../../app/navigation'
import {Row} from '../../../components/ui/layout'
import {Title} from '../../../components/ui/typography'
import {BlockLink} from '@/components/ui/button/index'

type Props = {
  icon: ReactNode
  label: string
  name?: keyof RootStackParamList
}

export const ModuleButton = ({icon, label, name}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'HomeModule'>>()

  return (
    <BlockLink
      onPress={name ? () => navigation.navigate(name) : undefined}
      padding="md">
      <Row gutter="md" valign="center">
        {icon}
        <Title level="h5" text={label} />
      </Row>
    </BlockLink>
  )
}
