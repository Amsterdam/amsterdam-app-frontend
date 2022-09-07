import {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {articlesMaxAgeInDays} from '@/modules/construction-work/config'
import {
  deleteReadArticle,
  ReadArticle,
  addReadArticle,
  selectConstructionWorkReadArticles,
} from '@/modules/construction-work/slice'
import {Articles} from '@/modules/construction-work/types'
import {getDateDiffInDays} from '@/utils'

export const useMarkArticleAsRead = () => {
  const readArticles = useSelector(selectConstructionWorkReadArticles)
  const dispatch = useDispatch()

  const deleteOldArticles = useCallback(() => {
    readArticles.forEach(readArticle => {
      getDateDiffInDays(readArticle.publicationDate) > articlesMaxAgeInDays &&
        dispatch(deleteReadArticle(readArticle.id))
    })
  }, [dispatch, readArticles])

  const markAsRead = useCallback(
    (article: ReadArticle) => {
      deleteOldArticles()
      if (getDateDiffInDays(article.publicationDate) > articlesMaxAgeInDays) {
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
      articles?.forEach(({identifier, publication_date}) =>
        markAsRead({
          id: identifier,
          publicationDate: publication_date,
        }),
      )
    },
    [markAsRead],
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
