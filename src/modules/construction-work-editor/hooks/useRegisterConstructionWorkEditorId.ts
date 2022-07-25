import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useConstructionWorkEditor} from './useConstructionWorkEditor'
import {useSetConstructionWorkEditorCredentials} from './useConstructionWorkEditorCredentials'
import {useRegisterDevice, useSentry} from '@/hooks'
import {
  selectConstructionWorkEditorHasSeenWelcomeMessage,
  addConstructionWorkEditorId,
  setHasSeenWelcomeMessage,
} from '@/modules/construction-work-editor/slice'
import {useFollowProjectMutation} from '@/modules/construction-work/construction-work.service'
import {getPushNotificationsPermission} from '@/processes'
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
    if (deeplinkId) {
      dispatch(setAlertVisibility(false))
      setConstructionWorkEditorCredentials(deeplinkId)
      dispatch(addConstructionWorkEditorId(deeplinkId))
    }
  }, [deeplinkId, dispatch, setConstructionWorkEditorCredentials])

  useEffect(() => {
    if (authorizedProjects && deeplinkId) {
      authorizedProjects.forEach(({identifier}) => {
        followProject({project_id: identifier})
      })
      getPushNotificationsPermission()
        .then(registerDevice)
        .catch((error: unknown) => {
          sendSentryErrorLog(
            'Register device for push notifications failed',
            'Init.tsx',
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
            text: 'Gelukt, de app herkent je nu als omgevingsmanager voor onderstaande projecten. Klik op het project waarvoor je een bericht wilt plaatsen, om een bericht te maken.',
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
    if (isFailed) {
      dispatch(
        setAlert({
          content: {
            text: 'Helaas, de app heeft je niet herkent als omgevingsmanager. Probeer je opnieuw te registreren om een berichten te kunnen versturen.',
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
