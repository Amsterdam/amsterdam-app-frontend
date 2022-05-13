import Alert from '@amsterdam/asc-assets/static/icons/Alert.svg'
import ChatBubble from '@amsterdam/asc-assets/static/icons/ChatBubble.svg'
import Chatting from '@amsterdam/asc-assets/static/icons/Chatting.svg'
import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import {ElementType} from 'react'
import {Container, Project} from '../../../assets/icons'

export const icons: Record<string, ElementType> = {
  'city-offices': Chatting,
  'construction-work': Project,
  contact: ChatBubble,
  'open-waste-container': Container,
  'report-problem': Alert,
  'waste-guide': Location,
}
