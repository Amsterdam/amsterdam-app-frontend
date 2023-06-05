import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {useRegisterDevice, useSentry} from '@/hooks'
import {useFollowProjectMutation} from '@/modules/construction-work/service'
import {useGetProjectManagerQuery} from '@/modules/construction-work-editor/services'
import {
  addConstructionWorkEditorId,
  selectConstructionWorkEditorHasSeenWelcomeMessage,
  selectConstructionWorkEditorId,
  setHasSeenWelcomeMessage,
} from '@/modules/construction-work-editor/slice'
import {requestPushNotificationsPermission} from '@/processes'
import {
  resetAlert,
  selectAuthManagerToken,
  setAlert,
  setCredentials,
} from '@/store'
import {encryptWithAES} from '@/utils'

export const useRegisterConstructionWorkEditorId = (
  deeplinkId: string | undefined,
) => {
  const dispatch = useDispatch()
  const constructionWorkEditorId = useSelector(selectConstructionWorkEditorId)
  const authManagerToken = useSelector(selectAuthManagerToken)
  const hasSeenWelcomeMessage = useSelector(
    selectConstructionWorkEditorHasSeenWelcomeMessage,
  )

  useEffect(() => {
    if (constructionWorkEditorId) {
      dispatch(
        setCredentials({
          managerToken: encryptWithAES({
            password: process.env.AUTH_PASSWORD ?? '',
            salt: constructionWorkEditorId,
          }),
        }),
      )
    }
  }, [dispatch, constructionWorkEditorId])

  const {
    data: projectManager,
    error: projectManagerError,
    isError: isGetProjectManagerError,
  } = useGetProjectManagerQuery(
    constructionWorkEditorId && authManagerToken
      ? {id: constructionWorkEditorId}
      : skipToken,
  )
  const authorizedProjects = projectManager?.projects

  const [followProject] = useFollowProjectMutation()
  const {sendSentryErrorLog} = useSentry()
  const {registerDevice} = useRegisterDevice()

  useEffect(() => {
    if (authorizedProjects && deeplinkId) {
      authorizedProjects.forEach(({identifier}) => {
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
          variant: AlertVariant.information,
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
    (!constructionWorkEditorId && !deeplinkId) || isGetProjectManagerError
  const isLoading = !isFailed && !authorizedProjects

  useEffect(() => {
    if (deeplinkId) {
      isFailed && resetAlert()
      dispatch(addConstructionWorkEditorId(deeplinkId))
    }
  }, [deeplinkId, dispatch, isFailed])

  useEffect(() => {
    if (isFailed) {
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
    }
  }, [dispatch, isFailed])

  return {
    isLoading,
    isFailed,
    projectManagerError,
  }
}
