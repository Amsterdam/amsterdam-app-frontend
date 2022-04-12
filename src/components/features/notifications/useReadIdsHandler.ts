import {useDispatch, useSelector} from 'react-redux'
import {addReadId, selectNotificationSettings} from './notificationsSlice'

export const useReadIdsHandler = () => {
  const {readIds} = useSelector(selectNotificationSettings)
  const dispatch = useDispatch()

  const markAsRead = (id: string) => {
    if (!readIds.includes(id)) {
      dispatch(addReadId(id))
    }
  }

  return {markAsRead}
}
