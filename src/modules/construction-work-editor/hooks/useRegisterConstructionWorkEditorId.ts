import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {useRegisterDevice, useSentry} from '@/hooks'
import {
  useConstructionWorkEditor,
  useSetConstructionWorkEditorCredentials,
} from '@/modules/construction-work-editor/hooks'
import {
  addConstructionWorkEditorId,
  selectConstructionWorkEditorHasSeenWelcomeMessage,
  setHasSeenWelcomeMessage,
} from '@/modules/construction-work-editor/slice'
import {useFollowProjectMutation} from '@/modules/construction-work/service'
import {requestPushNotificationsPermission} from '@/processes'
import {resetAlert, setAlert} from '@/store'

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
          closeType: AlertCloseType.withoutButton,
          content: {
            text: 'Gelukt! De app herkent je nu als omgevingsmanager voor onderstaande projecten. Tik op het project waarvoor je een bericht wilt plaatsen.',
          },
          variant: AlertVariant.default,
          withIcon: false,
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
      isFailed && resetAlert()
      setConstructionWorkEditorCredentials(deeplinkId)
      dispatch(addConstructionWorkEditorId(deeplinkId))
    }
  }, [deeplinkId, dispatch, isFailed, setConstructionWorkEditorCredentials])

  useEffect(() => {
    if (isFailed) {
      dispatch(
        setAlert({
          closeType: AlertCloseType.withoutButton,
          content: {
            text: 'Helaas, de app heeft je niet herkend als omgevingsmanager. Probeer je opnieuw te registreren om berichten te kunnen versturen.',
          },
          variant: AlertVariant.failure,
          withIcon: false,
        }),
      )
    }
  }, [dispatch, isFailed])

  return {
    isLoading,
    isFailed,
  }
}
