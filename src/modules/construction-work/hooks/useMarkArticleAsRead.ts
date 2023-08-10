import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {recentArticleMaxAge} from '@/modules/construction-work/config'
import {
  addReadArticle,
  deleteReadArticle,
  ReadArticle,
  selectConstructionWorkReadArticles,
} from '@/modules/construction-work/slice'
import {Articles} from '@/modules/construction-work/types'
import {getDateDiffInDays} from '@/utils/getDateDiffInDays'

export const useMarkArticleAsRead = () => {
  const readArticles = useSelector(selectConstructionWorkReadArticles)
  const dispatch = useDispatch()

  const deleteOldArticles = useCallback(() => {
    readArticles.forEach(readArticle => {
      getDateDiffInDays(readArticle.publicationDate) > recentArticleMaxAge &&
        dispatch(deleteReadArticle(readArticle.id))
    })
  }, [dispatch, readArticles])

  const markAsRead = useCallback(
    (article: ReadArticle, cleanup = true) => {
      if (cleanup) {
        deleteOldArticles()
      }

      if (getDateDiffInDays(article.publicationDate) > recentArticleMaxAge) {
        return
      }

      if (readArticles.find(readArticle => readArticle.id === article.id)) {
        return
      }

      dispatch(addReadArticle(article))
    },
    [deleteOldArticles, dispatch, readArticles],
  )

  const markMultipleAsRead = useCallback(
    (articles: Articles) => {
      deleteOldArticles()
      articles?.forEach(({identifier, publication_date}) =>
        markAsRead(
          {
            id: identifier,
            publicationDate: publication_date,
          },
          false,
        ),
      )
    },
    [deleteOldArticles, markAsRead],
  )

  const markMultipleAsUnRead = useCallback(
    (articles: Articles) => {
      articles?.forEach(({identifier}) =>
        dispatch(deleteReadArticle(identifier)),
      )
    },
    [dispatch],
  )

  return {markAsRead, markMultipleAsRead, markMultipleAsUnRead}
}
