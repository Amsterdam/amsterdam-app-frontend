import {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {setHasSeenWelcomeMessage} from '@/modules/construction-work-editor/slice'
import {setAlert} from '@/store/alertSlice'

export const useShowAuthorizedFeedback = () => {
  const dispatch = useDispatch()

  const success = useCallback(() => {
    dispatch(
      setAlert({
        closeType: AlertCloseType.withoutButton,
        content: {
          text: 'Gelukt! De app herkent je nu als omgevingsmanager voor onderstaande projecten. Tik op het project waarvoor je een bericht wilt plaatsen.',
        },
        variant: AlertVariant.information,
        withIcon: false,
      }),
    )
    dispatch(setHasSeenWelcomeMessage(true))
  }, [dispatch])

  const error = useCallback(() => {
    dispatch(
      setAlert({
        closeType: AlertCloseType.withoutButton,
        content: {
          text: 'Helaas, de app heeft je niet herkend als omgevingsmanager. Probeer je opnieuw te registreren om berichten te kunnen versturen.',
        },
        variant: AlertVariant.negative,
        withIcon: false,
      }),
    )
    dispatch(setHasSeenWelcomeMessage(true))
  }, [dispatch])

  return {error, success}
}
