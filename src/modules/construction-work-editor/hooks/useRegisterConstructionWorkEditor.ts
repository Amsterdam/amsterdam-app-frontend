import {useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {AzureGroup} from '@/modules/construction-work-editor/constants/azureGroups'
import {hiddenProject} from '@/modules/construction-work-editor/constants/hiddenProject'
import {useFollowAuthorizedProjects} from '@/modules/construction-work-editor/hooks/useFollowAuthorizedProjects'
import {useGetAuthorizedGroups} from '@/modules/construction-work-editor/hooks/useGetAuthorizedGroups'
import {useShowAuthorizedFeedback} from '@/modules/construction-work-editor/hooks/useShowAuthorizedFeedback'
import {useGetProjectsQuery} from '@/modules/construction-work-editor/service'
import {
  selectConstructionWorkEditorHasAutoFollowedProjects,
  selectConstructionWorkEditorHasSeenWelcomeMessage,
  setHasAutoFollowedProjects,
} from '@/modules/construction-work-editor/slice'
import {isApiAuthorizationError} from '@/utils/api'

export const useRegisterConstructionWorkEditor = () => {
  const hasSeenWelcomeMessage = useSelector(
    selectConstructionWorkEditorHasSeenWelcomeMessage,
  )
  const hasAutoFollowedProjects = useSelector(
    selectConstructionWorkEditorHasAutoFollowedProjects,
  )
  const {follow} = useFollowAuthorizedProjects()

  // Get authorized projects from endpoint
  const {data: authorizedProjects, isError, error} = useGetProjectsQuery()
  const dispatch = useDispatch()

  const environment = useSelector(state => state.environment.environment)

  const authorizedGroups = useGetAuthorizedGroups()

  // Follow authorized projects
  useEffect(() => {
    if (!hasAutoFollowedProjects && authorizedProjects) {
      follow(authorizedProjects)

      if (authorizedGroups.includes(AzureGroup.admin)) {
        follow([{id: hiddenProject[environment]}])
      }

      dispatch(setHasAutoFollowedProjects(true))
    }
  }, [
    authorizedGroups,
    authorizedProjects,
    dispatch,
    environment,
    follow,
    hasAutoFollowedProjects,
  ])

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
