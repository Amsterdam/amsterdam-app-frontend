import {useCallback} from 'react'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {setHasSeenWelcomeMessage} from '@/modules/construction-work-editor/slice'
import {useAlert} from '@/store/slices/alert'

export const useShowAuthorizedFeedback = () => {
  const dispatch = useDispatch()
  const {setAlert} = useAlert()

  const success = useCallback(() => {
    setAlert({
      content: {
        text: 'Gelukt! De app herkent je nu als omgevingsmanager voor onderstaande projecten. Tik op het project waarvoor je een bericht wilt plaatsen.',
      },
      testID: 'ConstructionWorkEditorSuccessAlert',
      variant: AlertVariant.information,
    })
    dispatch(setHasSeenWelcomeMessage(true))
  }, [dispatch, setAlert])

  const error = useCallback(() => {
    setAlert({
      content: {
        text: 'Helaas, de app heeft je niet herkend als omgevingsmanager. Probeer je opnieuw te registreren om berichten te kunnen versturen.',
      },
      testID: 'ConstructionWorkEditorErrorAlert',
      variant: AlertVariant.negative,
    })
    dispatch(setHasSeenWelcomeMessage(true))
  }, [dispatch, setAlert])

  return {error, success}
}
