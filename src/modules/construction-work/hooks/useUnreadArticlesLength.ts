import {useMemo} from 'react'
import {ReadArticle} from '@/modules/construction-work/slice'
import {ArticleStub} from '@/modules/construction-work/types/api'
import {getUnreadArticlesLength} from '@/modules/construction-work/utils/getUnreadArticlesLength'

export const useUnreadArticlesLength = (
  readArticles: ReadArticle[],
  recentArticles?: ArticleStub[],
) =>
  useMemo(
    () => getUnreadArticlesLength(readArticles, recentArticles),
    [readArticles, recentArticles],
  )
