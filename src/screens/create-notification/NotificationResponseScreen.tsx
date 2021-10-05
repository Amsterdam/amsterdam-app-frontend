import React, {useContext} from 'react'
import {Checkmark, Close} from '../../assets/icons'
import {Confirmation} from '../../components/features'
import {NotificationContext} from '.'

export const NotificationResponseScreen = () => {
  const {responseStatus} = useContext(NotificationContext)

  return responseStatus === 'success' ? (
    <Confirmation
      body="De notificatie is opgeslagen."
      button={{onPress: 'popModal', text: 'Naar projectpagina'}}
      icon={<Checkmark />}
      title="Gelukt!"
    />
  ) : (
    <Confirmation
      body="Het is niet gelukt om de notificatie op te slaan."
      button={{onPress: 'goBack', text: 'Probeer het nog eens'}}
      icon={<Close />}
      title="Helaas…"
    />
  )
}