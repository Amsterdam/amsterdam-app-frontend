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
import {selectAuthManagerToken} from '@/store/slices/auth'
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
    currentData: currentProjectManager,
    isError: isGetProjectManagerError,
    error: getProjectManagerError,
    isFetching: isGetProjectManagerFetching,
    isLoading: isGetProjectManagerLoading,
    isSuccess: isGetProjectManagerSuccess,
  } = useGetProjectManagerQuery(
    constructionWorkEditorId && authManagerToken
      ? {id: constructionWorkEditorId}
      : skipToken,
  )
  const authorizedProjects = currentProjectManager?.projects

  // Add to or remove module from authorized modules, depending on the response
  useEffect(() => {
    currentProjectManager &&
      setModuleAuthorization(isGetProjectManagerSuccess, getProjectManagerError)
  }, [
    currentProjectManager,
    isGetProjectManagerSuccess,
    getProjectManagerError,
    setModuleAuthorization,
  ])

  // Follow authorized projects
  useEffect(() => {
    authorizedProjects && deeplinkId && follow(authorizedProjects)
  }, [authorizedProjects, deeplinkId, follow])

  // Show success message if fetching succeeded and welcome message has not been seen yet
  useEffect(() => {
    currentProjectManager &&
      !constructionWorkEditorHasSeenWelcomeMessage &&
      showAuthorizedFeedback.success()
  }, [
    constructionWorkEditorHasSeenWelcomeMessage,
    currentProjectManager,
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
    currentProjectManager,
    getProjectManagerError,
    isGetProjectManagerFetching,
    isGetProjectManagerLoading,
  }
}
