import React, {ReactNode} from 'react'
import {View} from 'react-native'
import {Box} from '@/components/ui'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'

type Props = {
  icon: ReactNode
  title: string
  text: string
}

export const ContactOption = ({icon, title, text}: Props) => (
  <Box inset="sm">
    <Row gutter="md" valign="center">
      <Icon size={32}>{icon}</Icon>
      <View>
        <Title color="link" level="h4" text={title} />
        <Paragraph>{text}</Paragraph>
      </View>
    </Row>
  </Box>
)
