import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {ReactNode} from 'react'
import {RootStackParams} from '@/app/navigation'
import {Pressable} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Title} from '@/components/ui/text'
import {ModuleSlugs} from '@/modules/slugs'

type Props = {
  icon: ReactNode
  label: string
  slug?: keyof RootStackParams
}

export const ModuleButton = ({icon, label, slug}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParams, ModuleSlugs.home>>()

  return (
    <Pressable
      inset="md"
      onPress={slug ? () => navigation.navigate(slug) : undefined}>
      <Row gutter="md" valign="center">
        {icon}
        <Title level="h5" text={label} />
      </Row>
    </Pressable>
  )
}
