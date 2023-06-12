import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useFollowAuthorizedProjects} from '@/modules/construction-work-editor/hooks/useFollowAuthorizedProjects'
import {useShowAuthorizedFeedback} from '@/modules/construction-work-editor/hooks/useShowAuthorizedFeedback'
import {useSaveIdAndToken} from '@/modules/construction-work-editor/hooks/useSaveIdAndToken'
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
  const constructionWorkEditorId = useSelector(selectConstructionWorkEditorId)
  const authManagerToken = useSelector(selectAuthManagerToken)
  const showAuthorizedFeedback = useShowAuthorizedFeedback()
  const {follow} = useFollowAuthorizedProjects()
  const {saveIdAndToken} = useSaveIdAndToken()

  // Since the user enters with a deeplink, we want to show the welcome message
  // and store the id and manager token
  useEffect(() => {
    if (deeplinkId) {
      setHasSeenWelcomeMessage(false)
      saveIdAndToken(deeplinkId)
    }
  }, [deeplinkId, saveIdAndToken])

  // Get project manager from endpoint
  const {
    data: projectManager,
    isSuccess: isGetProjectManagerSuccess,
    isError: isGetProjectManagerError,
    error: getProjectManagerError,
    isLoading: isGetProjectManagerLoading,
  } = useGetProjectManagerQuery(
    constructionWorkEditorId && authManagerToken
      ? {id: constructionWorkEditorId}
      : skipToken,
  )
  const authorizedProjects = projectManager?.projects

  // Follow authorized projects
  useEffect(() => {
    authorizedProjects && deeplinkId && follow(authorizedProjects)
  }, [authorizedProjects, deeplinkId, follow])

  // Show success message if fetching succeeded and welcome message has not been seen yet
  useEffect(() => {
    isGetProjectManagerSuccess &&
      !constructionWorkEditorHasSeenWelcomeMessage &&
      showAuthorizedFeedback.success()
  }, [
    constructionWorkEditorHasSeenWelcomeMessage,
    isGetProjectManagerSuccess,
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
