import Alert from '@amsterdam/asc-assets/static/icons/Alert.svg'
import ChatBubble from '@amsterdam/asc-assets/static/icons/ChatBubble.svg'
import Chatting from '@amsterdam/asc-assets/static/icons/Chatting.svg'
import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React, {createElement, ElementType} from 'react'
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

const icons: Record<string, ElementType> = {
  'city-offices': Chatting,
  'construction-work': Project,
  'open-waste-container': Container,
  'report-issue': Alert,
  'waste-guide': Location,
  questions: ChatBubble,
}

export const Modules = () => (
  <Column gutter="md">
    {modules.map(({slug, title}) => (
      <ModuleButton
        icon={createElement(icons[slug], iconProps)}
        key={slug}
        label={title}
        slug={slug}
      />
    ))}
  </Column>
)
