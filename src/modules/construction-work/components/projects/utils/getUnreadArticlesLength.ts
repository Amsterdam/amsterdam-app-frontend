import {ReadArticle} from '@/modules/construction-work/slice'
import {ProjectRecentArticle} from '@/modules/construction-work/types/api'
import {getUniqueArticleId} from '@/modules/construction-work/utils/getUniqueArticleId'

export const getUnreadArticlesLength = (
  readArticles: ReadArticle[],
  recentArticles?: ProjectRecentArticle[] | null,
) => {
  if (!recentArticles || recentArticles.length === 0) {
    return 0
  }

  const recentArticlesIds = recentArticles.map(({meta_id}) =>
    getUniqueArticleId(meta_id),
  )

  const readArticlesIds = readArticles.map(({id}) => id)

  return recentArticlesIds.filter(id => !readArticlesIds.includes(id)).length
}
