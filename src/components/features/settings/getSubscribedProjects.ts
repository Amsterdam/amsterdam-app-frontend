import {ProjectsWithSubscriptionStatus} from '../../../types'

/**
 * Returns projects that are actually subscribed to (value is true)
 * for a list of project notification settings.
 */
export const getSubscribedProjects = (
  projects?: ProjectsWithSubscriptionStatus,
): string[] => {
  if (projects === undefined) {
    return []
  }

  return Object.entries(projects).reduce((acc, val) => {
    // @ts-ignore
    val[1] && acc.push(val[0])
    return acc
  }, [])
}
