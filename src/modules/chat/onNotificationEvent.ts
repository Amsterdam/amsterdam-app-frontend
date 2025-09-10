import {EventType} from '@notifee/react-native'
import {maximizeChat} from '@/modules/chat/slice'
import {type ModuleClientConfig} from '@/modules/types'

export const onNotificationEvent: ModuleClientConfig['onNotificationEvent'] = (
  type,
  detail,
  _,
  dispatch,
) => {
  if (type === EventType.PRESS && detail.notification?.data?.maximizeChat) {
    dispatch(maximizeChat())
  }
}
