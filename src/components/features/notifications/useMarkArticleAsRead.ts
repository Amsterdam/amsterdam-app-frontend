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
    console.log('render')
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
