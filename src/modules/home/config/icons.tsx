import Alert from '@amsterdam/asc-assets/static/icons/Alert.svg'
import ChatBubble from '@amsterdam/asc-assets/static/icons/ChatBubble.svg'
import TrashBin from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import {ElementType} from 'react'
import {CityOffice, OrganicWasteContainer, Project} from '@/assets/icons'

export const icons: Record<string, ElementType> = {
  alert: Alert,
  'chat-bubble': ChatBubble,
  chatting: CityOffice,
  container: OrganicWasteContainer,
  location: TrashBin, // TEMP
  project: Project,
  'trash-bin': TrashBin,
}
