import React, {ReactNode} from 'react'
import {Box} from '@/components/ui'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'

type Props = {
  icon: ReactNode
  title: string
  text: string
}

export const ContactOption = ({icon, title, text}: Props) => (
  <Box insetHorizontal="md" insetVertical="sm">
    <Row gutter="md" valign="center">
      <Icon size={32}>{icon}</Icon>
      <Column>
        <Title color="link" level="h5" text={title} />
        <Paragraph variant="small">{text}</Paragraph>
      </Column>
    </Row>
  </Box>
)
