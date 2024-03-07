import {useCallback} from 'react'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {setHasSeenWelcomeMessage} from '@/modules/construction-work-editor/slice'
import {setAlert} from '@/store/slices/alert'

export const useShowAuthorizedFeedback = () => {
  const dispatch = useDispatch()

  const success = useCallback(() => {
    dispatch(
      setAlert({
        content: {
          text: 'Gelukt! De app herkent je nu als omgevingsmanager voor onderstaande projecten. Tik op het project waarvoor je een bericht wilt plaatsen.',
        },
        testID: 'ConstructionWorkEditorSuccessAlert',
        variant: AlertVariant.information,
      }),
    )
    dispatch(setHasSeenWelcomeMessage(true))
  }, [dispatch])

  const error = useCallback(() => {
    dispatch(
      setAlert({
        content: {
          text: 'Helaas, de app heeft je niet herkend als omgevingsmanager. Probeer je opnieuw te registreren om berichten te kunnen versturen.',
        },
        testID: 'ConstructionWorkEditorErrorAlert',
        variant: AlertVariant.negative,
      }),
    )
    dispatch(setHasSeenWelcomeMessage(true))
  }, [dispatch])

  return {error, success}
}
