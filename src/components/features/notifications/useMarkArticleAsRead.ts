import {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  addReadArticle,
  deleteReadArticle,
  selectNotificationSettings,
} from './notificationsSlice'
import {ReadArticle} from './types'
import {getDateDiffInDays} from '@/utils'

export const useMarkArticleAsRead = () => {
  const {readArticles} = useSelector(selectNotificationSettings)
  const dispatch = useDispatch()

  const deleteOldArticles = useCallback(() => {
    readArticles.forEach(readArticle => {
      getDateDiffInDays(readArticle.publicationDate) > 3 &&
        dispatch(deleteReadArticle(readArticle.id))
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const markAsRead = useCallback((article: ReadArticle) => {
    const articleAlreadyInList = readArticles.find(
      readArticle => readArticle.id === article.id,
    )
    const oldArticle = getDateDiffInDays(article.publicationDate) > 3
    if (!articleAlreadyInList && !oldArticle) {
      dispatch(addReadArticle(article))
    }
    deleteOldArticles()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return {markAsRead}
}
