import React, {useContext, useLayoutEffect} from 'react'
import {Checkmark, Close} from '../../assets/icons'
import {Confirmation} from '../../components/features'
import {Box} from '../../components/ui'
import {NotificationContext} from '.'

export const NotificationResponseScreen = () => {
  const {changeCurrentStep, responseStatus} = useContext(NotificationContext)

  useLayoutEffect(() => {
    changeCurrentStep(0)
  })

  return (
    <Box>
      {responseStatus === 'success' ? (
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
      )}
    </Box>
  )
}
