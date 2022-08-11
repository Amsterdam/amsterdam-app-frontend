import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useRegisterDevice, useSentry} from '@/hooks'
import {useConstructionWorkEditor} from '@/modules/construction-work-editor/hooks/useConstructionWorkEditor'
import {useSetConstructionWorkEditorCredentials} from '@/modules/construction-work-editor/hooks/useConstructionWorkEditorCredentials'
import {
  addConstructionWorkEditorId,
  selectConstructionWorkEditorHasSeenWelcomeMessage,
  setHasSeenWelcomeMessage,
} from '@/modules/construction-work-editor/slice'
import {useFollowProjectMutation} from '@/modules/construction-work/construction-work.service'
import {requestPushNotificationsPermission} from '@/processes'
import {setAlert, setAlertVisibility} from '@/store'
import {Variant} from '@/types'

export const useRegisterConstructionWorkEditorId = (
  deeplinkId: string | undefined,
) => {
  const dispatch = useDispatch()
  const hasSeenWelcomeMessage = useSelector(
    selectConstructionWorkEditorHasSeenWelcomeMessage,
  )
  const setConstructionWorkEditorCredentials =
    useSetConstructionWorkEditorCredentials()

  const {
    authorizedProjects,
    constructionWorkEditorId,
    isGetProjectManagerError,
    isGetProjectsError,
  } = useConstructionWorkEditor()

  const [followProject] = useFollowProjectMutation()
  const {sendSentryErrorLog} = useSentry()
  const {registerDevice} = useRegisterDevice()

  useEffect(() => {
    if (authorizedProjects && deeplinkId) {
      authorizedProjects.forEach(({identifier}) => {
        // eslint-disable-next-line no-void
        void followProject({project_id: identifier})
      })
      requestPushNotificationsPermission()
        .then(registerDevice)
        .catch((error: unknown) => {
          sendSentryErrorLog(
            'Register device for push notifications failed',
            'useRegisterConstructionWorkEditorId.ts',
            {error},
          )
        })
    }
  }, [
    authorizedProjects,
    followProject,
    deeplinkId,
    registerDevice,
    sendSentryErrorLog,
  ])

  useEffect(() => {
    if (
      !hasSeenWelcomeMessage &&
      constructionWorkEditorId === deeplinkId &&
      constructionWorkEditorId &&
      authorizedProjects
    ) {
      dispatch(
        setAlert({
          content: {
            text: 'Gelukt! De app herkent je nu als omgevingsmanager voor onderstaande projecten. Tik op het project waarvoor je een bericht wilt plaatsen.',
          },
          variant: Variant.information,
          isVisible: true,
        }),
      )
      dispatch(setHasSeenWelcomeMessage())
    }
  }, [
    authorizedProjects,
    constructionWorkEditorId,
    deeplinkId,
    dispatch,
    hasSeenWelcomeMessage,
  ])
  const isFailed =
    (!constructionWorkEditorId && !deeplinkId) ||
    isGetProjectManagerError ||
    isGetProjectsError
  const isLoading = !isFailed && !authorizedProjects

  useEffect(() => {
    if (deeplinkId) {
      isFailed && setAlertVisibility(false)
      setConstructionWorkEditorCredentials(deeplinkId)
      dispatch(addConstructionWorkEditorId(deeplinkId))
    }
  }, [deeplinkId, dispatch, isFailed, setConstructionWorkEditorCredentials])

  useEffect(() => {
    if (isFailed) {
      dispatch(
        setAlert({
          content: {
            text: 'Helaas, de app heeft je niet herkend als omgevingsmanager. Probeer je opnieuw te registreren om berichten te kunnen versturen.',
          },
          variant: Variant.failure,
          isVisible: true,
        }),
      )
    }
  }, [dispatch, isFailed])

  return {
    isLoading,
    isFailed,
  }
}
