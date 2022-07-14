import React, {ReactNode} from 'react'
import {View} from 'react-native'
import {Box, Text, Title} from '@/components/ui'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'

type Props = {
  icon: ReactNode
  title: string
  text: string
}

export const ContactOption = ({icon, title, text}: Props) => (
  <Box background="grey">
    <Row gutter="md">
      <Icon size={32}>{icon}</Icon>
      <View>
        <Title level={4} text={title} />
        <Text>{text}</Text>
      </View>
    </Row>
  </Box>
)
