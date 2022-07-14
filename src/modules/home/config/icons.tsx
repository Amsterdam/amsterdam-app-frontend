import Alert from '@amsterdam/asc-assets/static/icons/Alert.svg'
import Chatting from '@amsterdam/asc-assets/static/icons/Chatting.svg'
import Info from '@amsterdam/asc-assets/static/icons/Info.svg'
import TrashBin from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import {ElementType} from 'react'
import {
  Announcement,
  Checkmark,
  ConstructionWork,
  OrganicWasteContainer,
} from '@/assets/icons'

export const icons: Record<string, ElementType> = {
  alert: Alert, // Melding doen
  announcement: Announcement, // Plaats berichten
  chatting: Chatting, // Contact
  checkmark: Checkmark, // Direct regelen
  info: Info, // Over deze app
  'organic-waste-container': OrganicWasteContainer, // GFT-container openen
  projects: ConstructionWork, // Werkzaamheden
  'trash-bin': TrashBin, // Afvalwijzer
}
