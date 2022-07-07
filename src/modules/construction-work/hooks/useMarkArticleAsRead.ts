import {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  deleteReadArticle,
  ReadArticle,
  addReadArticle,
  selectConstructionWorkReadArticles,
} from '@/modules/construction-work/construction-work.slice'
import {Articles} from '@/types'
import {getDateDiffInDays} from '@/utils'

export const articleAsNewDays = 3

export const useMarkArticleAsRead = () => {
  const readArticles = useSelector(selectConstructionWorkReadArticles)
  const dispatch = useDispatch()

  const deleteOldArticles = useCallback(() => {
    readArticles.forEach(readArticle => {
      getDateDiffInDays(readArticle.publicationDate) > articleAsNewDays &&
        dispatch(deleteReadArticle(readArticle.id))
    })
  }, [dispatch, readArticles])

  const markAsRead = useCallback(
    (article: ReadArticle) => {
      deleteOldArticles()
      if (getDateDiffInDays(article.publicationDate) > articleAsNewDays) {
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

  return {markAsRead, markMultipleAsRead}
}
