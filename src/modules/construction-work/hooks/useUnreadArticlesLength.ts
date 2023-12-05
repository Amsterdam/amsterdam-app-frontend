import {useMemo} from 'react'
import {ReadArticle} from '@/modules/construction-work/slice'
import {
  ProjectRecentArticle,
  ProjectsFollowedArticlesItem,
} from '@/modules/construction-work/types/api'
import {getUnreadArticlesLength} from '@/modules/construction-work/utils/getUnreadArticlesLength'

export const useUnreadArticlesLength = (
  readArticles: ReadArticle[],
  recentArticles?: ProjectRecentArticle[] | ProjectsFollowedArticlesItem[],
) =>
  useMemo(
    () => getUnreadArticlesLength(readArticles, recentArticles),
    [readArticles, recentArticles],
  )
