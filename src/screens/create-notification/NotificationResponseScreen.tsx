import React, {useLayoutEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Checkmark, Close} from '../../assets/icons'
import {Confirmation} from '../../components/features/form'
import {Box} from '../../components/ui'
import {ScrollView} from '../../components/ui/layout'
import {
  selectResponseStatus,
  setStepperVisibility,
} from './notificationDraftSlice'

export const NotificationResponseScreen = () => {
  const dispatch = useDispatch()
  const responseStatus = useSelector(selectResponseStatus)

  useLayoutEffect(() => {
    dispatch(setStepperVisibility(false))
  })

  return (
    <ScrollView>
      <Box>
        {responseStatus === 'success' ? (
          <Confirmation
            body="Het pushbericht is verstuurd."
            button={{onPress: 'popModal', text: 'Naar projectpagina'}}
            icon={<Checkmark />}
            title="Gelukt!"
          />
        ) : (
          <Confirmation
            body="Het is niet gelukt om het pushbericht te versturen."
            button={{onPress: 'goBack', text: 'Probeer het nog eens'}}
            icon={<Close />}
            title="Helaas…"
          />
        )}
      </Box>
    </ScrollView>
  )
}
