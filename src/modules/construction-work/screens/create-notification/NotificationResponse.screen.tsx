import React, {useLayoutEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Checkmark, Close} from '@/assets/icons'
import {Box} from '@/components/ui'
import {Screen} from '@/components/ui/layout'
import {Confirmation} from '@/modules/construction-work/components/create-notification/Confirmation'
import {
  selectResponseStatus,
  setStepperVisibility,
} from '@/modules/construction-work/screens/create-notification/notificationDraftSlice'

export const NotificationResponseScreen = () => {
  const dispatch = useDispatch()
  const responseStatus = useSelector(selectResponseStatus)

  useLayoutEffect(() => {
    dispatch(setStepperVisibility(false))
  })

  return (
    <Screen>
      <Box>
        {responseStatus === 'success' ? (
          <Confirmation
            body="Het pushbericht is verstuurd."
            button={{onPress: 'popModal', label: 'Naar projectpagina'}}
            icon={<Checkmark />}
            title="Gelukt!"
          />
        ) : (
          <Confirmation
            body="Het is niet gelukt om het pushbericht te versturen."
            button={{onPress: 'goBack', label: 'Probeer het nog eens'}}
            icon={<Close />}
            title="Helaas…"
          />
        )}
      </Box>
    </Screen>
  )
}
