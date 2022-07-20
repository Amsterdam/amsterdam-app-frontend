import {ProjectsItem} from '@/modules/construction-work/types'

export const getFirstUnreadArticlePublicationDate =
  (readArticleIds: string[]) => (project: ProjectsItem) =>
    project.recent_articles?.find(a => !readArticleIds.includes(a.identifier))
      ?.publication_date ?? '0'

export const compareRecentArticleDates =
  (readArticleIds: string[]) => (p: ProjectsItem, q: ProjectsItem) => {
    const getFirstUnreadPublicationDate =
      getFirstUnreadArticlePublicationDate(readArticleIds)
    return getFirstUnreadPublicationDate(p) > getFirstUnreadPublicationDate(q)
      ? -1
      : 1
  }

export const sortProjects = (
  projects: ProjectsItem[],
  readArticleIds: string[],
) => {
  const followedProjects: ProjectsItem[] = []
  const unfollowedProjects: ProjectsItem[] = []

  projects.forEach(p => {
    if (p.followed) {
      followedProjects.push(p)
      return
    }
    unfollowedProjects.push(p)
  })
  followedProjects.sort(compareRecentArticleDates(readArticleIds))
  return [...followedProjects, ...unfollowedProjects]
}
