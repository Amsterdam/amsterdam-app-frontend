import Alert from '@amsterdam/asc-assets/static/icons/Alert.svg'
import ChatBubble from '@amsterdam/asc-assets/static/icons/ChatBubble.svg'
import Chatting from '@amsterdam/asc-assets/static/icons/Chatting.svg'
import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React, {ReactNode} from 'react'
import {Container, Project} from '../../../assets/icons'
import {color} from '../../../tokens'
import {Column} from '../../ui/layout'
import mock from './mock.json'
import {Module, ModuleButton} from './'

const modules: Module[] = mock.modules.filter(m => m.status === 1)

const iconProps = {
  width: 24,
  aspectRatio: 1,
  fill: color.font.regular,
}

const icons: Record<string, ReactNode> = {
  'waste-guide': <Location {...iconProps} />,
  'open-waste-container': <Container {...iconProps} />,
  'construction-work': <Project {...iconProps} />,
  'report-issue': <Alert {...iconProps} />,
  'city-offices': <Chatting {...iconProps} />,
  questions: <ChatBubble {...iconProps} />,
}

export const Modules = () => (
  <Column gutter="md">
    {modules.map(({icon, slug, title}) => (
      <ModuleButton icon={icons[icon]} key={slug} label={title} slug={slug} />
    ))}
  </Column>
)
