import {useMemo} from 'react'
import simplur from 'simplur'
import {Badge} from '@/components/ui/feedback/Badge'
import {useSelector} from '@/hooks/redux/useSelector'
import {recentArticleMaxAge} from '@/modules/construction-work/config'
import {useProjectsFollowedArticlesQuery} from '@/modules/construction-work/service'
import {selectConstructionWorkReadArticles} from '@/modules/construction-work/slice'
import {getUniqueArticleId} from '@/modules/construction-work/utils/getUniqueArticleId'

export const BadgeValue = () => {
  const readArticles = useSelector(selectConstructionWorkReadArticles)

  const {data} = useProjectsFollowedArticlesQuery({
    article_max_age: recentArticleMaxAge,
  })

  const unreadArticlesLength = useMemo(() => {
    if (!data) {
      return
    }

    return Object.values(data).reduce(
      (total, articles) =>
        articles.filter(
          ({meta_id}) =>
            !readArticles
              .map(({id}) => id)
              .includes(getUniqueArticleId(meta_id)),
        ).length + total,
      0,
    )
  }, [data, readArticles])

  if (unreadArticlesLength) {
    return (
      <Badge
        accessibilityLabel={simplur`${unreadArticlesLength} ongelezen bericht[|en]`}
        value={unreadArticlesLength}
      />
    )
  }

  return null
}
