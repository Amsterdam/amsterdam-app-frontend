import simplur from 'simplur'
import {Badge} from '@/components/ui/feedback/Badge'
import {useSelector} from '@/hooks/redux/useSelector'
import {recentArticleMaxAge} from '@/modules/construction-work/config'
import {useUnreadArticlesLength} from '@/modules/construction-work/hooks/useUnreadArticlesLength'
import {useProjectsFollowedArticlesQuery} from '@/modules/construction-work/service'
import {selectConstructionWorkReadArticles} from '@/modules/construction-work/slice'

export const BadgeValue = () => {
  const readArticles = useSelector(selectConstructionWorkReadArticles)

  const {data} = useProjectsFollowedArticlesQuery({
    article_max_age: recentArticleMaxAge,
  })

  const unreadArticlesLength = useUnreadArticlesLength(
    readArticles,
    data?.recent_articles,
  )

  if (!unreadArticlesLength) {
    return null
  }

  return (
    <Badge
      accessibilityLabel={simplur`${unreadArticlesLength} ongelezen bericht[|en]`}
      testID="ConstructionWorkBadge"
      value={unreadArticlesLength}
    />
  )
}
