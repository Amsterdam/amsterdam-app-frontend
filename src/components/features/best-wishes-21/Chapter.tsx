import React from 'react'
import {Title} from '../../ui'
import {Column} from '../../ui/layout'
import {Section, SectionProps} from './Section'

type Props = {
  title: string
  content: SectionProps[]
}

export const Chapter = ({title, content}: Props) => (
  <Column gutter="xl">
    <Title level={2} text={title} />
    {content.map((section, index) => (
      <Section key={index} {...section} />
    ))}
  </Column>
)
