import {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  deleteReadArticle,
  ReadArticle,
  addReadArticle,
  selectConstructionWorkReadArticles,
} from '@/modules/construction-work/construction-work.slice'
import {getDateDiffInDays} from '@/utils'

export const useMarkArticleAsRead = () => {
  const readArticles = useSelector(selectConstructionWorkReadArticles)
  const dispatch = useDispatch()

  const deleteOldArticles = useCallback(() => {
    readArticles.forEach(readArticle => {
      getDateDiffInDays(readArticle.publicationDate) > 3 &&
        dispatch(deleteReadArticle(readArticle.id))
    })
  }, [dispatch, readArticles])

  const markAsRead = useCallback(
    (article: ReadArticle) => {
      deleteOldArticles()
      if (getDateDiffInDays(article.publicationDate) > 3) {
        return
      }
      if (readArticles.find(readArticle => readArticle.id === article.id)) {
        return
      }
      dispatch(addReadArticle(article))
    },
    [deleteOldArticles, dispatch, readArticles],
  )

  return {markAsRead}
}
