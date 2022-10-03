import React, {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {Badge} from '@/components/ui/feedback'
import {recentArticleMaxAge} from '@/modules/construction-work/config'
import {useGetProjectsFollowedArticlesQuery} from '@/modules/construction-work/service'
import {selectConstructionWorkReadArticles} from '@/modules/construction-work/slice'

export const BadgeValue = () => {
  const readArticles = useSelector(selectConstructionWorkReadArticles)

  const {data} = useGetProjectsFollowedArticlesQuery({
    'article-max-age': recentArticleMaxAge,
  })
  const projects = data?.projects

  const unreadArticlesLength = useMemo(
    () =>
      projects &&
      Object.keys(projects).reduce((total, projectId) => {
        return (
          projects[projectId].filter(
            id => !readArticles.map(r => r.id).includes(id),
          ).length + total
        )
      }, 0),
    [projects, readArticles],
  )

  if (unreadArticlesLength) {
    return (
      <Badge
        accessibilityLabel={`${unreadArticlesLength} ongelezen berichten`}
        scalesWithFont
        size="large"
        value={unreadArticlesLength}
      />
    )
  }

  return null
}
