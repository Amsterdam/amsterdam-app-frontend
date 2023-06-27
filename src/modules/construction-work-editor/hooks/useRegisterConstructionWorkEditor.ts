import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useFollowAuthorizedProjects} from '@/modules/construction-work-editor/hooks/useFollowAuthorizedProjects'
import {useSaveIdAndToken} from '@/modules/construction-work-editor/hooks/useSaveIdAndToken'
import {useSetModuleAuthorization} from '@/modules/construction-work-editor/hooks/useSetModuleAuthorization'
import {useShowAuthorizedFeedback} from '@/modules/construction-work-editor/hooks/useShowAuthorizedFeedback'
import {useGetProjectManagerQuery} from '@/modules/construction-work-editor/services'
import {
  selectConstructionWorkEditorHasSeenWelcomeMessage,
  selectConstructionWorkEditorId,
  setHasSeenWelcomeMessage,
} from '@/modules/construction-work-editor/slice'
import {selectAuthManagerToken} from '@/store'
import {isApiAuthorizationError} from '@/utils'

export const useRegisterConstructionWorkEditor = (
  deeplinkId?: string | undefined,
) => {
  const constructionWorkEditorHasSeenWelcomeMessage = useSelector(
    selectConstructionWorkEditorHasSeenWelcomeMessage,
  )
  const dispatch = useDispatch()
  const {setModuleAuthorization} = useSetModuleAuthorization()
  const constructionWorkEditorId = useSelector(selectConstructionWorkEditorId)
  const authManagerToken = useSelector(selectAuthManagerToken)
  const showAuthorizedFeedback = useShowAuthorizedFeedback()
  const {follow} = useFollowAuthorizedProjects()
  const {saveIdAndToken} = useSaveIdAndToken()

  // Since the user enters with a deeplink, we want to show the welcome message
  // and store the id and manager token
  useEffect(() => {
    if (deeplinkId) {
      dispatch(setHasSeenWelcomeMessage(false))
      saveIdAndToken(deeplinkId)
    }
  }, [deeplinkId, dispatch, saveIdAndToken])

  // Get project manager from endpoint
  const {
    data: projectManager,
    isError: isGetProjectManagerError,
    error: getProjectManagerError,
    isLoading: isGetProjectManagerLoading,
    isSuccess: isGetProjectManagerSuccess,
  } = useGetProjectManagerQuery(
    constructionWorkEditorId && authManagerToken
      ? {id: constructionWorkEditorId}
      : skipToken,
  )
  const authorizedProjects = projectManager?.projects

  // Add to or remove module from authorized modules, depending on the response
  useEffect(() => {
    !isGetProjectManagerLoading &&
      setModuleAuthorization(isGetProjectManagerSuccess, getProjectManagerError)
  }, [
    getProjectManagerError,
    isGetProjectManagerLoading,
    isGetProjectManagerSuccess,
    setModuleAuthorization,
  ])

  // Follow authorized projects
  useEffect(() => {
    authorizedProjects && deeplinkId && follow(authorizedProjects)
  }, [authorizedProjects, deeplinkId, follow])

  // Show success message if fetching succeeded and welcome message has not been seen yet
  useEffect(() => {
    projectManager &&
      !constructionWorkEditorHasSeenWelcomeMessage &&
      showAuthorizedFeedback.success()
  }, [
    constructionWorkEditorHasSeenWelcomeMessage,
    projectManager,
    showAuthorizedFeedback,
  ])

  // Show error message if fetching failed and welcome message has not been seen yet
  useEffect(() => {
    isGetProjectManagerError &&
      isApiAuthorizationError(getProjectManagerError) &&
      !constructionWorkEditorHasSeenWelcomeMessage &&
      showAuthorizedFeedback.error()
  }, [
    constructionWorkEditorHasSeenWelcomeMessage,
    getProjectManagerError,
    isGetProjectManagerError,
    showAuthorizedFeedback,
  ])

  return {
    projectManager,
    getProjectManagerError,
    isGetProjectManagerLoading,
  }
}
