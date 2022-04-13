import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addReadId, selectNotificationSettings} from './notificationsSlice'

export const useMarkArticleIdAsRead = (id?: string) => {
  const {readIds} = useSelector(selectNotificationSettings)
  const dispatch = useDispatch()

  useEffect(() => {
    if (id && !readIds.includes(id)) {
      dispatch(addReadId(id))
    }
  }, [dispatch, id, readIds])
}
