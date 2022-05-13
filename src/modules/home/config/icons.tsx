import Alert from '@amsterdam/asc-assets/static/icons/Alert.svg'
import ChatBubble from '@amsterdam/asc-assets/static/icons/ChatBubble.svg'
import Chatting from '@amsterdam/asc-assets/static/icons/Chatting.svg'
import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import {ElementType} from 'react'
import {Container, Project} from '../../../assets/icons'

export const icons: Record<string, ElementType> = {
  'city-offices': Chatting,
  'construction-work': Project,
  'open-waste-container': Container,
  'report-issue': Alert,
  'waste-guide': Location,
  questions: ChatBubble,
}
