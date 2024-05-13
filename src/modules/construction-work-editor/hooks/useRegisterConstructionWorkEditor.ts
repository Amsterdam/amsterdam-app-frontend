import {useEffect} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {useFollowAuthorizedProjects} from '@/modules/construction-work-editor/hooks/useFollowAuthorizedProjects'
import {useShowAuthorizedFeedback} from '@/modules/construction-work-editor/hooks/useShowAuthorizedFeedback'
import {useGetProjectsQuery} from '@/modules/construction-work-editor/service'
import {selectConstructionWorkEditorHasSeenWelcomeMessage} from '@/modules/construction-work-editor/slice'
import {isApiAuthorizationError} from '@/utils/api'

export const useRegisterConstructionWorkEditor = () => {
  const hasSeenWelcomeMessage = useSelector(
    selectConstructionWorkEditorHasSeenWelcomeMessage,
  )
  const hasAutoFollowedProjects = useSelector(
    selectConstructionWorkEditorHasSeenWelcomeMessage,
  )
  const {follow} = useFollowAuthorizedProjects()

  // Get authorized projects from endpoint
  const {data: authorizedProjects, isError, error} = useGetProjectsQuery()

  // Follow authorized projects
  useEffect(() => {
    if (!hasAutoFollowedProjects && authorizedProjects) {
      follow(authorizedProjects)
    }
  }, [authorizedProjects, follow, hasAutoFollowedProjects])

  const showAuthorizedFeedback = useShowAuthorizedFeedback()

  // Show success message if fetching succeeded and welcome message has not been seen yet
  useEffect(() => {
    if (!hasSeenWelcomeMessage) {
      showAuthorizedFeedback.success()
    }
  }, [hasSeenWelcomeMessage, showAuthorizedFeedback])

  // Show error message if fetching failed and welcome message has not been seen yet
  useEffect(() => {
    if (isError && isApiAuthorizationError(error) && !hasSeenWelcomeMessage) {
      showAuthorizedFeedback.error()
    }
  }, [error, hasSeenWelcomeMessage, isError, showAuthorizedFeedback])
}
